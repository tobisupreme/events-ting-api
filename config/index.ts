const env = {
    PORT: parseInt(process.env.PORT!) || 3210,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
};

export { env };
