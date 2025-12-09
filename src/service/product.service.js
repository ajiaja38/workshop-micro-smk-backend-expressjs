const BadRequestException = require("../error/BadRequestException")
const NotFoundException = require("../error/NotFoundException")
const Product = require("../model/product")

const createProductService = async (data) => {
  const product = await new Product(data).save()

  if (!product) throw new BadRequestException("Product not created")

  return product
}

const findAllProductsService = async () => await Product.find()

const findAllProductPaginationService = async (page, limit) => {
  const skip = (page - 1) * limit

  const totalData = await Product.countDocuments()
  const totalPage = Math.ceil(totalData / limit)
  const data = await Product.find().skip(skip).limit(limit)

  return {
    data,
    totalPage,
    totalData,
  }
}

const findProductByIdService = async (_id) => {
  const product = await Product.findById(_id)

  if (!product) throw new NotFoundException("Product not found")

  return product
}

const updateProductByIdService = async (_id, data) => {
  const updatedProduct = await Product.findByIdAndUpdate(_id, data, {
    new: true,
  })

  if (!updatedProduct) throw new BadRequestException("Product not updated")

  return updatedProduct
}

const deletedProductByIdService = async (_id) => {
  const deletedProduct = await Product.findByIdAndDelete(_id)

  if (!deletedProduct) throw new NotFoundException("Product not found")
}

module.exports = {
  createProductService,
  findAllProductsService,
  findAllProductPaginationService,
  findProductByIdService,
  updateProductByIdService,
  deletedProductByIdService,
}
