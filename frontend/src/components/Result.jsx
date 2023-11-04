import { useState } from "react"
import { ListGroup, Accordion, Badge, Button, Container, Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import serviceStartQuiz from "../services/serviceStartQuiz.js"

const Result = ({ quizResult }) =>
{
    const [showAnswers, setShowAnswers] = useState(false)

    const home = useNavigate()

    const rightQuestions = quizResult.ramdomizedQuestions;
    const userAnswers = quizResult.userAnswers;
    const result = quizResult.result;

    const finalScore = quizResult.result.reduce((score, ele) => score + ele.score, 0);

    const removeState = async (id) =>
    {
        try
        {
            const removeState = await serviceStartQuiz.deleteState(id)
            console.log(removeState)
            home("/")

        }
        catch (err)
        {
            console.log(err)
        }
    }

    //Calculate Percentage
    const calculatePercentage = (score, maxScore) =>
    {
        if (maxScore === 0)
        {
            return 0
        }

        const percentage = (score / maxScore) * 100
        return percentage.toFixed(2)
    }

    const percentage = calculatePercentage(finalScore, rightQuestions.length)

    return (
        <Container>
            <h1>Quiz Results</h1>
            <h2>You answer {finalScore || 0} questions</h2>
            <h2>You score: {percentage}%</h2>

            <Stack direction="horizontal" gap={3} className="mb-3">
                <Button onClick={() => setShowAnswers(!showAnswers)}>See answers</Button>
                <Button onClick={() => { removeState(quizResult.quizId) }}>Main page</Button>
            </Stack>

            {!showAnswers
                ? (
                    <p></p>
                ) : (
                    rightQuestions.map((ele, i) => (
                        <Accordion key={ele.id} className="mb-4">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <b>
                                        {ele.name}{" "}
                                        <Badge bg={result[i].isCorrect ? "success" : "danger"}>Answer</Badge>
                                    </b>
                                </Accordion.Header>
                                <Accordion.Body>{ele.description}</Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Answers</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup>
                                        {ele.options.map((option, j) => (
                                            <div key={option.id || j}>
                                                <ListGroup.Item
                                                    variant={
                                                        userAnswers[i]?.answer.includes(option.text) && !option.isCorrect
                                                            ? "danger"
                                                            : option.isCorrect
                                                                ? "success"
                                                                : ""
                                                    }
                                                >
                                                    {option.text}
                                                </ListGroup.Item>
                                            </div>
                                        ))}
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Explanation</Accordion.Header>
                                <Accordion.Body>{ele.explanation}</Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    ))
                )
            }

        </Container>
    )
}

export default Result
