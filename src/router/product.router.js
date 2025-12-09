const {
  createProductHandler,
  findProductByIdHandler,
  findAllProductHandler,
  updateProductByIdHandler,
  deleteProductByIdHandler,
} = require("../controller/product.controller")
const validatePayload = require("../middleware/validation.middleware")
const productSchema = require("../validation/productPayload")

const router = require("express").Router()

router.post("/", createProductHandler)
router.get("/", findAllProductHandler)
router.get("/:id", findProductByIdHandler)
router.put("/:id", validatePayload(productSchema), updateProductByIdHandler)
router.delete("/:id", deleteProductByIdHandler)

module.exports = router
