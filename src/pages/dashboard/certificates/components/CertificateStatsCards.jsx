import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
    Award,
    Clock,
    GraduationCap
} from 'lucide-react'

const CertificateStatsCards = ({ stats, loading }) => {
    const summaryStats = [
        {
            title: "Earned Certificates",
            value: loading ? '—' : String(stats?.total_completed ?? 0),
            icon: Award,
            color: "text-blue-600"
        },
        {
            title: "In Progress",
            value: loading ? '—' : String(stats?.total_in_progress ?? 0),
            icon: Clock,
            color: "text-blue-600"
        },
        {
            title: "Training Hours",
            value: loading ? '—' : `${stats?.total_training_hours ?? 0}h`,
            icon: GraduationCap,
            color: "text-blue-600"
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

export default CertificateStatsCards

