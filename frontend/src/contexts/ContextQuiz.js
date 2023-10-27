import { useContext, createContext, useState, useEffect } from "react"
import serviceQuiz from "../services/serviceQuiz.js"

const ContextQuiz = createContext()

export const QuizProvider = ({ children }) =>
{
    const [quizes, setQuizes] = useState([])

    const fetchQuizes = async () =>
    {
        try
        {
            const quizes = await serviceQuiz.getQuizes()
            setQuizes(quizes)
        }
        catch (err)
        {
            console.log(err)
        }
    }

    useEffect(() => { fetchQuizes() }, [])

    return (
        <ContextQuiz.Provider value={{ quizes, fetchQuizes }}>
            {children}
        </ContextQuiz.Provider>
    )
}

export const useQuizContext = () => useContext(ContextQuiz)