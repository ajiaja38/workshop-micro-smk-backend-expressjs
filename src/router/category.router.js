const {
  createdCategoryHandler,
  findAllCategoryHandler,
  findCategoryByIdHandler,
} = require("../controller/category.controller")

const router = require("express").Router()

router.post("/", createdCategoryHandler)
router.get("/", findAllCategoryHandler)
router.get("/:id", findCategoryByIdHandler)

module.exports = router
