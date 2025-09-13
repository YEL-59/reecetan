import React from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

const AboutUsPageError = ({ error, onRetry }) => {
    return (
        <>
            {/* Hero Section with Error */}
            <div className="relative h-64 md:h-80 lg:h-96 w-full bg-gray-100 flex items-center justify-center">
                <div className="text-center z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-400 tracking-wide">
                        About Us
                    </h1>
                </div>
            </div>

            {/* Error Message Section */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                            <div className="flex flex-col items-center space-y-4">
                                <AlertCircle className="w-12 h-12 text-red-500" />
                                <div>
                                    <h3 className="text-lg font-semibold text-red-800 mb-2">
                                        Failed to Load About Us Content
                                    </h3>
                                    <p className="text-red-600 mb-4">
                                        {error?.message || 'Something went wrong while loading the about us content.'}
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
            </div>
        </>
    )
}

export default AboutUsPageError
