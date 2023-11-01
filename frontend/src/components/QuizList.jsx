import { Link } from "react-router-dom"
import { useQuizContext } from "../contexts/ContextQuiz.js"
import { ListGroup, Container } from "react-bootstrap"
import "../assets/styles/QuizList.css"

const QuizList = () =>
{
    const { quizes } = useQuizContext()

    if (!quizes)
    {
        return <Container>Quiz not found</Container>
    }

    return (
        <Container>
            <h1 className="mt-4 mb-4 ql">Quiz List</h1>
            <ListGroup>
                {quizes.map((quiz) => (
                    <ListGroup.Item key={quiz.id}>
                        <Link to={`/quizzes/${quiz.id}`}>{quiz.title}</Link>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    )
}

export default QuizList