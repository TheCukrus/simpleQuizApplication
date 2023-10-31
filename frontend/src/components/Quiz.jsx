/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import serviceStartQuiz from "../services/serviceStartQuiz.js"
import { Container, Button, Stack } from "react-bootstrap"
import Result from "./Result.jsx"
import "../assets/styles/Quiz.css"

const Quiz = () =>
{
    const [quizResult, setQuizResult] = useState(false)
    const [quizState, setQuizState] = useState({})
    const [selectedAnswers, setSelectedAnswers] = useState({
        questionId: "",
        answers: [],
    })

    const [timeRemaining, setTimeRemaining] = useState(null)

    const quizId = useParams()
    const homeNav = useNavigate()

    const currentQuestion = quizState?.ramdomizedQuestions?.[quizState.currentQuestionIndex]

    const checkIsQuizStarted = async () =>
    {
        try
        {
            const isStarted = await serviceStartQuiz.checkQuiz(quizId.quizid)
            setQuizState(isStarted)

        } catch (err)
        {
            console.log(err)
        }
    }

    const formatTime = (milliseconds) =>
    {
        //Convert the remaining time to minutes and seconds
        const hours = Math.floor(milliseconds / 3600000)
        const minutes = Math.floor(milliseconds % 3600000 / 60000)
        const seconds = Math.floor((milliseconds % 60000) / 1000)

        //Create a string to represent the time
        let timeString = ""

        if (hours > 0)
        {
            timeString += `${hours}:`
        }

        if (minutes > 0 || hours > 0)
        {
            timeString += `${minutes}:`
        }

        timeString += `${seconds}`

        return timeString
    }

    const getFormattedTimeRemaining = () =>
    {
        if (quizState?.started)
        {
            const endTime = new Date(quizState.startDate).getTime() + quizState.timer
            const currentTime = new Date().getTime()
            const timeRemaining = endTime - currentTime
            return formatTime(timeRemaining)
        }
        return ""
    }

    const loadSelectedAnswers = () =>
    {
        const userAnswer = quizState?.userAnswers?.find((answer) => answer.questionId === currentQuestion?.id)
        if (userAnswer)
        {
            setSelectedAnswers({ questionId: currentQuestion?.id, answers: userAnswer.answer })
        } else
        {
            // If no user answer is found, reset selected answers
            setSelectedAnswers({ questionId: currentQuestion?.id, answers: [] })
        }
    }

    const handleAnswerChange = (event) =>
    {
        const { value, type, checked } = event.target

        if (type === "checkbox")
        {
            // Handle checkboxes by maintaining an array of selected answers
            setSelectedAnswers((prevAnswers) => ({
                ...prevAnswers,
                answers: checked
                    ? [...prevAnswers.answers, value]
                    : prevAnswers.answers.filter((answer) => answer !== value),
            }))
        } else
        {
            // Handle radio buttons by setting a single selected answer
            setSelectedAnswers({ questionId: currentQuestion?.id, answers: [value] })
        }
    }

    const handleFinish = async () =>
    {
        try
        {
            await handleNavigation(0)

            const finishQuiz = await serviceStartQuiz.finish(quizId.quizid)
            console.log(finishQuiz)
            setQuizResult(finishQuiz)

            await checkIsQuizStarted()

        }
        catch (err)
        {
            console.log(err)
        }
    }

    const handleNavigation = async (indexOffset) =>
    {
        try
        {
            const nextQuestion = await serviceStartQuiz.selectAnswer(quizId.quizid,
                {
                    questionId: quizState.ramdomizedQuestions[quizState.currentQuestionIndex].id,
                    answers: selectedAnswers.answers,
                    index: quizState.currentQuestionIndex + indexOffset,
                })
            await checkIsQuizStarted()
            return console.log(nextQuestion)
        }
        catch (err)
        {
            console.log(err)
        }
    }

    const deleteState = async (id) =>
    {
        try
        {
            const removeState = await serviceStartQuiz.deleteState(id)
            console.log(removeState)

            homeNav("/")
        }
        catch (err)
        {
            console.log()
        }
    }

    //Update the timer continuesly
    useEffect(() =>
    {
        if (quizState.finished)
        {
            return
        }
        const timerInterval = setInterval(() =>
        {
            const formattedTimeRemaining = getFormattedTimeRemaining()

            if (formattedTimeRemaining === "-1")
            {
                clearInterval(timerInterval)
                handleFinish()
            }
            else
            {
                setTimeRemaining(formattedTimeRemaining)
            }
        }, 1000)
        return () => clearInterval(timerInterval)
    }, [quizState])

    useEffect(() => { checkIsQuizStarted(); loadSelectedAnswers() }, [currentQuestion?.id])

    if (!quizState?.started)
    {
        return (
            <Container>
                <h1 className="ql">Quiz isn't started!</h1>
            </Container>
        )
    }

    if (quizResult && quizState.finished)
    {
        return <Result quizResult={quizResult} />
    }

    if (quizState.finished)
    {
        return (
            <Container>
                <h1 className="ql">Quiz alredy finished!</h1>
                <Button onClick={() => { deleteState(quizId.quizid) }}>End this Quiz</Button>
            </Container>
        )
    }

    return (
        <Container className="quiz-container">
            <div className="quiz-question">
                <h2 className="quiz-description">{currentQuestion.description}</h2>
                <h3 className="answer-title">Possible answers:</h3>
                {currentQuestion.options.map((ele) => (
                    <div key={ele.text} className="answer-option">
                        <label className="answer-text">
                            <input
                                type={currentQuestion.hasMultipleCorrectAnswers ? "checkbox" : "radio"}
                                name={currentQuestion.name}
                                value={ele.text}
                                onChange={handleAnswerChange}
                                checked={selectedAnswers.answers.includes(ele.text)}
                                className="answer-input"
                            />
                            {ele.text}
                        </label>
                    </div>
                ))}
                <div className="quiz-timer">
                    <p>Time Remaining: {timeRemaining}</p>
                </div>

                <Stack direction="horizontal" gap={3} className="quiz-navigation">
                    <Button className="p-2" disabled={quizState.currentQuestionIndex - 1 === -1} onClick={() => { handleNavigation(-1) }}>Previous</Button>
                    <Button className="p-2" disabled={quizState.ramdomizedQuestions.length === quizState.currentQuestionIndex + 1} onClick={() => { handleNavigation(1) }}>Next</Button>
                    <Button className="p-2 ms-auto" disabled={quizState.ramdomizedQuestions.length >= quizState.userAnswers.length + 2} onClick={handleFinish}>Finish</Button>
                </Stack>
            </div>
        </Container >
    )
}

export default Quiz