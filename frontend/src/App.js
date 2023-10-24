import React from "react"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import QuizList from "./components/QuizList.jsx"
import QuizDetails from "./components/QuizDetails.jsx"
import QuestionList from "./components/QuestionList.jsx"
import AdminDashboard from "./components/admin/AdminDashboard.jsx"
import CreateQuiz from "./components/admin/CreateQuiz.jsx"
import CreateQuestion from "./components/admin/CreateQuestion.jsx"
import ManageQuiz from "./components/admin/ManageQuiz.jsx"
import ManageQuestion from "./components/admin/ManageQuestion.jsx"
import Home from "./components/Home.jsx"
import Quiz from "./components/Quiz.jsx"
import "./assets/styles/app.css"

function App()
{
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/quiz/:quizid" element={<Quiz />} />
        <Route path="/admin/manage-questions" element={<ManageQuestion />} />
        <Route path="/admin/manage-quizzes" element={<ManageQuiz />} />
        <Route path="/admin/create-question" element={<CreateQuestion />} />
        <Route path="/admin/create-quiz" element={<CreateQuiz />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/quizzes/:quizId" element={<QuizDetails />} />
        <Route path="/questions" element={<QuestionList />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
