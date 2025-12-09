const BadRequestException = require("../error/BadRequestException")
const logger = require("../helper/logger")

/**
 * @param {import('zod').ZodSchema} schema
 */
const validatePayload =
  (schema) =>
  /**
   * Create Product Handler
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  (req, res, next) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      const zodError = JSON.parse(error.message)
      logger.error(zodError[0].message)
      next(new BadRequestException(zodError[0].message))
    }
  }

module.exports = validatePayload
