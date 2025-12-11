const {
  createCategory,
  findAllCategory,
  findCategoryById,
} = require("../service/category.service")

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const createdCategoryHandler = async (req, res) => {
  const body = req.body

  res.status(201).json({
    code: 201,
    message: "Category created successfully",
    data: await createCategory(body),
  })
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const findAllCategoryHandler = async (req, res) => {
  res.status(201).json({
    code: 201,
    message: "Category created successfully",
    data: await findAllCategory(),
  })
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const findCategoryByIdHandler = async (req, res) => {
  const id = req.params.id

  res.status(201).json({
    code: 201,
    message: "Category get successfully",
    data: await findCategoryById(id),
  })
}

module.exports = {
  createdCategoryHandler,
  findAllCategoryHandler,
  findCategoryByIdHandler,
}
