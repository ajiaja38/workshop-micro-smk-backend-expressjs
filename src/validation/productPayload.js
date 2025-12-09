const zod = require("zod")

const productSchema = zod.object({
  title: zod.string().min(5),
  imgUrl: zod.string().min(5),
  price: zod
    .number({ message: "Harga harus berupa angka" })
    .min(1000, { message: "Minimal harga adalah 1000 rupiah" }),
  stock: zod.number().min(1, { message: "Minimal stock adalah 1" }),
  category: zod.string().default("general"),
})

module.exports = productSchema
