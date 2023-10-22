const express = require("express")
const logger = require("../utils/logger.js")
const model_quiz = require("../models/model_quiz.js")
const model_question = require("../models/model_question.js")

const controller_quiz = express.Router()

//Create new Quiz
controller_quiz.post("/", async (req, res) =>
{
    try
    {
        const { title, description, duration, questions, numberOfQuestions } = req.body

        await model_quiz.create({ title, description, duration, questions, numberOfQuestions })
        res.status(200).json({ message: "New Quiz created" })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})


//Get all quizes
controller_quiz.get("/", async (req, res) =>
{
    try
    {
        const quizes = await model_quiz.find({})
        res.status(200).json({ message: quizes })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//Get quiz by it's Id
controller_quiz.get("/:id", async (req, res) =>
{
    const id = req.params.id
    try
    {
        const quiz = await model_quiz.findById(id).populate("questions")

        if (!quiz)
        {
            return res.status(404).json({ message: "Quiz not found!" })
        }

        res.status(200).json({ message: quiz })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//Modify quiz
controller_quiz.put("/:id", async (req, res) =>
{
    try
    {
        const id = req.params.id
        const updatedData = req.body

        const num = Number(updatedData.numberOfQuestions)
        updatedData.numberOfQuestions = num

        const updatedQuiz = await model_quiz.findByIdAndUpdate(id, updatedData, { new: true })

        if (!updatedQuiz)
        {
            return res.status(404).json({ message: "Quiz not found" })
        }

        res.status(200).json({ message: "Quiz updated" })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

// Delete quiz with associated questions
controller_quiz.delete("/:id", async (req, res) =>
{
    try
    {
        const id = req.params.id

        // Find the quiz by its ID
        const quiz = await model_quiz.findById(id)

        if (!quiz)
        {
            return res.status(404).json({ message: "Quiz not found" })
        }

        // Find and remove associated questions
        await model_question.deleteMany({ quiz: id })

        // Remove the quiz
        await model_quiz.findByIdAndDelete(id)

        res.status(200).json({ message: "Quiz and associated questions deleted" })
    } catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})
module.exports = controller_quiz
