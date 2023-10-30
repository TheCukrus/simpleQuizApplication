const mongoose = require("mongoose")

const quiz_state_schema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "quiz",
        required: true
    },
    currentQuestionIndex: { type: Number, default: 0 },
    userAnswers: [{
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "question",
        },
        answer: [{ type: String }]
    }],
    ramdomizedQuestions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "question"
    }],
    started: { type: Boolean, default: false },
    finished: { type: Boolean, default: false },
    timer: { type: Number },
    startDate: { type: Date},
    result: { type: Array }
})

quiz_state_schema.set("toJSON", {
    transform: (document, returnObject) =>
    {
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
    }
})


const model_quiz_state = mongoose.model("quiz_state", quiz_state_schema, "quiz_state")

module.exports = model_quiz_state