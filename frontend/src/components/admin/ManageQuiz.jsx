import { useState } from "react"
import serviceQuiz from "../../services/serviceQuiz.js"
import { Table, Button, Container, Modal, Form, Row, Col } from "react-bootstrap"
import { useQuizContext } from "../../contexts/ContextQuiz.js"

const ManageQuiz = () =>
{
    const { fetchQuizes, quizes } = useQuizContext()

    const [show, setShow] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [quizData, setQuizData] = useState({
        description: "",
        duration: "",
        id: "",
        questions: [],
        title: "",
        numberOfQuestions: ""
    })

    const handleOpen = () => setShow(true)
    const handleConfirmOpen = () => setShowConfirm(true)
    const handleConfirmClose = () => setShowConfirm(false)
    const handleClose = () =>
    {
        setShow(false)
        setQuizData({
            description: "",
            duration: "",
            id: "",
            questions: [],
            title: "",
            numberOfQuestions: "",
        })
    }

    const handleModify = async (e) =>
    {
        e.preventDefault()
        try
        {
            const modifiedQuiz = await serviceQuiz.modifiedQuiz(quizData.id, quizData)
            console.log(modifiedQuiz)//there can be notification
            fetchQuizes()
            setShow(false)
            return
        }
        catch (err)
        {
            console.log(err)
            setShow(false)
        }
    }

    const handleDelete = async (e) =>
    {
        e.preventDefault()
        try
        {
            const deleteQuiz = await serviceQuiz.deleteQuiz(quizData.id)
            console.log(deleteQuiz)
            fetchQuizes()
            setShowConfirm(false)
            setShow(false)
            return
        }
        catch (err)
        {
            console.log(err)
            setShow(false)
        }
    }

    if (!quizes)
    {
        return <p>Quizes not found!</p>
    }

    return (
        <Container>
            <h2 className="ql">Manage Quiz</h2>


            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Desctiption</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {quizes.map((ele, i) =>
                    (
                        <tr key={ele.id}>
                            <td>{i + 1}</td>
                            <td>{ele.title}</td>
                            <td>{ele.description}</td>
                            <td><Button onClick={() => { handleOpen(); setQuizData(ele) }} >Modify</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modify Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Quiz Id</Form.Label>
                            <Form.Control type="text" name="id" value={quizData.id} disabled />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" value={quizData.title} onChange={(e) => setQuizData({ ...quizData, title: e.target.value })} />
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Duration</Form.Label>
                                    <Form.Control type="number" name="duration" value={quizData.duration} onChange={(e) => setQuizData({ ...quizData, duration: e.target.value })} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Number quiestions in quiz</Form.Label>
                                    <Form.Control type="number" name="numberOfQuestions" value={quizData.numberOfQuestions} onChange={(e) => setQuizData({ ...quizData, numberOfQuestions: e.target.value })} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Number of Questions in this Quiz</Form.Label>
                            <Form.Control type="text" name="questions" value={quizData.questions.length} disabled />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" value={quizData.description} onChange={(e) => setQuizData({ ...quizData, description: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="warning" onClick={handleModify}>Modify</Button>
                    <Button variant="danger" onClick={handleConfirmOpen}>Delete</Button>
                </Modal.Footer>
            </Modal>

            <Modal centered show={showConfirm} onHide={handleConfirmClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure want to Delete {quizData.title} and all it's questions?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { handleConfirmClose(); handleClose() }} variant="secondary">Cancel</Button>
                    <Button onClick={handleDelete}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default ManageQuiz