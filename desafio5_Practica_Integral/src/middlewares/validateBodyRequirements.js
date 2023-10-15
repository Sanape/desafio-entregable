//Imports
import _ from "lodash";

/**
 * Creates a middleware function that checks
 * if the body of the request does contain specified attributes
 *
 * @param {string[]} mustAttributes - An array of attribute names that
 * must be present in the request body
 * @returns {Function} - A middleware function that checks the presence of the specified attributes
 * @throws {CustomError} - If any of the must attributes are not found in the request body
 */
function body_must_contain_attributes(mustAttributes) {
  /**
   * Middleware function that checks if the body of the request does contain the specified attributes
   *
   * @param {Object} req - The request object from the HTTP request
   * @param {Object} res - The response object from the HTTP response
   * @param {Function} next - The next function in the middleware chain
   * @throws {CustomError} - If any of the must attributes are not found in the request body
   */
  return function (req, res, next) {
    try {
      const bodyAttributes = Object.keys(req.body);

      const intersectedAttributes = _.intersection(
        bodyAttributes,
        mustAttributes
      );

      if (!_.isEqual(intersectedAttributes.sort(), mustAttributes.sort())) {
        const missingAttributes = _.difference(mustAttributes, bodyAttributes);
        return res.status(400).json({
          message: `The body is missing the following attributes: ${missingAttributes}`,
        });
      }

      return next();
    } catch (error) {
      next(error);
    }
  };
}

//Exports

export { body_must_contain_attributes };
