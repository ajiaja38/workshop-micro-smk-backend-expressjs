const mongoose = require("mongoose")
const logger = require("../helper/logger")

const mongoUrl =
  "mongodb://mikro-smk:mg0gp0frmoG3bJUg@nosql.smartsystem.id:27017/mikro-smk"

const mongoConnection = async () => {
  try {
    await mongoose.connect(mongoUrl)
    logger.info("🔥 MongoDB connected successfully!")
  } catch (error) {
    logger.error("❌ Error connecting to MongoDB:", err.message)
    process.exit(1)
  }
}

module.exports = mongoConnection
