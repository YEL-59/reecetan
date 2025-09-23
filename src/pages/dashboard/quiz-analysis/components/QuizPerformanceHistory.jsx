import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const QuizPerformanceHistory = ({ items = [], loading }) => {
    const quizHistory = items.map((q) => ({
        title: q.title,
        status: q.status,
        statusColor: q.status?.toLowerCase() === 'passed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700',
        details: `Best Score: ${q.best_score}% • Attempts: ${q.attempts}`,
        date: q.date
    }))

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
            <CardContent className="space-y-4 h-[500px] overflow-y-auto">
                {(!loading && quizHistory.length === 0) && (
                    <p className="text-sm text-gray-500">No quiz history yet.</p>
                )}
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

