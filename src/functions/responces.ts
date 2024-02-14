/*
* For all Api routes responses use custom handler for data normalization
*
* Consistency is key - Random Person
* */

/**
 * Sends an error response with the given status and message.
 *
 * @param {number} status - The HTTP status code of the error response.
 * @param {string} message - The error message to be included in the response.
 * @returns {object} - The error response object.
 */
export const sendError = (status: number, message: string) => {
  return Response.json({
    success: false,
    status: status,
    message: message,
  }, {
    status: status,
    statusText: message,
  })
};


/**
 * Creates a JSON response object with optional status code.
 *
 * @param {any} data - The data to be included in the response.
 * @param {number} [code] - The optional status code for the response.
 * @returns {object} - The JSON response object.
 */
export const sendJson = (data: any, code?: number) => {
  return Response.json({
      success: true,
      data: data,
    }, {
      status: code,
    }
  );
};



/**
 * Redirects to the error page with the provided status and message.
 *
 * @param {number} status - The HTTP status code of the error.
 * @param {string} message - The error message.
 */
export const sendErrorRedirect = (
  status: number,
  message: string,
) => {
  return Response.redirect(`${process.env.NEXTAUTH_URL}/api/auth/error?message=${message}&code=${status}`, 302,);
};
