import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter as Router } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { QuizProvider } from "./contexts/ContextQuiz.js"
import { QuestionProvider } from "./contexts/ContextQuestion.js"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Router>
    <React.StrictMode>
      <QuizProvider>
        <QuestionProvider>
            <App />
        </QuestionProvider>
      </QuizProvider>
    </React.StrictMode>
  </Router>
)
