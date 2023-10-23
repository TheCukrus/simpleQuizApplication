const model_question = require("../models/model_question.js")

const getRandomQuestion = async (quizId, count) =>
{
    try
    {
        //Fetch all questions for the specified quiz
        const questions = await model_question.find({ quiz: quizId })

        //Shuffle the array ramdomly
        const shuffledQuestions = shuffleArray(questions)

        //Slice the array to get the desire number of random questions
        const ramdomQuestions = shuffledQuestions.slice(0, count)

        return ramdomQuestions
    }
    catch (err)
    {
        console.log(err)
    }
}

const shuffleArray = (arr) =>
{
    const shuffleArray = [...arr]
    const newArr = []

    for (let i = shuffleArray.length - 1; i >= 0; i--)
    {
        var randomNumber = Math.floor(Math.random() * (i + 1))
        newArr.push(shuffleArray[randomNumber])
        shuffleArray.splice(randomNumber, 1)
    }

    return newArr
}

module.exports = { getRandomQuestion }