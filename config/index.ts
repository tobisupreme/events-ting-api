const env = {
    PORT: parseInt(process.env.API_PORT!) || 3210,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
    SWAGGER: {
        SCHEME: process.env.API_SCHEME || 'http',
        HOST: `${process.env.API_HOST || 'localhost'}:${
            process.env.API_PORT || 3210
        }`,
    },
    QR_CODE: {
        width: parseInt(process.env.QR_CODE_WIDTH || '600'),
    },
};

export { env };
