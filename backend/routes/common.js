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
 *     DuplicateError:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           description: Error type
 *         field:
 *           type: object
 *           description: Key-value pair where the key is the field name
 *         message:
 *           type: string
 *           description: Error message
 *       example:
 *          type: DuplicateKey
 *          field: { "characterName": "Barbarian" }
 *          message: Validation failed
 */

const GET = "GET";
const POST = "POST";
const PATCH = "PATCH";
const DELETE = "DELETE";

/**
 * A helper function which returns the error status and body in generic cases
 * @param {object} error
 * @param {object} method HTTP method
 */
const getError = (error, method) => {
  switch (error.name) {
    case "ValidationError":
      return {
        status: 400,
        body: { type: error.name, message: error.message },
      };
    case "CastError":
      switch (method) {
        case DELETE:
          return { status: 204, body: null };
        case POST:
          return {
            status: 400,
            body: { type: error.name, message: error.message },
          };
        default:
          return { status: 404, body: null };
      }
    case "MongoError":
      if (error.codeName === "DuplicateKey") {
        return {
          status: 409,
          body: {
            type: error.codeName,
            field: JSON.stringify(error.keyValue),
            message: "Duplicate field value",
          },
        };
      } else {
        return { status: 500, body: null };
      }
    default:
      return { status: 500, body: null };
  }
};

/**
 * A helper which sets the response status and body and sends the response
 * @param {object} response HTTP response
 * @param {object} error
 * @param {object} method HTTP method
 */
const sendError = (response, error, method) => {
  const { status, body } = getError(error, method);

  response.status(status).send(body);
};

/**
 * Helper function which returns an object by its ID in the response body
 * @param {mongoose.Schema} model
 * @param {object} request
 * @param {object} response
 */
const getObject = (model, request, response) => {
  model
    .findOne({ _id: request.params.id })
    .then((armoryItem) => {
      if (armoryItem) {
        response.json(armoryItem);
      } else {
        response.send(404);
      }
    })
    .catch((err) => sendError(response, err, GET));
};

/**
 * Helper function which updates an object with new values
 * @param {mongoose.Schema} model
 * @param {object} request
 * @param {object} response
 */
const patchObject = (model, request, response) => {
  const query = { _id: request.params.id };

  model
    .exists(query)
    .then((exists) => {
      if (!exists) {
        response.send(404);
        return;
      }

      model
        .findOneAndUpdate(query, request.body, {
          new: true,
        })
        .then(() => response.send(204))
        .catch((err) => sendError(response, err, PATCH));
    })
    .catch((err) => sendError(response, err, PATCH));
};

exports.GET = GET;
exports.POST = POST;
exports.PATCH = PATCH;
exports.DELETE = DELETE;
exports.sendError = sendError;
exports.getError = getError;
exports.getObject = getObject;
exports.patchObject = patchObject;
