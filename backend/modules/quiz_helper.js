//Helper function to calculate quiz results
const calculateQuizResults = (quiz_state) =>
{
    const userAnswers = quiz_state.userAnswers
    const questionAnswers = quiz_state.ramdomizedQuestions
    const result = []

    for (let i = 0; i < questionAnswers.length; i++)
    {
        const questionId = questionAnswers[i].id

        const userAnswer = userAnswers.find((answer) => answer.questionId.toString() === questionId)

        if (userAnswer)
        {
            //Collecting true answers of question
            const correctAnswer = []
            for (let j = 0; j <= questionAnswers[i].options.length - 1; j++)
            {
                let currentOption = questionAnswers[i].options[j]

                if (currentOption.isCorrect)
                {
                    correctAnswer.push(currentOption.text)
                }
            }

            //Check if user's answer is correct
            const isCorrect = arraysAreEqual(userAnswer.answer, correctAnswer)

            //Calculate score (1 point for eatch correct question answer)
            const score = isCorrect ? 1 : 0

            //Push the result for this question
            result.push({ questionId, isCorrect, score })
        }
    }

    return result
}

// Helper function to check if two arrays are equal
const arraysAreEqual = (arr1, arr2) =>
{
    if (arr1.length !== arr2.length)
    {
        return false;
    }

    const set1 = new Set(arr1)
    const set2 = new Set(arr2)

    for (const item of set1)
    {
        if (!set2.has(item))
        {
            return false
        }
    }
    return true
}

module.exports = {
    calculateQuizResults,
    arraysAreEqual,
}