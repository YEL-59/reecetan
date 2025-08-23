import React from 'react'
import {
    QuizAnalyticsHeader,
    SummaryStatsCards,
    QuizPerformanceHistory,
    PerformanceBySubject
} from './components'

const QuizAnalysis = () => {
    return (
        <div className="space-y-6 px-5 py-5">
            {/* Header Banner */}
            <QuizAnalyticsHeader />

            {/* Summary Cards */}
            <SummaryStatsCards />

            {/* Main Content Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quiz Performance History */}
                <QuizPerformanceHistory />

                {/* Performance by Subject */}
                <PerformanceBySubject />
            </div>
        </div>
    )
}

export default QuizAnalysis