import React from 'react'
import Marquee from 'react-fast-marquee'

const HomeSlider = () => {
	// Multiple images for continuous scrolling banner
	const images = [
		'/src/assets/home/slider-bg.png',
		'/src/assets/home/slider-bg.png',
		'/src/assets/home/slider-bg.png',
		'/src/assets/home/slider-bg.png',
		'/src/assets/home/slider-bg.png',
		'/src/assets/home/slider-bg.png',
		'/src/assets/home/slider-bg.png',
		'/src/assets/home/slider-bg.png',
		'/src/assets/home/slider-bg.png',
		'/src/assets/home/slider-bg.png',
		'/src/assets/home/slider-bg.png',
		'/src/assets/home/slider-bg.png',
		'/src/assets/home/slider-bg.png',
		'/src/assets/home/slider-bg.png',
		'/src/assets/home/slider-bg.png',
		'/src/assets/home/slider-bg.png',
		'/src/assets/home/slider-bg.png',
		'/src/assets/home/slider-bg.png',
		'/src/assets/home/slider-bg.png',
		'/src/assets/home/slider-bg.png'
	]

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
						className="flex-shrink-0 w-48 h-32 md:w-56 md:h-36 lg:w-64 lg:h-80 "
					>
						<img
							src={image}
							alt={`Slide ${index + 1}`}
							className="w-full h-full object-cover"
						/>
					</div>
				))}
			</Marquee>
		</section>
	)
}

export default HomeSlider