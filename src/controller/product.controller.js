const BadRequestException = require("../error/BadRequestException")
const NotFoundException = require("../error/NotFoundException")
const {
  createProductService,
  findProductByIdService,
  findAllProductsService,
  updateProductByIdService,
  deletedProductByIdService,
  findAllProductPaginationService,
} = require("../service/product.service")
const productSchema = require("../validation/productPayload")

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const createProductHandler = async (req, res) => {
  try {
    const body = req.body

    try {
      productSchema.parse(body)
    } catch (error) {
      const zodError = JSON.parse(error.message)
      console.log(zodError)
      throw new BadRequestException(zodError[0].message)
    }

    res.status(201).json({
      code: 201,
      message: "Product created successfully",
      data: await createProductService(body),
    })
  } catch (error) {
    if (error instanceof BadRequestException)
      res
        .status(error.statusCode)
        .json({ code: error.statusCode, message: error.message })
    else res.status(500).json({ code: 500, message: error.message })
  }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const findAllProductHandler = async (req, res) => {
  try {
    res.status(200).json({
      code: 200,
      message: "Product found successfully",
      data: await findAllProductsService(),
    })
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message })
  }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const findAllProductPaginationHandler = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10

  const { data, totalPage, totalData } = await findAllProductPaginationService(
    page,
    limit
  )

  try {
    res.status(200).json({
      code: 200,
      message: "Product found successfully",
      data,
      meta: {
        page,
        limit,
        totalPage,
        totalData,
      },
    })
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message })
  }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const findProductByIdHandler = async (req, res) => {
  try {
    res.status(200).json({
      code: 200,
      message: "Product found successfully",
      data: await findProductByIdService(req.params.id),
    })
  } catch (error) {
    if (error instanceof NotFoundException)
      res
        .status(error.statusCode)
        .json({ code: error.statusCode, message: error.message })
    else res.status(500).json({ code: 500, message: error.message })
  }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const updateProductByIdHandler = async (req, res) => {
  try {
    const id = req.params.id
    const body = req.body

    const result = await updateProductByIdService(id, body)

    res.status(201).json({
      code: 201,
      message: "Product updated successfully",
      data: result,
    })
  } catch (error) {
    if (error instanceof BadRequestException)
      res
        .status(error.statusCode)
        .json({ code: error.statusCode, message: error.message })
    else res.status(500).json({ code: 500, message: error.message })
  }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const deleteProductByIdHandler = async (req, res) => {
  try {
    await deletedProductByIdService(req.params.id)

    res.status(200).json({
      code: 200,
      message: "Delete Product successfully",
    })
  } catch (error) {
    if (error instanceof NotFoundException)
      res
        .status(error.statusCode)
        .json({ code: error.statusCode, message: error.message })
    else res.status(500).json({ code: 500, message: error.message })
  }
}

module.exports = {
  createProductHandler,
  findAllProductHandler,
  findAllProductPaginationHandler,
  findProductByIdHandler,
  updateProductByIdHandler,
  deleteProductByIdHandler,
}
