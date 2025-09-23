import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    Award,
    Calendar,
    Clock,
    Download,
    User
} from 'lucide-react'

const EarnedCertificates = ({ items = [], loading }) => {
    const earnedCertificates = items.map((item) => ({
        id: item.enrollment_id,
        title: item.course?.title,
        instructor: item.course?.instructor || '—',
        issuedDate: item.enrolled_at?.split(' ')[0],
        duration: item.course?.duration_hours ? `${item.course.duration_hours} hours` : item.course?.duration,
        credentialId: `ENR-${item.enrollment_id}`
    }))

    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-gray-600" />
                    Earned Certificates
                </CardTitle>
                <p className="text-sm text-gray-600">
                    Certificates you've successfully earned
                </p>
            </CardHeader>
            <CardContent className="space-y-4  h-[500px] overflow-y-auto">
                {(!loading && earnedCertificates.length === 0) && (
                    <p className="text-sm text-gray-500">No earned certificates yet.</p>
                )}
                {earnedCertificates.map((certificate) => (
                    <div key={certificate.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Award className="w-6 h-6 text-gray-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-1">
                                        {certificate.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-2 flex items-center">
                                        <User className="w-4 h-4 mr-1" />
                                        {certificate.instructor}
                                    </p>
                                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                                        <span className="flex items-center">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            Issued: {certificate.issuedDate}
                                        </span>
                                        <span className="flex items-center">
                                            <Clock className="w-3 h-3 mr-1" />
                                            {certificate.duration}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Credential ID: {certificate.credentialId}
                                    </p>
                                </div>
                            </div>
                            <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center"
                            >
                                <Download className="w-4 h-4 mr-1" />
                                Download PDF
                            </Button>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default EarnedCertificates

