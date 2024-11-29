function getEnv(name: string, defaultValue?: any) {
    return process.env[name] || defaultValue;
}

function getEnvRequired(name: string) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is required`);
    }
    return value;
}

export interface env {
    NODE_ENV: string;
    ALLOWED_ORIGINS: string;
    API: {
        NAME: string;
        PORT: number;
        SCHEME: string;
        HOSTNAME: string;
        HOST: string;
    };
    QR_CODE: {
        width: number;
    };
    REDIS: {
        HOST: string;
        PORT: number;
        URL?: string;
    };
    SMTP: {
        transport: {
            host: string;
            port: number;
            secure: boolean;
            auth: {
                user: string;
                pass: string;
            };
        };
        from: {
            name: string;
            address: string;
        };
    };
}

const env: env = {
    NODE_ENV: getEnv('NODE_ENV', 'development'),
    ALLOWED_ORIGINS: getEnv('ALLOWED_ORIGINS', '*'),
    API: {
        NAME: 'events-ting',
        PORT: parseInt(getEnv('API_PORT', '3210')),
        SCHEME: getEnv('API_SCHEME', 'http'),
        HOSTNAME: getEnv('API_HOSTNAME', 'localhost'),
        HOST: `${getEnv(
            'API_HOST',
            `${getEnv('API_SCHEME', 'http')}://${getEnv(
                'API_HOSTNAME',
                'localhost'
            )}:${getEnv('API_PORT', '3210')}`
        )}`,
    },
    QR_CODE: {
        width: parseInt(getEnv('QR_CODE_WIDTH', '600')),
    },
    REDIS: {
        HOST: getEnv('REDIS_HOST', 'localhost'),
        PORT: parseInt(getEnv('REDIS_PORT', '6379')),
    },
    SMTP: {
        transport: {
            host: getEnvRequired('SMTP_HOST'),
            port: parseInt(getEnvRequired('SMTP_PORT')),
            secure: getEnvRequired('SMTP_SECURE') === 'true',
            auth: {
                user: getEnvRequired('SMTP_USER'),
                pass: getEnvRequired('SMTP_PASSWORD'),
            },
        },
        from: {
            address: getEnvRequired('EMAIL_SENDER_ADDRESS'),
            name: getEnvRequired('EMAIL_SENDER_NAME'),
        },
    },
};

export { env };
