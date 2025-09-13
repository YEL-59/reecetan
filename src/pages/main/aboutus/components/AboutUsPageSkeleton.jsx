import React from 'react'

const AboutUsPageSkeleton = () => {
    return (
        <>
            {/* Hero Section Skeleton */}
            <div className="relative h-64 md:h-80 lg:h-96 w-full bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="text-center z-10">
                    <div className="h-16 bg-gray-300 rounded-lg animate-pulse w-64"></div>
                </div>
            </div>

            {/* Title Section Skeleton */}
            <div className="bg-gradient-to-b from-blue-50 to-white py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="h-12 bg-gray-200 rounded-lg animate-pulse w-3/4 mx-auto mb-4"></div>
                    <div className="h-16 bg-gray-200 rounded-lg animate-pulse w-1/2 mx-auto"></div>
                </div>
            </div>

            {/* Main Content Section Skeleton */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side - Image Skeleton */}
                        <div className="order-2 lg:order-1">
                            <div className="w-full h-80 bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>

                        {/* Right Side - Text Content Skeleton */}
                        <div className="order-1 lg:order-2">
                            <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-32 mb-6"></div>

                            <div className="space-y-4">
                                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                            </div>

                            <div className="space-y-4 mt-6">
                                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
                            </div>

                            <div className="space-y-4 mt-6">
                                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
                            </div>

                            <div className="pt-4">
                                <div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUsPageSkeleton
