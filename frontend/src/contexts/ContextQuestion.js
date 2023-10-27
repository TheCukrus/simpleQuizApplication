import { useContext, createContext, useState, useEffect } from "react"
import serviseQuestion from "../services/serviceQuestion.js"

const ContextQuestion = createContext()

export const QuestionProvider = ({ children }) =>
{
    const [questions, setQuestions] = useState([])

    const fetchQuestions = async () =>
    {
        try
        {
            const questions = await serviseQuestion.getAllQuestions()
            return setQuestions(questions)
        }
        catch (err)
        {
            console.log(err)
        }
    }

    useEffect(() => { fetchQuestions() }, [])

    return (
        <ContextQuestion.Provider value={{ questions, setQuestions, fetchQuestions }}>
            {children}
        </ContextQuestion.Provider>
    )
}

export const useQuestionContext = () => useContext(ContextQuestion)