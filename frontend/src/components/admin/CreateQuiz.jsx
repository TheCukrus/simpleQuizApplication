import { useState } from "react"
import serviceQuiz from "../../services/serviceQuiz.js"
import { useQuizContext } from "../../contexts/ContextQuiz.js"
import { Form, Container, Button, Row, Col } from "react-bootstrap"

const CreateQuiz = () =>
{
    const { fetchQuizes } = useQuizContext()

    const [quizData, setQuizData] = useState({
        title: "",
        description: "",
        numberOfQuestions: 30,
        duration: 30
    });

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        try
        {
            const newQuiz = await serviceQuiz.createQuiz(quizData)
            fetchQuizes()
            setQuizData({
                title: "",
                description: "",
                numberOfQuestions: 30,
                duration: 30
            })
            return console.log(newQuiz)
        }
        catch (error)
        {
            console.error("Error creating quiz:", error);
        }
    };

    return (
        <Container>
            <h1 className="ql">Create Quiz</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control type="text" name="title" value={quizData.title} onChange={(e) => setQuizData({ ...quizData, title: e.target.value })} required />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Duration:</Form.Label>
                            <Form.Control type="number" name="duration" value={quizData.duration} onChange={(e) => setQuizData({ ...quizData, duration: e.target.value })} />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Question's per quiz:</Form.Label>
                            <Form.Control type="number" name="numberOfQuestions" value={quizData.numberOfQuestions} onChange={(e) => setQuizData({ ...quizData, numberOfQuestions: e.target.value })} />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control rows={3} as="textarea" name="description" value={quizData.description} onChange={(e) => setQuizData({ ...quizData, description: e.target.value })} required />
                </Form.Group>
                <Button type="submit">Create Quiz</Button>
            </Form>
        </Container >
    );
}

export default CreateQuiz;
