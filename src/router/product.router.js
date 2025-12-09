const {
  createProductHandler,
  findProductByIdHandler,
  findAllProductHandler,
  updateProductByIdHandler,
  deleteProductByIdHandler,
  findAllProductPaginationHandler,
} = require("../controller/product.controller")
const validatePayload = require("../middleware/validation.middleware")
const productSchema = require("../validation/productPayload")

const router = require("express").Router()

router.post("/", createProductHandler)
router.get("/", findAllProductHandler)
router.get("/paginate", findAllProductPaginationHandler)
router.get("/:id", findProductByIdHandler)
router.put("/:id", validatePayload(productSchema), updateProductByIdHandler)
router.delete("/:id", deleteProductByIdHandler)

module.exports = router
