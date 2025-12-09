/**
 * @param {import('express').ErrorRequestHandler} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
module.exports = (err, req, res, next) => {
  if (err.statusCode)
    return res.status(err.statusCode).json({
      code: err.statusCode,
      message: err.message,
    })

  return res.status(500).json({
    code: 500,
    message: err.message,
  })
}
