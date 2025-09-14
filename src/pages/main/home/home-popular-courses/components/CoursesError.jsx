import React from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CoursesError = ({ error, onRetry }) => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Popular <span className="text-primary">Courses</span>
                    </h2>
                    <p className="text-gray-500 max-w-3xl mx-auto mt-3">
                        Your success isn't optional—it's inevitable with Rank One Review.
                    </p>
                </div>

                {/* Error Message */}
                <div className="max-w-2xl mx-auto text-center">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                        <div className="flex flex-col items-center space-y-4">
                            <AlertCircle className="w-12 h-12 text-red-500" />
                            <div>
                                <h3 className="text-lg font-semibold text-red-800 mb-2">
                                    Failed to Load Courses
                                </h3>
                                <p className="text-red-600 mb-4">
                                    {error?.message || 'Something went wrong while loading the courses.'}
                                </p>
                                <Button
                                    onClick={onRetry}
                                    variant="outline"
                                    className="border-red-300 text-red-600 hover:bg-red-50"
                                >
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Try Again
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CoursesError

