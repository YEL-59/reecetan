import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const QuizPerformanceHistory = () => {
    // Quiz performance history data
    const quizHistory = [
        {
            title: "CNA Training - Ethics Quiz",
            status: "Passed",
            statusColor: "bg-green-100 text-green-700",
            details: "Best Score: 85% • Attempts: 2 • Time: 12 min",
            date: "2 days ago"
        },
        {
            title: "CNA Training - Vital Signs Quiz",
            status: "Passed",
            statusColor: "bg-green-100 text-green-700",
            details: "Best Score: 82% • Attempts: 1 • Time: 8 min",
            date: "1 week ago"
        },
        {
            title: "NCLEX Prep - Pharmacology",
            status: "Failed",
            statusColor: "bg-red-100 text-red-700",
            details: "Best Score: 62% • Attempts: 1 • Time: 8 min",
            date: "1 week ago"
        }
    ]

    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                    Quiz Performance History
                </CardTitle>
                <p className="text-sm text-gray-600">
                    Your performance on individual quizzes
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                {quizHistory.map((quiz, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="font-medium text-gray-900">
                                {quiz.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${quiz.statusColor}`}>
                                {quiz.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                            {quiz.details}
                        </p>
                        <p className="text-xs text-gray-500">
                            {quiz.date}
                        </p>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default QuizPerformanceHistory

