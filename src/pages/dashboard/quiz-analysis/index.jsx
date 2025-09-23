import React from 'react'
import {
    QuizAnalyticsHeader,
    SummaryStatsCards,
    QuizPerformanceHistory,
    PerformanceBySubject
} from './components'
import { useQuery } from '@tanstack/react-query'
import { getQuizPerformance } from '@/lib/quizPerformanceApi'

const QuizAnalysis = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['quiz-performance'],
        queryFn: getQuizPerformance
    })

    const stats = data?.data || {}
    const history = stats.quiz_performance_history || []
    const byCourse = stats.performance_by_course || []

    return (
        <div className="space-y-6 px-5 py-5">
            {/* Header Banner */}
            <QuizAnalyticsHeader />

            {/* Summary Cards */}
            <SummaryStatsCards loading={isLoading} stats={stats} />

            {/* Main Content Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quiz Performance History */}
                <QuizPerformanceHistory loading={isLoading} items={history} />

                {/* Performance by Subject */}
                <PerformanceBySubject loading={isLoading} items={byCourse} />
            </div>
        </div>
    )
}

export default QuizAnalysis