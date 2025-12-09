const router = require("express").Router()

router.use("/product", require("./product.router"))

module.exports = router
