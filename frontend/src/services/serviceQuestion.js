import axios from "axios"

const baseUrl = "http://127.0.0.1:80/api/v1/question"

//Create question
const createQuestion = async (data) =>
{
    try
    {
        const newQuestion = await axios.post(baseUrl, data)
        return newQuestion.data.message
    }
    catch (err)
    {
        console.log(err)
    }
}

//Get all questions
const getAllQuestions = async () =>
{
    try
    {
        const questions = await axios.get(baseUrl)
        return questions.data.message
    }
    catch (err)
    {
        console.log(err)
    }
}

//Modify Question
const modifyQuestion = async (id, data) =>
{
    try
    {
        const question = await axios.put(`${baseUrl}/${id}`, data)
        return question.data.message
    }
    catch (err)
    {
        console.log(err)
    }
}

//Delete question
const deleteQuestion = async (id) =>
{
    try
    {
        const deletedQuestion = await axios.delete(`${baseUrl}/${id}`)
        return deletedQuestion.data.message
    }
    catch (err)
    {
        console.log(err)
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { createQuestion, getAllQuestions, modifyQuestion, deleteQuestion }