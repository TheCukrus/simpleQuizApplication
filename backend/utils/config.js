const path = require("path")

require("dotenv").config({ path: path.resolve(__dirname, "../.env") })

const PORT = process.env.PORT
const MONGODB = process.env.MONGODB
const JWT_SECRET = process.env.JWT_SECRET

module.exports = { PORT, MONGODB, JWT_SECRET }