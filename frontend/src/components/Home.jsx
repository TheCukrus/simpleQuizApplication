import { useState } from "react"
import { Container, ListGroup, Modal, Button } from "react-bootstrap"
import { useQuizContext } from "../contexts/ContextQuiz.js"
import { useNavigate } from "react-router-dom"
import serviceStartQuiz from "../services/serviceStartQuiz.js"
import "../assets/styles/Home.css"

const Home = () =>
{
    const { quizes } = useQuizContext()
    const quizStartingPoint = useNavigate()

    const [show, setShow] = useState(false)
    const [currentQuiz, setCurrentQuiz] = useState({
        description: "",
        duration: Number,
        id: "",
        title: ""
    })

    const openModal = () => setShow(true)
    const closeModal = () =>
    {
        setCurrentQuiz({
            description: "",
            duration: Number,
            id: "",
            title: ""
        })
        setShow(false)
    }

    const startQuiz = async (id) =>
    {
        try
        {
            const start = await serviceStartQuiz.startQuiz(id)
            console.log(start)
        }
        catch (err)
        {
            console.log(err)
        }
        finally
        {
            quizStartingPoint(`/quiz/${currentQuiz.id}`)
        }
    }

    return (
        <Container>
            <h1 className="mt-4 mb-4 hm">Welcome to your quiz app</h1>
            <ListGroup >
                {!quizes
                    ? (<div>Loading...</div>)
                    : (quizes.map((ele) =>
                    (
                        <ListGroup.Item key={ele.id} action onClick={() => { openModal(); setCurrentQuiz(ele); }} className="quiz-item">
                            {ele.title}
                        </ListGroup.Item>
                    ))
                    )}
            </ListGroup>

            <Modal show={show} onHide={closeModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Start Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentQuiz.description}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeModal} variant="secondary">Cancel</Button>
                    <Button onClick={() => { startQuiz(currentQuiz.id) }} variant="primary">Start Quiz</Button>
                </Modal.Footer>
            </Modal>

        </Container >
    )
}

export default Home