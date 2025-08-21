import sliderBg from '@/assets/home/slider-bg.png'

const HomeSlider = () => {
	return (
		<section
			className="w-full"
			style={{
				backgroundImage: `url(${sliderBg})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			}}
		>
			{/* Spacer to control height of the background section */}
			<div className="h-40 sm:h-52 md:h-64 lg:h-72 xl:h-80" />
		</section>
	)
}

export default HomeSlider