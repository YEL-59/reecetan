import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCertificates } from '@/lib/certificatesApi'
import {
    CertificatesHeader,
    CertificateStatsCards,
    EarnedCertificates,
    CertificatesInProgress
} from './components'

const Certificates = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['certificates'],
        queryFn: getCertificates
    })

    const summary = {
        total_completed: data?.total_completed || 0,
        total_in_progress: data?.total_in_progress || 0,
        total_training_hours: data?.total_training_hours || 0
    }

    const earned = (data?.data || []).filter(item => item.status === 'success')
    const inProgress = (data?.data || []).filter(item => item.status !== 'success')

    return (
        <div className="space-y-6 px-5 py-5">
            {/* Header Banner */}
            <CertificatesHeader />

            {/* Summary Cards */}
            <CertificateStatsCards loading={isLoading} stats={summary} />

            {/* Main Content Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Earned Certificates */}
                <EarnedCertificates loading={isLoading} items={earned} />

                {/* Certificates in Progress */}
                <CertificatesInProgress loading={isLoading} items={inProgress} />
            </div>
        </div>
    )
}

export default Certificates