import axios from "axios"

const baseUrl = "http://127.0.0.1:80/api/v1/begin_quiz"

//Starting quiz
const startQuiz = async (id) =>
{
    const start = await axios.post(`${baseUrl}/start/${id}`)
    return start.data.message
}

//Get quiz state for specific quiz
const checkQuiz = async (id) =>
{
    try
    {
        const checkQuiz = await axios.get(`${baseUrl}/${id}`)
        return checkQuiz.data.message
    }
    catch (err)
    {
        console.log(err)
    }
}

//Select answer
const selectAnswer = async (id, data) =>
{
    try
    {
        const selectAnswer = await axios.post(`${baseUrl}/${id}/answer`, data)
        return selectAnswer.data.message
    }
    catch (err)
    {
        console.log(err)
    }
}

//Finish quiz
const finish = async (id) =>
{
    try
    {
        const finishQuiz = await axios.get(`${baseUrl}/${id}/finish`)
        return finishQuiz.data.message
    }
    catch (err)
    {
        console.log()
    }
}

//Delete state
const deleteState = async (id) =>
{
    try
    {
        const deleteState = await axios.delete(`${baseUrl}/${id}`)
        return deleteState.data.message
    }
    catch (err)
    {
        console.log(err)
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { startQuiz, checkQuiz, selectAnswer, finish, deleteState }