import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroError = ({ error, onRetry }) => {
    return (
        <section className="relative min-h-[550px] sm:min-h-[600px] md:min-h-[650px] overflow-hidden bg-gradient-to-r from-red-50 to-orange-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 relative z-10">
                <div className="flex flex-col items-center justify-center min-h-[450px] sm:min-h-[500px] text-center">
                    {/* Error Icon */}
                    <div className="mb-6">
                        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto" />
                    </div>

                    {/* Error Message */}
                    <div className="space-y-4 max-w-md">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Unable to Load Content
                        </h2>
                        <p className="text-gray-600">
                            We're having trouble loading the hero section. Please check your connection and try again.
                        </p>
                        {error?.message && (
                            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                                {error.message}
                            </p>
                        )}
                    </div>

                    {/* Retry Button */}
                    {onRetry && (
                        <Button
                            onClick={onRetry}
                            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Try Again
                        </Button>
                    )}

                    {/* Fallback Content */}
                    <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200 max-w-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Get Our Online Courses
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Take the next step in your learning journey with our comprehensive online courses.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroError;
