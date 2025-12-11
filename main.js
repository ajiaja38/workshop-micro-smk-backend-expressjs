const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const mongoConnection = require("./src/config/db")
const logger = require("./src/helper/logger")
const router = require("./src/router")
const globalExceptionMiddleware = require("./src/middleware/globalException.middleware")

const app = express()
const port = 3000
const prefix = "/api"

app.use(cors())
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
app.use(globalExceptionMiddleware)

app.listen(port, () => {
  logger.info(`App Workshop listening on http://localhost:${port}${prefix}`)
})
