const express = require("express")
const model_question = require("../models/model_question.js")
const model_quiz = require("../models/model_quiz.js")
const logger = require("../utils/logger.js")

const controller_question = express()

//Create question
controller_question.post("/", async (req, res) =>
{
    try
    {
        const { name, description, options, image, explanation, quiz } = req.body

        const hasMultipleCorrectAnswers = options.filter((option) => option.isCorrect).length > 1

        const newQuestion = await model_question.create({
            name, description, options, image, explanation, quiz, hasMultipleCorrectAnswers
        })

        //Update the associated quiz's questions array
        await model_quiz.findByIdAndUpdate(quiz, {
            $push: { questions: newQuestion.id }
        })

        res.status(200).json({ message: "Created new question" })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//Get question by Id
controller_question.get("/:id", async (req, res) =>
{
    try
    {
        const id = req.params.id
        const question = await model_question.findById(id).populate("quiz", { title: 1, description: 1 })

        if (!question)
        {
            return res.status(400).json({ message: "Question not found" })
        }

        res.status(200).json({ message: question })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//Get all questions
controller_question.get("/", async (req, res) =>
{
    try
    {
        const question = await model_question.find({}).populate("quiz", { title: 1, description: 1 })
        res.status(200).json({ message: question })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//Update question
controller_question.put("/:id", async (req, res) =>
{
    try
    {
        const id = req.params.id
        const modifiedData = {
            description: req.body.description,
            explanation: req.body.explanation,
            id: req.body.id,
            image: req.body.image,
            name: req.body.name,
            options: req.body.options
        }

        await model_question.findByIdAndUpdate(id, modifiedData, { new: true })

        if (!modifiedData)
        {
            return res.status(400).json({ message: "Question not found" })
        }

        res.status(200).json({ message: "Question updated" })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//Delete question
controller_question.delete("/:id", async (req, res) =>
{
    try
    {
        const id = req.params.id
        const remuveQuestion = await model_question.findByIdAndRemove(id)

        if (!remuveQuestion)
        {
            return res.status(400).json({ message: "Question not found" })
        }

        res.status(200).json({ message: "Question removed" })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = controller_question
