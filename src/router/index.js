const router = require("express").Router()

router.use("/product", require("./product.router"))
router.use("/category", require("./category.router"))

module.exports = router
