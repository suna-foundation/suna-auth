"use strict";
/*
 * For all Api routes responses use custom handler for data normalization
 *
 * Consistency is key - Random Person
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorRedirect = exports.sendJson = exports.sendError = void 0;
/**
 * Sends an error response with the given status and message.
 *
 * @param {number} status - The HTTP status code of the error response.
 * @param {string} message - The error message to be included in the response.
 * @returns {object} - The error response object.
 */
const sendError = (status, message) => {
    return Response.json({
        success: false,
        status: status,
        message: message,
    }, {
        status: status,
        statusText: message,
    });
};
exports.sendError = sendError;
/**
 * Creates a JSON response object with optional status code.
 *
 * @param {any} data - The data to be included in the response.
 * @param {number} [code] - The optional status code for the response.
 * @returns {object} - The JSON response object.
 */
const sendJson = (data, code) => {
    return Response.json({
        success: true,
        data: data,
    }, {
        status: code,
    });
};
exports.sendJson = sendJson;
/**
 * Redirects to the error page with the provided status and message.
 *
 * @param {number} status - The HTTP status code of the error.
 * @param {string} message - The error message.
 */
const sendErrorRedirect = (status, message) => {
    return Response.redirect(`${process.env.NEXTAUTH_URL}/api/auth/error?message=${message}&code=${status}`, 302);
};
exports.sendErrorRedirect = sendErrorRedirect;
//# sourceMappingURL=responces.js.map