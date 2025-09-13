import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

const SliderError = ({ error, onRetry }) => {
    return (
        <section className="w-full py-8 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 text-center">
                <div className="flex flex-col items-center justify-center py-12">
                    {/* Error Icon */}
                    <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />

                    {/* Error Message */}
                    <div className="space-y-2 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Unable to Load Images
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            We're having trouble loading the slider images.
                        </p>
                        {error?.message && (
                            <p className="text-xs text-red-600 bg-red-50 p-2 rounded">
                                {error.message}
                            </p>
                        )}
                    </div>

                    {/* Retry Button */}
                    {onRetry && (
                        <Button
                            onClick={onRetry}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Try Again
                        </Button>
                    )}
                </div>
            </div>
        </section>
    )
}

export default SliderError
