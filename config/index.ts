function getEnv(name: string, defaultValue?: any) {
    return process.env[name] || defaultValue;
}

const env = {
    NODE_ENV: getEnv('NODE_ENV', 'development'),
    PORT: parseInt(getEnv('API_PORT', '3210')),
    ALLOWED_ORIGINS: getEnv('ALLOWED_ORIGINS', '*'),
    SWAGGER: {
        SCHEME: getEnv('API_SCHEME', 'http'),
        HOSTNAME: getEnv('API_HOSTNAME', 'localhost'),
        HOST: `${getEnv(
            'API_HOST',
            `${getEnv('API_SCHEME', 'http')}://${getEnv(
                'API_HOSTNAME',
                'localhost'
            )}:${getEnv('API_PORT', 3210)}`
        )}`,
    },
    QR_CODE: {
        width: parseInt(getEnv('QR_CODE_WIDTH', '600')),
    },
};

export { env };
