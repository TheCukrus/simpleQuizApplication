import { useState } from "react"
import serviceQuestion from "../../services/serviceQuestion.js"
import { Container, Form, InputGroup, Button, Stack } from "react-bootstrap"
import { useQuizContext } from "./../../contexts/ContextQuiz.js"
import { useQuestionContext } from "./../../contexts/ContextQuestion.js"

function CreateQuestion()
{
    const { quizes } = useQuizContext()
    const { fetchQuestions } = useQuestionContext()

    const [questionData, setQuestionData] = useState({
        name: "",
        description: "",
        options: [
            { text: "", isCorrect: false },
        ],
        image: "",
        explanation: "",
        quiz: ""
    })

    //Add option field
    const addOption = (e) =>
    {
        e.preventDefault()
        const newOption = [{ text: "", isCorrect: false }]
        const addedOption = questionData.options
        return setQuestionData({ ...questionData, options: addedOption.concat(newOption) })
    }

    //Remove last option field
    const removeOption = (e) =>
    {
        e.preventDefault()
        const options = questionData.options
        options.pop()
        return setQuestionData({ ...questionData, options: options })
    }

    //Create new question
    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        if (!questionData.quiz)
        {
            return console.log("Select category")
        }

        try
        {
            const newQuestion = await serviceQuestion.createQuestion(questionData)
            setQuestionData({
                name: "",
                description: "",
                options: [
                    { text: "", isCorrect: false },
                ],
                image: "",
                explanation: "",
                quiz: ""
            })
            fetchQuestions()
            return console.log(newQuestion)
        }
        catch (err)
        {
            console.log(err)
        }
    }

    return (
        <Container>
            <h1 className="ql">Create Question</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Label>Select Quiz to assign question</Form.Label>

                {!quizes
                    ? <p>Loading...</p>
                    :
                    <Form.Select className="mb-3" aria-label="Select Quiz" onChange={(e) => setQuestionData({ ...questionData, quiz: e.target.value })} value={questionData.quiz} >
                        <option value="">Select a Quiz</option>
                        {quizes.map((ele) =>
                        (
                            <option key={ele.id} value={ele.id}>
                                {ele.title}
                            </option>
                        ))}
                    </Form.Select>}

                <Form.Group className="mb-3">
                    <Form.Label>Question Name:</Form.Label>
                    <Form.Control type="text" name="name" value={questionData.name} onChange={(e) => setQuestionData({ ...questionData, name: e.target.value })} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Question Description:</Form.Label>
                    <Form.Control as="textarea" rows={2} name="description" value={questionData.description} onChange={(e) => setQuestionData({ ...questionData, description: e.target.value })} required />
                </Form.Group>

                <Form.Label>Options (Check correct answers)</Form.Label>
                {questionData.options.map((ele, i) =>
                (
                    <InputGroup className="mb-1" key={`option-${i}`}>
                        <InputGroup.Checkbox
                            aria-label="Checking if answer is correct"
                            type="checkbox"
                            name="isCorrect"
                            checked={ele.isCorrect}
                            onChange={(e) =>
                            {
                                const newOption = [...questionData.options]
                                newOption[i].isCorrect = e.target.checked
                                setQuestionData({ ...questionData, options: newOption })
                            }}
                        />
                        <Form.Control
                            type="text"
                            name="text"
                            value={ele.text}
                            placeholder="Option text"
                            onChange={(e) =>
                            {
                                const newOption = [...questionData.options];
                                newOption[i].text = e.target.value;
                                setQuestionData({ ...questionData, options: newOption });
                            }}
                        />
                    </InputGroup>
                ))}

                <Stack direction="horizontal" gap={3}>
                    <Button className="mt-3 mb-3" onClick={addOption}>Add option</Button>
                    <Button className="mt-3 mb-3" onClick={removeOption}>Remove last option</Button>
                </Stack>

                <Form.Group className="mb-3">
                    <Form.Label>Expalnation (optional)</Form.Label>
                    <Form.Control as="textarea" rows={2} name="explanation" value={questionData.explanation} onChange={(e) => setQuestionData({ ...questionData, explanation: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Image URL (optional)</Form.Label>
                    <Form.Control type="text" name="image" value={questionData.image} onChange={(e) => setQuestionData({ ...questionData, image: e.target.value })} />
                </Form.Group>

                <Button type="submit">Create Question</Button>
            </Form>
        </Container>
    )
}

export default CreateQuestion