import { useState } from "react"
import { Table, Button, Container, Modal, Form, Accordion, InputGroup } from "react-bootstrap"
import { useQuestionContext } from "../../contexts/ContextQuestion.js"
import serviceQuestion from "../../services/serviceQuestion.js"

const ManageQuestion = () =>
{
    const { questions, fetchQuestions } = useQuestionContext()

    const [show, setShow] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [questionData, setQuestionData] = useState({
        description: "",
        explanation: "",
        id: "",
        image: "",
        name: "",
        options: [],
        quiz: {}
    })

    const openModal = () => setShow(true)
    const handleConfirmOpen = () => setShowConfirm(true)
    const handleConfirmClose = () => setShowConfirm(false)
    const handleClose = () =>
    {
        setShow(false)
        setQuestionData({
            description: "",
            explanation: "",
            id: "",
            image: "",
            name: "",
            options: [],
            quiz: {}
        })
    }

    const handleModify = async (e) =>
    {
        e.preventDefault()

        try
        {
            const modifiedQuestion = await serviceQuestion.modifyQuestion(questionData.id, questionData)
            console.log(modifiedQuestion)//there can be notification
            fetchQuestions()
            setShow(false)
            return setQuestionData({
                description: "",
                explanation: "",
                id: "",
                image: "",
                name: "",
                options: [],
                quiz: {}
            })


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
            const deleteQuestion = await serviceQuestion.deleteQuestion(questionData.id)
            console.log(deleteQuestion)
            fetchQuestions()
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

    if (!questions)
    {
        return <p>Questions not found!</p>
    }

    return (
        <Container>
            <h2 className="ql">Manage Question</h2>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th></th>
                        <th>Question Name</th>
                        <th>Quiz Belonging</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {questions?.map((ele, i) =>
                    (
                        <tr key={ele.id}>
                            <td>{i + 1}</td>
                            <td>{ele.name}</td>
                            <td>{ele.quiz.title}</td>
                            <td><Button onClick={() => { openModal(); setQuestionData(ele) }}>Modify</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modify Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Question Id</Form.Label>
                            <Form.Control type="text" name="id" value={questionData.id} disabled />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Quiz Title</Form.Label>
                            <Form.Control type="text" name="quiz" value={questionData.quiz?.title || ""} disabled />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" value={questionData.name} onChange={(e) => setQuestionData({ ...questionData, name: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Desctiption</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" value={questionData.description} onChange={(e) => setQuestionData({ ...questionData, description: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Correct answer explanation</Form.Label>
                            <Form.Control as="textarea" rows={3} name="explanation" value={questionData.explanation} onChange={(e) => setQuestionData({ ...questionData, explanation: e.target.value })} />
                        </Form.Group>

                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header><b>Answers List</b></Accordion.Header>
                                <Accordion.Body>
                                    {questionData.options?.map((option, i) =>
                                    (
                                        <InputGroup className="mb-1" key={option.id || i}>
                                            <InputGroup.Checkbox type="checkbox" name="isCorrect" checked={option.isCorrect} onChange={(e) =>
                                            {
                                                const newOption = [...questionData.options]
                                                newOption[i].isCorrect = e.target.checked
                                                setQuestionData({ ...questionData, options: newOption })
                                            }}
                                            />
                                            <Form.Control type="text" name="text" value={option.text} onChange={(e) =>
                                            {
                                                const newOption = [...questionData.options]
                                                newOption[i].text = e.target.value
                                                setQuestionData({ ...questionData, options: newOption })
                                            }} />
                                        </InputGroup>
                                    ))}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
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
                    <Modal.Title>Delete Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure want to Delete {questionData.name}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { handleConfirmClose(); handleClose() }}>Cancel</Button>
                    <Button variant="primary" onClick={handleDelete}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default ManageQuestion