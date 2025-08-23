import React from 'react'
import {
    CertificatesHeader,
    CertificateStatsCards,
    EarnedCertificates,
    CertificatesInProgress
} from './components'

const Certificates = () => {
    return (
        <div className="space-y-6 px-5 py-5">
            {/* Header Banner */}
            <CertificatesHeader />

            {/* Summary Cards */}
            <CertificateStatsCards />

            {/* Main Content Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Earned Certificates */}
                <EarnedCertificates />

                {/* Certificates in Progress */}
                <CertificatesInProgress />
            </div>
        </div>
    )
}

export default Certificates