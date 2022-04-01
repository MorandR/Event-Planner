// to process status codes given to the handler during runtime. overwrites express error handler
const errorHandler = (err, req, res, next) => {
    // if status code is passed, use that. else, 500.
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        message: err.message,
        // show null if in production but if in development, show the error stack in JSON format.
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler,
}