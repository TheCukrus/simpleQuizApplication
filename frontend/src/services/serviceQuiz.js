import axios from "axios"

const baseUrl = "http://127.0.0.1:80/api/v1/quiz"

//Create quiz
const createQuiz = async (data) =>
{
    try
    {
        const newQuiz = await axios.post(baseUrl, data)
        return newQuiz.data.message
    }
    catch (err)
    {
        console.log(err)
    }
}

//Get all quizes
const getQuizes = async () =>
{
    try
    {
        const quizes = await axios.get(baseUrl)
        return quizes.data.message
    }
    catch (err)
    {
        console.log(err)
    }
}

//Get quiz by it Id
const quizById = async (id) =>
{
    try
    {
        const quiz = await axios.get(`${baseUrl}/${id}`)
        return quiz.data.message
    }
    catch (err)
    {
        console.log(err)
    }
}

//Update Quiz
const modifiedQuiz = async (id, data) =>
{
    try
    {
        const modifiedQuiz = await axios.put(`${baseUrl}/${id}`, data)
        return modifiedQuiz.data.message
    }
    catch (err)
    {
        console.log(err)
    }
}

//Delete Quiz
const deleteQuiz = async (id) =>
{
    try
    {
        const removeQuiz = await axios.delete(`${baseUrl}/${id}`)
        return removeQuiz.data.message
    }
    catch (err)
    {
        console.log(err)
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { createQuiz, getQuizes, quizById, modifiedQuiz, deleteQuiz }