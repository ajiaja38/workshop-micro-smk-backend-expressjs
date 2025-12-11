const BadRequestException = require("../error/BadRequestException")
const NotFoundException = require("../error/NotFoundException")
const Category = require("../model/category")

const createCategory = async (data) => {
  const category = await new Category(data).save()

  if (!category) throw new BadRequestException("Catetgory not created")

  return category
}

const findAllCategory = async () => await Category.find()

const findCategoryById = async (_id) => {
  const category = await Category.findById(_id)

  if (!category) throw new NotFoundException(`Category ${_id} not found`)

  return category
}

const updateCategoryById = async (_id, data) => {
  const updatedCategory = await Category.findByIdAndUpdate(_id, data, {
    new: true,
  })

  if (!updatedCategory) throw new BadRequestException("Category is not updated")

  return updatedCategory
}

const deleteCategoryById = async (_id) => {
  const deletedCategory = await Category.findByIdAndDelete(_id)

  if (!deletedCategory) throw new NotFoundException("Category not found")
}

module.exports = {
  createCategory,
  findAllCategory,
  findCategoryById,
  updateCategoryById,
  deleteCategoryById,
}
