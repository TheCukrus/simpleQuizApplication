import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import serviceQuiz from "../services/serviceQuiz.js"
import { Container, ListGroup } from "react-bootstrap"

function QuizDetails()
{
    const { quizId } = useParams()
    const [quiz, setQuiz] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchData = async () =>
    {
        try
        {
            const quizDetail = await serviceQuiz.quizById(quizId)
            setQuiz(quizDetail)
            setLoading(false)
            return console.log(quizDetail)
        }
        catch (err)
        {
            console.log(err)
            setLoading(false)
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { fetchData() }, [])

    if (loading)
    {
        return <Container>Loading...</Container>
    }

    if (!quiz)
    {
        return <Container>Quiz not found</Container>
    }

    return (
        <Container>
            <h1>{quiz.title}</h1>
            <p>{quiz.description}</p>
            <p>Duration: {quiz.duration} minutes</p>
            <h2>Question list</h2>
            <ListGroup>
                {quiz.questions.map((question) => (
                    <ListGroup.Item key={question.id}>
                        <h3>{question.name}</h3>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    )
}

export default QuizDetails
