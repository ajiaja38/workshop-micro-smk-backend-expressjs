const express = require("express")
const morgan = require("morgan")
const mongoConnection = require("./src/config/db")
const logger = require("./src/helper/logger")
const router = require("./src/router")

const app = express()
const port = 3000
const prefix = "/api"

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoConnection()

app.get(prefix, (req, res) => {
  res.json({
    code: 200,
    message: "Hello, API Tokopaedi",
  })
})

app.use(`${prefix}`, router)

app.listen(port, () => {
  logger.info(`App listening on http://localhost:${port}${prefix}`)
})
