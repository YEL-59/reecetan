import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    Award,
    Calendar,
    Play
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const CertificatesInProgress = ({ items = [], loading }) => {
    const certificatesInProgress = items.map((item) => ({
        id: item.enrollment_id,
        title: item.course?.title,
        progress: item.progress ?? 0,
        estimatedCompletion: item.estimated_completion || '—',
        course_id: item.course?.id,
        status: item.status,
    }))

    const navigate = useNavigate()
    const handleContinueCourse = (courseId) => {
        navigate(`/dashboard/my-courses/${courseId}`)
    }

    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-gray-600" />
                    Certificates in Progress
                </CardTitle>
                <p className="text-sm text-gray-600">
                    Certificates you're currently working on
                </p>
            </CardHeader>
            <CardContent className="space-y-4 h-[500px] overflow-y-auto">
                {loading && (
                    <div className="text-center py-8">
                        <p className="text-gray-500">Loading certificates...</p>
                    </div>
                )}
                {(!loading && certificatesInProgress.length === 0) && (
                    <div className="text-center py-8">
                        <Award className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                        <p className="text-sm text-gray-500">No certificates in progress.</p>
                        <p className="text-xs text-gray-400 mt-1">Start a course to begin earning certificates!</p>
                    </div>
                )}
                {certificatesInProgress.map((certificate) => (
                    <div key={certificate.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-3">
                                    {certificate.title}
                                </h3>

                                {/* Progress Bar */}
                                <div className="mb-3">
                                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                                        <span>Progress</span>
                                        <span>{certificate.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-gray-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${certificate.progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <p className="text-xs text-gray-500 flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    Est. completion: {certificate.estimatedCompletion}
                                </p>
                            </div>
                            <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center ml-4"
                                onClick={() => handleContinueCourse(certificate.course_id)} // Fixed: Use arrow function and certificate.course_id
                                disabled={!certificate.course_id} // Disable if no course_id
                            >
                                <Play className="w-4 h-4 mr-1" />
                                {certificate.status === 'success' ? 'View Certificate' : 'Continue Course'}
                            </Button>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default CertificatesInProgress

