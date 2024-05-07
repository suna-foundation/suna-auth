/**
 * Sends an error response with the given status and message.
 *
 * @param {number} status - The HTTP status code of the error response.
 * @param {string} message - The error message to be included in the response.
 * @returns {object} - The error response object.
 */
export declare const sendError: (status: number, message: string) => Response;
/**
 * Creates a JSON response object with optional status code.
 *
 * @param {any} data - The data to be included in the response.
 * @param {number} [code] - The optional status code for the response.
 * @returns {object} - The JSON response object.
 */
export declare const sendJson: (data: any, code?: number) => Response;
/**
 * Redirects to the error page with the provided status and message.
 *
 * @param {number} status - The HTTP status code of the error.
 * @param {string} message - The error message.
 */
export declare const sendErrorRedirect: (status: number, message: string) => Response;
