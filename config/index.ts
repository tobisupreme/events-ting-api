function getEnv(name: string, defaultValue?: any) {
    return process.env[name] || defaultValue;
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
};

export { env };
