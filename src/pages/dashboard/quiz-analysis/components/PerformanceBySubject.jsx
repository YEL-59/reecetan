import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    CheckCircle,
    XCircle
} from 'lucide-react'

const PerformanceBySubject = () => {
    // Performance by subject data
    const subjectPerformance = [
        {
            subject: "Patient Care",
            score: 85,
            status: "good",
            icon: CheckCircle,
            color: "text-green-600"
        },
        {
            subject: "Medical Terminology",
            score: 52,
            status: "good",
            icon: CheckCircle,
            color: "text-green-600"
        },
        {
            subject: "Pharmacology",
            score: 65,
            status: "needs-improvement",
            icon: XCircle,
            color: "text-red-600"
        },
        {
            subject: "Infection Control",
            score: 88,
            status: "good",
            icon: CheckCircle,
            color: "text-green-600"
        }
    ]

    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                    Performance by Subject
                </CardTitle>
                <p className="text-sm text-gray-600">
                    Your strengths and areas for improvement
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                {subjectPerformance.map((subject, index) => {
                    const Icon = subject.icon
                    const progressColor = subject.status === 'good' ? 'bg-green-500' : 'bg-red-500'

                    return (
                        <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Icon className={`w-4 h-4 ${subject.color}`} />
                                    <span className="font-medium text-gray-900">
                                        {subject.subject}
                                    </span>
                                </div>
                                <span className="font-medium text-gray-900">
                                    {subject.score}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full transition-all duration-300 ${progressColor}`}
                                    style={{ width: `${subject.score}%` }}
                                ></div>
                            </div>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
}

export default PerformanceBySubject

