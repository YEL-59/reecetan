import React from 'react'
import Marquee from 'react-fast-marquee'

const SliderSkeleton = () => {
    // Create skeleton placeholders
    const skeletonImages = Array(10).fill(null)

    return (
        <section className="w-full py-8 bg-gray-50 dark:bg-gray-900">
            <Marquee
                speed={50}
                gradient={false}
                pauseOnHover={true}
                direction="left"
                className="overflow-hidden"
            >
                {skeletonImages.map((_, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-48 h-32 md:w-56 md:h-36 lg:w-64 lg:h-80 mx-2"
                    >
                        <div className="w-full h-full bg-gray-300 animate-pulse rounded-lg"></div>
                    </div>
                ))}
            </Marquee>
        </section>
    )
}

export default SliderSkeleton


