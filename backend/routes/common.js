/**
 * @swagger
 * components:
 *   schemas:
 *     GenericError:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           description: Error type
 *         message:
 *           type: string
 *           description: Error message
 *       example:
 *          type: ValidationError
 *          message: Validation failed
 */

const GET = "GET";
const POST = "POST";
const PATCH = "PATCH";
const DELETE = "DELETE";

/**
 * A helper function which sets the return status in generic cases
 * @param {object} response HTTP response
 * @param {object} error
 */
const sendError = (response, error, method) => {
  switch (error.name) {
    case "ValidationError":
      response.status(400).json({ type: error.name, message: error.message });
      break;
    case "CastError":
      response.status(method === "DELETE" ? 204 : 404).send();
      break;
    default:
      response.status(500).send();
  }
};

exports.GET = GET;
exports.POST = POST;
exports.PATCH = PATCH;
exports.DELETE = DELETE;
exports.sendError = sendError;
