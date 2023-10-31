import { ListGroup, Container, Accordion } from "react-bootstrap"
import { useQuestionContext } from "../contexts/ContextQuestion.js"
import "../assets/styles/QuestionList.css"

const QuestionList = () =>
{
  const { questions } = useQuestionContext()

  if (!questions)
  {
    return <div>No questions found!</div>
  }

  return (
    <Container>
      <h1 className="ql">Question List</h1>
      {questions.map((ele) =>
      (
        <Accordion key={ele.id} className="mb-4" >
          <Accordion.Item eventKey="0">
            <Accordion.Header><b>{ele.name}</b></Accordion.Header>
            <Accordion.Body>{ele.description}</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Answers</Accordion.Header>
            <Accordion.Body>
              <ListGroup>
                {ele.options.map((option, i) =>
                (
                  <div key={option.id || i} >
                    <ListGroup.Item variant={option.isCorrect ? "success" : ""} >{option.text}</ListGroup.Item>
                  </div>
                ))}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Expalnation</Accordion.Header>
            <Accordion.Body>{ele.explanation}</Accordion.Body>
          </Accordion.Item>
          < hr /><hr />
        </Accordion >
      ))
      }

    </Container >
  )
}

export default QuestionList
