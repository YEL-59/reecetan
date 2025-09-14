import { useMemo, useState } from 'react'
import CourseCard from '@/components/course/CourseCard'
import CourseModal from '@/components/course/CourseModal'
// import { useCart } from '@/contexts/cart-context' // Cart system hidden
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useGetCategories, useGetCourses } from '../api'
import CoursesSkeleton from './components/CoursesSkeleton'
import CoursesError from './components/CoursesError'

// Fallback categories if API fails
const FALLBACK_CATEGORIES = [
	'All',
	'Nursing Programs',
	'Health Care',
	'Medical Basics',
	'Emotional Care',
	'Professional Skills',
	'Exam Prep',
]

const Tab = ({ label, active, onClick }) => (
	<button
		className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${active ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
			}`}
		onClick={onClick}
	>
		{label}
	</button>
)

const HomePopularCourses = () => {
	const [activeTab, setActiveTab] = useState('All')
	const [openCourse, setOpenCourse] = useState(null)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const navigate = useNavigate()

	// Fetch categories and courses from API
	const { data: categoriesData, isLoading: categoriesLoading, isError: categoriesError } = useGetCategories()
	const { data: coursesData, isLoading: coursesLoading, isError: coursesError } = useGetCourses()

	// Use API data with fallbacks
	const categories = useMemo(() => {
		if (categoriesData && categoriesData.length > 0) {
			return ['All', ...categoriesData.map(cat => cat.name)]
		}
		return FALLBACK_CATEGORIES
	}, [categoriesData])

	const courses = useMemo(() => {
		if (!coursesData || coursesData.length === 0) return []

		// Transform API data to match CourseCard expected format
		return coursesData.map(course => ({
			id: course.id,
			title: course.title,
			category: course.category?.name || 'Uncategorized',
			rating: course.rating?.ratingPoint || Math.floor(Math.random() * 2) + 4, // Random rating 4-5 if no rating
			students: Math.floor(Math.random() * 500) + 50, // Random student count for demo
			price: course.price,
			image: course.image || 'https://images.unsplash.com/photo-1580281658208-2cf4e1b1d4b3?q=80&w=1200&auto=format&fit=crop',
			description: course.description,
			level: course.level,
			duration: course.duration,
			language: course.language,
			courseType: course.courseType,
			instructor: course.instructor,
		}))
	}, [coursesData])

	const filtered = useMemo(() => {
		if (activeTab === 'All') return courses
		return courses.filter((c) => c.category === activeTab)
	}, [activeTab, courses])

	// Show loading skeleton
	if (coursesLoading || categoriesLoading) {
		return <CoursesSkeleton />
	}

	// Show error component
	if (coursesError || categoriesError) {
		return <CoursesError
			error={{ message: "Failed to load courses" }}
			onRetry={() => window.location.reload()}
		/>
	}

	// Enroll function is now handled by CourseCard component directly
	const enroll = (course) => {
		// This function is no longer needed as CourseCard handles its own modal
		console.log('Enrolling in:', course.title)
	}

	return (
		<section className="py-16 bg-white" data-aos="fade-up">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-8">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900">
						Popular <span className="text-primary">Courses</span>
					</h2>
					<p className="text-gray-500 max-w-3xl mx-auto mt-3">
						Your success isn't optional—it's inevitable with Rank One Review. We don't just help you pass, we train you to dominate your licensure exam with elite-level precision, expert guidance, and cutting-edge technology.
					</p>
				</div>

				{/* Desktop: Tabs */}
				<div className="hidden md:flex flex-wrap gap-3 justify-center mb-10" data-aos="zoom-in">
					{categories.map((label) => (
						<Tab key={label} label={label} active={activeTab === label} onClick={() => setActiveTab(label)} />
					))}
				</div>

				{/* Mobile: View All Button */}
				<div className="md:hidden flex justify-center mb-8">
					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogTrigger asChild>
							<Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full">
								View All Courses
							</Button>
						</DialogTrigger>
						<DialogContent className="max-w-4xl max-h-[80vh] p-0">
							<DialogHeader className="p-6 pb-0">
								<DialogTitle className="text-2xl font-bold text-center">
									Popular Courses
								</DialogTitle>
							</DialogHeader>

							<div className="overflow-y-auto max-h-[60vh] p-6">
								{/* Mobile Tabs in Dialog */}
								<div className="flex flex-wrap gap-2 justify-center mb-6">
									{categories.map((label) => (
										<Tab key={label} label={label} active={activeTab === label} onClick={() => setActiveTab(label)} />
									))}
								</div>

								{/* Mobile Course Grid in Dialog */}
								<div className="grid grid-cols-1 gap-4 pb-6">
									{filtered.map((c, idx) => (
										<div key={c.id}>
											<CourseCard
												course={c}
												onEnroll={enroll}
												onOpen={(course) => {
													setOpenCourse(course)
													setIsDialogOpen(false)
												}}
												trigger="click"
											/>
										</div>
									))}
								</div>
							</div>
						</DialogContent>
					</Dialog>
				</div>

				{/* Desktop: Grid */}
				<div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
					{filtered.slice(0, 6).map((c, idx) => (
						<div key={c.id} data-aos="fade-up" data-aos-delay={idx * 50}>
							<CourseCard course={c} onEnroll={enroll} onOpen={(course) => setOpenCourse(course)} trigger="click" />
						</div>
					))}
				</div>

				{/* Mobile: Preview Cards (2-3 cards) */}
				<div className="md:hidden grid grid-cols-1 gap-4">
					{filtered.slice(0, 2).map((c, idx) => (
						<div key={c.id} data-aos="fade-up" data-aos-delay={idx * 50}>
							<CourseCard course={c} onEnroll={enroll} onOpen={(course) => setOpenCourse(course)} trigger="click" />
						</div>
					))}
				</div>
			</div>

			{/* Modal */}
			<CourseModal course={openCourse} open={!!openCourse} onClose={() => setOpenCourse(null)} onBuy={enroll} />
		</section>
	)
}

export default HomePopularCourses