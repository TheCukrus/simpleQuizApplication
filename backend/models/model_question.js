const mongoose = require("mongoose")

const question_schema = new mongoose.Schema({
    "name": { type: String, required: true, unique: true },
    "description": { type: String, required: true },
    "options": [
        {
            "text": { type: String },
            "isCorrect": { type: Boolean }
        }
    ],
    "hasMultipleCorrectAnswers": Boolean,
    "image": { type: String },
    "explanation": { type: String },
    "quiz": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "quiz"
    }
})

question_schema.set("toJSON", {
    transform: (document, returnObject) =>
    {
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
    }
})

const model_question = mongoose.model("question", question_schema, "question")

module.exports = model_question