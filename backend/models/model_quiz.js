const mongoose = require("mongoose")

const quiz_schema = new mongoose.Schema({
    title: { type: String, required: true, },
    description: { type: String, required: true, },
    duration: { type: Number, default: 30, required: true, },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "question",
        },
    ],
    started: { type: Boolean, default: false },
    numberOfQuestions: { type: Number, default: 30 }
})

quiz_schema.set("toJSON", {
    transform: (document, returnObject) =>
    {
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
    }
})



const model_quiz = mongoose.model("quiz", quiz_schema, "quiz")

module.exports = model_quiz
