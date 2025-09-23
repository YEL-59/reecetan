import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    CheckCircle,
    XCircle
} from 'lucide-react'

const PerformanceBySubject = ({ items = [], loading }) => {
    const subjectPerformance = items.map((p) => ({
        subject: p.course,
        score: Math.round(p.score),
        status: p.status,
        icon: (p.status === 'good' || p.status === 'average') ? CheckCircle : XCircle,
        color: (p.status === 'good' || p.status === 'average') ? 'text-green-600' : 'text-red-600'
    }))

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
            <CardContent className="space-y-4 h-[500px] overflow-y-auto">
                {(!loading && subjectPerformance.length === 0) && (
                    <p className="text-sm text-gray-500">No course performance data.</p>
                )}
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

