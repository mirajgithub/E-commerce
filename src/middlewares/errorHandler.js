export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        message: err.message,
        // Optionally include stack trace in dev mode
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};
