import ErrorHandler from "../utils/errorHandler.js";

export const errorMiddleware = (err, req, res, next) => {
    console.log("Error =>", err);

    // Duplicate key (e.g., duplicate email or product slug)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue);
        const message = `Duplicate field value entered: ${field}`;
        err = new ErrorHandler(message, 400);
    }

    // Invalid ObjectId (e.g., invalid user/product ID)
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Validation error (e.g., required fields missing)
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors)
            .map(val => val.message)
            .join(", ");
        err = new ErrorHandler(message, 400);
    }

    // JWT errors
    if (err.name === "JsonWebTokenError") {
        err = new ErrorHandler("Invalid token. Please login again.", 401);
    }

    if (err.name === "TokenExpiredError") {
        err = new ErrorHandler("Session expired. Please login again.", 401);
    }

    // Mongoose server timeout (connection issues)
    if (err.message?.includes("buffering timed out")) {
        err = new ErrorHandler("Server is busy. Please try again later.", 503);
    }

    // File upload error (e.g., unsupported format)
    if (err.code === "LIMIT_FILE_SIZE") {
        err = new ErrorHandler("File too large. Max size is 2MB.", 413);
    }

    // Custom 404 Not Found
    if (err.code === 404 || err.statusCode === 404) {
        err = new ErrorHandler(err.message || "Not Found", 404);
    }

    // Set default
    const statusCode = Number.isInteger(err.statusCode) ? err.statusCode : 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        message
    });
};
