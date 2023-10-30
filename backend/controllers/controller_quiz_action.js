const express = require("express")
const logger = require("../utils/logger.js")
const model_quiz_state = require("../models/model_quiz_state.js")
const ramdomizer = require("../modules/ramdomizer.js")
const quiz_helper = require("../modules/quiz_helper.js")
const model_quiz = require("../models/model_quiz.js")

const controller_quiz_action = express.Router()

//Start quiz and get ramdomized questions
controller_quiz_action.post("/start/:id", async (req, res) =>
{
    try
    {
        const quizId = req.params.id

        //Check if a quiz state already exists for this quiz
        let quiz_state = await model_quiz_state.findOne({ quizId })

        if (quiz_state)
        {
            return res.status(200).json({ message: "Quiz already started", quiz_state })
        }

        //If no quiz state exists, create new one
        quiz_state = new model_quiz_state({ quizId })

        //Set the quiz as started
        quiz_state.started = true

        //Search from quiz it's duration, number of question and add it to state
        const quiz_timer = await model_quiz.findById(quizId)

        quiz_state.timer = quiz_timer.duration * 60 * 1000

        //Set a new startDate for the quiz state
        quiz_state.startDate = new Date()

        //Get ramdomized questions using the ramdomizer module
        const questions = await ramdomizer.getRandomQuestion(quizId, quiz_timer.numberOfQuestions)//There in future we can change questions in quiz

        quiz_state.ramdomizedQuestions = questions.map((ele) => ele.id)

        await quiz_state.populate("ramdomizedQuestions", { description: 1, id: 1, image: 1, name: 1, quiz: 1, hasMultipleCorrectAnswers: 1, options: { text: 1 } })



        await quiz_state.save()

        res.status(200).json({ message: "Quiz started", quiz_state })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//Get quiz state for a specific quiz
controller_quiz_action.get("/:id", async (req, res) =>
{
    try
    {
        const quizId = req.params.id

        //Find the quiz state for the given quiz id
        const quiz_state = await model_quiz_state.findOne({ quizId }).populate("ramdomizedQuestions", { description: 1, id: 1, image: 1, name: 1, quiz: 1, hasMultipleCorrectAnswers: 1, options: { text: 1 } })

        if (!quiz_state)
        {
            return res.status(404).json({ message: "Quiz state not found" })
        }

        res.status(200).json({ message: quiz_state })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//Update quiz state with user's answer
controller_quiz_action.post("/:id/answer", async (req, res) =>
{
    try
    {
        const quizId = req.params.id
        const { questionId, answers } = req.body
        let { index } = req.body

        //Find the quiz state for the given quiz Id
        const quiz_state = await model_quiz_state.findOne({ quizId }).populate("ramdomizedQuestions")

        if (!quiz_state)
        {
            return res.status(404).json({ message: "Quiz state not found" })
        }

        //Check if the timer has run out
        if (quiz_state.timer && quiz_state.timer._destroyed)
        {
            //Finish the quiz if the timer has run out
            quiz_state.finished = true
            await quiz_state.save()

            //Calculate and send results
            const result = quiz_helper.calculateQuizResults(quiz_state)
            return res.status(200).json({ message: "Quiz finished due to timer expirity", result })
        }

        //if index is less than 0 then it launch last question
        if (index === -1)
        {
            index = quiz_state.ramdomizedQuestions.length - 1
        }

        //if index is more than question's length then it lounch first question
        if (index === quiz_state.ramdomizedQuestions.length)
        {
            index = 0
        }

        //Find the index of the user's answer for the given question, if it exists
        const checkForQuestionExistance = quiz_state.userAnswers.find((ele) => ele.questionId.toString() === questionId)

        if (!checkForQuestionExistance)
        {
            quiz_state.userAnswers.push({ questionId, answer: answers });
        }
        else
        {
            const answerIndex = quiz_state.userAnswers.findIndex((ele) => ele.questionId.toString() === questionId);
            quiz_state.userAnswers[answerIndex].answer = answers
        }

        quiz_state.currentQuestionIndex = index

        await quiz_state.save()

        res.status(200).json({ message: "Answer submitted", quiz_state })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//Finish a quiz and send results
controller_quiz_action.get("/:id/finish", async (req, res) =>
{
    try
    {
        const quizId = req.params.id

        //Finish the quiz state for the given quiz id
        const quiz_state = await model_quiz_state.findOne({ quizId }).populate("ramdomizedQuestions")

        if (!quiz_state)
        {
            return res.status(404).json({ message: "Quiz state not found" })
        }

        //Clear the timer when finishing the quiz
        clearTimeout(quiz_state.timer)

        //Set the quiz as finished
        quiz_state.finished = true
        await quiz_state.save()

        //Calculate and send results
        const result = quiz_helper.calculateQuizResults(quiz_state)

        quiz_state.result = result


        res.status(200).json({ message: quiz_state })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//Delete state
controller_quiz_action.delete("/:id", async (req, res) =>
{
    try
    {
        const quizId = req.params.id

        const quiz_state = await model_quiz_state.findOne({ quizId }).populate("ramdomizedQuestions")

        if (!quiz_state)
        {
            return res.status(404).json({ message: "Quiz state not found" })
        }

        const removeState = await model_quiz_state.findByIdAndRemove(quiz_state.id)

        if (!removeState)
        {
            return res.status(400).json({ message: "Can't find state" })
        }

        res.status(200).json({ message: "State removed successfull" })

    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = controller_quiz_action