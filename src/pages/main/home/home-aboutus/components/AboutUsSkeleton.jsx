import { Button } from '@/components/ui/button'

const AboutUsSkeleton = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Image Skeleton */}
                    <div className="order-2 lg:order-1">
                        <div className="w-full h-80 lg:h-96 bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>

                    {/* Right Side - Text Content Skeleton */}
                    <div className="order-1 lg:order-2 space-y-6">
                        {/* Title Skeleton */}
                        <div className="h-12 bg-gray-200 rounded-lg animate-pulse w-3/4"></div>

                        {/* Description Skeleton */}
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                        </div>

                        <div className="space-y-4">
                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
                        </div>

                        {/* Button Skeleton */}
                        <div className="h-12 bg-gray-200 rounded-full animate-pulse w-40"></div>
                    </div>
                </div>
            </div>

            {/* Second Section Skeleton */}
            <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="order-1 lg:order-2">
                        <div className="w-full h-80 lg:h-96 bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="order-2 lg:order-1 space-y-6">
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Third Section Skeleton */}
            <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="h-12 bg-gray-200 rounded-lg animate-pulse w-1/2 mx-auto"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="w-full h-80 lg:h-96 bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="order-1 lg:order-2 space-y-6">
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUsSkeleton
