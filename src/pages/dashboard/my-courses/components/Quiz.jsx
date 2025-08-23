import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    ArrowLeft,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    Award,
    RotateCcw,
    HelpCircle
} from 'lucide-react'

const Quiz = () => {
    const { courseId, quizId } = useParams()
    const navigate = useNavigate()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState({})
    const [showResults, setShowResults] = useState(false)
    const [timeLeft, setTimeLeft] = useState(900) // 15 minutes in seconds
    const [quizStarted, setQuizStarted] = useState(false)

    // Mock quiz data
    const quiz = {
        id: quizId,
        title: "Practice Quiz: Vital Signs",
        description: "Test your knowledge with this interactive quiz",
        timeLimit: 15, // minutes
        passingScore: 70,
        questions: [
            {
                id: 1,
                question: "What is the primary role of a Certified Nursing Assistant (CNA)?",
                options: [
                    "Diagnosing medical conditions",
                    "Prescribing medications",
                    "Providing basic patient care under supervision",
                    "Performing surgical procedures"
                ],
                correctAnswer: 2,
                explanation: "CNAs cannot administer or medications as this requires additional licensing and training."
            },
            {
                id: 2,
                question: "Which of the following is NOT typically included in a CNA's responsibilities?",
                options: [
                    "Assisting with personal hygiene",
                    "Taking vital signs",
                    "Administering IV medications",
                    "Helping with mobility"
                ],
                correctAnswer: 2,
                explanation: "CNAs cannot administer IV medications as this requires additional licensing and training."
            },
            {
                id: 3,
                question: "What should a CNA do if they notice a change in a patient's condition?",
                options: [
                    "Ignore it if it seems minor",
                    "Wait until the end of shift to report",
                    "Immediately notify the supervising nurse",
                    "Document it but don't report immediately"
                ],
                correctAnswer: 2,
                explanation: "Any changes in patient condition should be reported immediately to ensure proper care."
            }
        ]
    }

    // Timer effect
    useEffect(() => {
        if (quizStarted && timeLeft > 0 && !showResults) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
            return () => clearTimeout(timer)
        } else if (timeLeft === 0 && !showResults) {
            handleSubmitQuiz()
        }
    }, [timeLeft, quizStarted, showResults])

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    const handleAnswerSelect = (questionIndex, answerIndex) => {
        setAnswers(prev => ({
            ...prev,
            [questionIndex]: answerIndex
        }))
    }

    const handleSubmitQuiz = () => {
        setShowResults(true)
    }

    const calculateScore = () => {
        let correct = 0
        quiz.questions.forEach((question, index) => {
            if (answers[index] === question.correctAnswer) {
                correct++
            }
        })
        return Math.round((correct / quiz.questions.length) * 100)
    }

    const getScoreColor = (score) => {
        if (score >= quiz.passingScore) return 'text-green-600'
        return 'text-red-600'
    }

    const startQuiz = () => {
        setQuizStarted(true)
        setTimeLeft(quiz.timeLimit * 60)
    }

    const retryQuiz = () => {
        setCurrentQuestion(0)
        setAnswers({})
        setShowResults(false)
        setQuizStarted(false)
        setTimeLeft(quiz.timeLimit * 60)
    }

    // Quiz Instructions Screen
    if (!quizStarted) {
        return (
            <div className="space-y-6 px-5 py-5">
                <Link
                    to={`/dashboard/my-courses/${courseId}/outline`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Course
                </Link>

                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardHeader className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <HelpCircle className="w-8 h-8 text-blue-600" />
                            </div>
                            <CardTitle className="text-2xl">{quiz.title}</CardTitle>
                            <p className="text-gray-600">{quiz.description}</p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="bg-blue-50 rounded-lg p-4">
                                <h3 className="font-semibold text-blue-900 mb-3">Quiz Instructions</h3>
                                <ul className="space-y-2 text-sm text-blue-800">
                                    <li>• You have 3 attempts to pass this quiz</li>
                                    <li>• You must score 70% or higher to pass</li>
                                    <li>• Time limit: 15 minutes</li>
                                    <li>• You can review your answers before submitting</li>
                                </ul>
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="text-2xl font-bold text-gray-900">{quiz.questions.length}</div>
                                    <div className="text-sm text-gray-600">Questions</div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="text-2xl font-bold text-gray-900">{quiz.timeLimit}</div>
                                    <div className="text-sm text-gray-600">Minutes</div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="text-2xl font-bold text-gray-900">{quiz.passingScore}%</div>
                                    <div className="text-sm text-gray-600">Pass Rate</div>
                                </div>
                            </div>

                            <div className="text-center">
                                <Button
                                    onClick={startQuiz}
                                    size="lg"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                                >
                                    Start Quiz
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    // Quiz Results Screen
    if (showResults) {
        const score = calculateScore()
        const passed = score >= quiz.passingScore

        return (
            <div className="space-y-6 px-5 py-5">
                <div className="max-w-4xl mx-auto">
                    <Card>
                        <CardHeader className="text-center">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${passed ? 'bg-green-100' : 'bg-red-100'
                                }`}>
                                {passed ? (
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                ) : (
                                    <XCircle className="w-8 h-8 text-red-600" />
                                )}
                            </div>
                            <CardTitle className="text-2xl">
                                {passed ? 'Quiz Passed!' : 'Quiz Failed'}
                            </CardTitle>
                            <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
                                {score}%
                            </div>
                            <p className="text-gray-600">
                                You scored {calculateScore()} out of {quiz.questions.length} questions correctly
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Review Answers */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Review Answers:</h3>
                                {quiz.questions.map((question, qIndex) => {
                                    const userAnswer = answers[qIndex]
                                    const isCorrect = userAnswer === question.correctAnswer

                                    return (
                                        <Card key={question.id} className="border-l-4 border-l-gray-200">
                                            <CardContent className="p-4">
                                                <div className="flex items-start space-x-3">
                                                    {isCorrect ? (
                                                        <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                                                    ) : (
                                                        <XCircle className="w-5 h-5 text-red-500 mt-1" />
                                                    )}
                                                    <div className="flex-1">
                                                        <h4 className="font-medium text-gray-900 mb-2">
                                                            {question.question}
                                                        </h4>

                                                        <div className="space-y-1 mb-3">
                                                            {question.options.map((option, oIndex) => (
                                                                <div
                                                                    key={oIndex}
                                                                    className={`p-2 rounded text-sm ${oIndex === question.correctAnswer
                                                                        ? 'bg-green-100 text-green-800 border border-green-300'
                                                                        : oIndex === userAnswer && userAnswer !== question.correctAnswer
                                                                            ? 'bg-red-100 text-red-800 border border-red-300'
                                                                            : 'bg-gray-50'
                                                                        }`}
                                                                >
                                                                    <div className="flex items-center space-x-2">
                                                                        <span className="font-medium">
                                                                            {String.fromCharCode(65 + oIndex)}.
                                                                        </span>
                                                                        <span>{option}</span>
                                                                        {oIndex === question.correctAnswer && (
                                                                            <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                                                                        )}
                                                                        {oIndex === userAnswer && userAnswer !== question.correctAnswer && (
                                                                            <XCircle className="w-4 h-4 text-red-600 ml-auto" />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {question.explanation && (
                                                            <div className="bg-blue-50 border border-blue-200 rounded p-3">
                                                                <div className="flex items-start space-x-2">
                                                                    <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                                                                    <div>
                                                                        <div className="font-medium text-blue-900 text-sm">Explanation:</div>
                                                                        <div className="text-blue-800 text-sm">{question.explanation}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                            </div>

                            <div className="flex justify-center space-x-4">
                                <Button
                                    onClick={retryQuiz}
                                    variant="outline"
                                    className="flex items-center space-x-2"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    <span>Retry Quiz (Attempt 2/3)</span>
                                </Button>
                                <Link to={`/dashboard/my-courses/${courseId}/outline`}>
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                        Continue Course
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    // Quiz Questions Screen
    const currentQ = quiz.questions[currentQuestion]
    const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

    return (
        <div className="space-y-6 px-5 py-5">
            {/* Quiz Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <Link
                    to={`/dashboard/my-courses/${courseId}/outline`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Exit Quiz
                </Link>

                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="font-mono">{formatTime(timeLeft)}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                        Question {currentQuestion + 1} of {quiz.questions.length}
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Question Card */}
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg sm:text-xl">
                            Question {currentQuestion + 1}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <h2 className="text-base sm:text-lg font-medium text-gray-900">
                            {currentQ.question}
                        </h2>

                        <div className="space-y-3">
                            {currentQ.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerSelect(currentQuestion, index)}
                                    className={`w-full p-4 text-left border rounded-lg transition-colors ${answers[currentQuestion] === index
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-4 h-4 rounded-full border-2 ${answers[currentQuestion] === index
                                            ? 'border-blue-500 bg-blue-500'
                                            : 'border-gray-300'
                                            }`}>
                                            {answers[currentQuestion] === index && (
                                                <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                                            )}
                                        </div>
                                        <span className="font-medium text-gray-700">
                                            {String.fromCharCode(65 + index)}.
                                        </span>
                                        <span className="text-gray-900">{option}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                                disabled={currentQuestion === 0}
                            >
                                Previous
                            </Button>

                            {currentQuestion === quiz.questions.length - 1 ? (
                                <Button
                                    onClick={handleSubmitQuiz}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    disabled={Object.keys(answers).length !== quiz.questions.length}
                                >
                                    Submit Quiz
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => setCurrentQuestion(Math.min(quiz.questions.length - 1, currentQuestion + 1))}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Next
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Quiz
