import React from 'react'
import Marquee from 'react-fast-marquee'
import { useGetHeroImages } from '../api'
import SliderSkeleton from './components/SliderSkeleton'
import SliderError from './components/SliderError'
import sliderBg from '@/assets/home/slider-bg.png'

const HomeSlider = () => {
	// Fetch hero images from API - Simple and clean
	const { data: heroImagesData, isLoading, isError } = useGetHeroImages();

	// Show loading skeleton
	if (isLoading) {
		return <SliderSkeleton />;
	}

	// Show error component
	if (isError) {
		return <SliderError error={{ message: "Failed to load slider images" }} onRetry={() => window.location.reload()} />;
	}

	// Use API images with fallback to static images
	const apiImages = heroImagesData?.images || [];
	const fallbackImages = Array(10).fill(sliderBg); // Fallback to static image
	const images = apiImages.length > 0 ? apiImages : fallbackImages;

	return (
		<section className="w-full py-8 bg-gray-50 dark:bg-gray-900">
			<Marquee
				speed={50}
				gradient={false}
				pauseOnHover={true}
				direction="left"
				className="overflow-hidden"
			>
				{images.map((image, index) => (
					<div
						key={index}
						className="flex-shrink-0 w-48 h-32 md:w-56 md:h-36 lg:w-64 lg:h-80 mx-2"
					>
						<img
							src={image}
							alt={`Hero Slide ${index + 1}`}
							className="w-full h-full object-cover rounded-lg"
							onError={(e) => {
								// Fallback to static image if API image fails to load
								e.target.src = sliderBg;
							}}
						/>
					</div>
				))}
			</Marquee>
		</section>
	)
}

export default HomeSlider