const env = {
    PORT: parseInt(process.env.PORT!) || 3210,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
    SWAGGER: {
        SCHEME: process.env.SCHEME || 'http',
        HOST: `${process.env.HOST || 'localhost'}:${process.env.PORT || 3210}`,
    },
};

export { env };
