const {
  createProductService,
  findProductByIdService,
  findAllProductsService,
  updateProductByIdService,
  deletedProductByIdService,
  findAllProductPaginationService,
} = require("../service/product.service")

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const createProductHandler = async (req, res) => {
  const body = req.body

  res.status(201).json({
    code: 201,
    message: "Product created successfully",
    data: await createProductService(body),
  })
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const findAllProductHandler = async (req, res) => {
  res.status(200).json({
    code: 200,
    message: "Product found successfully",
    data: await findAllProductsService(),
  })
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
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const findProductByIdHandler = async (req, res) => {
  res.status(200).json({
    code: 200,
    message: "Product found successfully",
    data: await findProductByIdService(req.params.id),
  })
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const updateProductByIdHandler = async (req, res) => {
  const id = req.params.id
  const body = req.body

  const result = await updateProductByIdService(id, body)

  res.status(201).json({
    code: 201,
    message: "Product updated successfully",
    data: result,
  })
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const deleteProductByIdHandler = async (req, res) => {
  const id = req.params.id

  await deletedProductByIdService(id)

  res.status(200).json({
    code: 200,
    message: "Delete Product successfully",
  })
}

module.exports = {
  createProductHandler,
  findAllProductHandler,
  findAllProductPaginationHandler,
  findProductByIdHandler,
  updateProductByIdHandler,
  deleteProductByIdHandler,
}
