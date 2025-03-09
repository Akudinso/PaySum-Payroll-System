"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const error_1 = require("../utils/error"); // Import our custom error class
const errorHandler = (err, req, res, next) => {
    if (err instanceof error_1.BaseError) {
        // Handle custom errors
        return res.status(err.statusCode).json({ error: err.message });
    }
    console.error("Unexpected Error:", err); // Log full error for debugging
    // Generic internal server error
    return res.status(500).json({ error: "Something went wrong. Please try again later." });
};
exports.errorHandler = errorHandler;
