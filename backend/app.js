const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const config = require("./utils/config.js")
const logger = require("./utils/logger.js")
const middleware = require("./utils/middleware.js")
const controller_question = require("./controllers/controller_question.js")
const controller_quiz = require("./controllers/controller_quiz.js")
const controller_quiz_action = require("./controllers/controller_quiz_action.js")

const app = express()


mongoose.connect(config.MONGODB)
    .then(() => logger.info("Connect to mongoDB"))
    .catch((err) => logger.error("Error connecting to mongoDB", err.message))


app.use(cors())
app.use(express.json())

app.use("/api/v1/quiz", controller_quiz)
app.use("/api/v1/question", controller_question)
app.use("/api/v1/begin_quiz", controller_quiz_action)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app