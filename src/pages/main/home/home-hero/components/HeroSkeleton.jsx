const HeroSkeleton = () => {
    return (
        <section className="relative min-h-[550px] sm:min-h-[600px] md:min-h-[650px] overflow-hidden bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[450px] sm:min-h-[500px]">
                    {/* Left Side - Text Content Skeleton */}
                    <div className="space-y-6 lg:space-y-8">
                        {/* Main Headline Skeleton */}
                        <div className="space-y-3">
                            <div className="h-12 sm:h-16 md:h-20 lg:h-24 bg-gray-300 rounded-lg animate-pulse"></div>
                            <div className="h-8 sm:h-12 md:h-16 bg-gray-400 rounded-lg animate-pulse w-3/4"></div>
                        </div>

                        {/* Body Text Skeleton */}
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                            <div className="h-4 bg-gray-300 rounded animate-pulse w-5/6"></div>
                            <div className="h-4 bg-gray-300 rounded animate-pulse w-4/5"></div>
                        </div>

                        {/* Search Bar Skeleton */}
                        <div className="bg-gray-200 rounded-full h-12 w-full max-w-md animate-pulse"></div>
                    </div>

                    {/* Right Side - Image Skeleton */}
                    <div className="hidden lg:block">
                        <div className="w-full h-96 bg-gray-300 rounded-lg animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Right side image skeleton (absolute positioned) */}
            <div className="absolute bottom-0 right-40 w-full lg:w-1/2 h-full flex items-end justify-end">
                <div className="relative w-full max-w-lg h-full flex items-end">
                    <div className="w-full h-3/4 bg-gray-300 rounded-t-lg animate-pulse"></div>
                </div>
            </div>
        </section>
    );
};

export default HeroSkeleton;

