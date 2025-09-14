import React from 'react'

const CoursesSkeleton = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Skeleton */}
                <div className="text-center mb-8">
                    <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-80 mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-96 mx-auto"></div>
                </div>

                {/* Tabs Skeleton */}
                <div className="hidden md:flex flex-wrap gap-3 justify-center mb-10">
                    {Array.from({ length: 7 }).map((_, index) => (
                        <div key={index} className="h-10 bg-gray-200 rounded-full animate-pulse w-24"></div>
                    ))}
                </div>

                {/* Mobile Button Skeleton */}
                <div className="md:hidden flex justify-center mb-8">
                    <div className="h-12 bg-gray-200 rounded-full animate-pulse w-40"></div>
                </div>

                {/* Desktop Grid Skeleton */}
                <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="h-48 bg-gray-200 animate-pulse"></div>
                            <div className="p-6">
                                <div className="h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-4"></div>
                                <div className="flex justify-between items-center">
                                    <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
                                    <div className="h-8 bg-gray-200 rounded animate-pulse w-20"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Grid Skeleton */}
                <div className="md:hidden grid grid-cols-1 gap-4">
                    {Array.from({ length: 2 }).map((_, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="h-48 bg-gray-200 animate-pulse"></div>
                            <div className="p-6">
                                <div className="h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-4"></div>
                                <div className="flex justify-between items-center">
                                    <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
                                    <div className="h-8 bg-gray-200 rounded animate-pulse w-20"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CoursesSkeleton

