import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
    FileText,
    TrendingUp,
    BarChart3
} from 'lucide-react'

const SummaryStatsCards = () => {
    // Summary stats data
    const summaryStats = [
        {
            title: "Total Quizzes Taken",
            value: "5",
            subtitle: "Across all courses",
            icon: FileText,
            color: "text-blue-600"
        },
        {
            title: "Pass Rate",
            value: "80%",
            subtitle: "Progress bar",
            icon: TrendingUp,
            color: "text-green-600",
            progress: 80
        },
        {
            title: "Average Score",
            value: "82%",
            subtitle: "Excellent performance!",
            icon: BarChart3,
            color: "text-purple-600"
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {summaryStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                    <Card key={stat.title} className="shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-600 mb-1">
                                        {stat.title}
                                    </p>
                                    <p className={`text-3xl font-bold ${stat.color} mb-1`}>
                                        {stat.value}
                                    </p>
                                    {stat.progress ? (
                                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                            <div
                                                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${stat.progress}%` }}
                                            ></div>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            {stat.subtitle}
                                        </p>
                                    )}
                                </div>
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center ml-4">
                                    <Icon className="w-6 h-6 text-gray-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}

export default SummaryStatsCards

