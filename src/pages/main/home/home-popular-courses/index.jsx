import { useMemo, useState } from 'react'
import CourseCard from '@/components/course/CourseCard'
import CourseModal from '@/components/course/CourseModal'

const ALL_TABS = [
	'All',
	'Nursing Programs',
	'Health Care',
	'Medical Basics',
	'Emotional Care',
	'Professional Skills',
	'Exam Prep',
]

const seedCourses = [
	{
		id: 1,
		title: 'Complete Medical Terminology Course',
		category: 'Health Care',
		rating: 4.8,
		students: 123,
		price: 50,
		image: 'https://images.unsplash.com/photo-1580281658208-2cf4e1b1d4b3?q=80&w=1200&auto=format&fit=crop',
	},
	{
		id: 2,
		title: 'Complete Medical Terminology Course',
		category: 'Nursing Programs',
		rating: 4.8,
		students: 123,
		price: 50,
		image: 'https://images.unsplash.com/photo-1579154204601-01588f351e74?q=80&w=1200&auto=format&fit=crop',
	},
	{
		id: 3,
		title: 'Complete Medical Terminology Course',
		category: 'Medical Basics',
		rating: 4.8,
		students: 123,
		price: 50,
		image: 'https://images.unsplash.com/photo-1583316175707-1ff2d1f2f4d5?q=80&w=1200&auto=format&fit=crop',
	},
	{
		id: 4,
		title: 'Complete Medical Terminology Course',
		category: 'Professional Skills',
		rating: 4.8,
		students: 123,
		price: 50,
		image: 'https://images.unsplash.com/photo-1551601651-8fc8fd76d297?q=80&w=1200&auto=format&fit=crop',
	},
	{
		id: 5,
		title: 'Complete Medical Terminology Course',
		category: 'Emotional Care',
		rating: 4.8,
		students: 123,
		price: 50,
		image: 'https://images.unsplash.com/photo-1600959907703-125ba1374a12?q=80&w=1200&auto=format&fit=crop',
	},
	{
		id: 6,
		title: 'Complete Medical Terminology Course',
		category: 'Exam Prep',
		rating: 4.8,
		students: 123,
		price: 50,
		image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop',
	},
]

const Tab = ({ label, active, onClick }) => (
	<button
		className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
			active ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
		}`}
		onClick={onClick}
	>
		{label}
	</button>
)

const HomePopularCourses = () => {
	const [activeTab, setActiveTab] = useState('Nursing Programs')
	const [openCourse, setOpenCourse] = useState(null)

	const courses = useMemo(() => seedCourses, [])
	const filtered = useMemo(() => {
		if (activeTab === 'All') return courses
		return courses.filter((c) => c.category === activeTab)
	}, [activeTab, courses])

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

				{/* Tabs */}
				<div className="flex flex-wrap gap-3 justify-center mb-10" data-aos="zoom-in">
					{ALL_TABS.map((label) => (
						<Tab key={label} label={label} active={activeTab === label} onClick={() => setActiveTab(label)} />
					))}
				</div>

				{/* Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{filtered.map((c, idx) => (
						<div key={c.id} data-aos="fade-up" data-aos-delay={idx * 50}>
							<CourseCard course={c} onEnroll={() => {}} onOpen={(course) => setOpenCourse(course)} />
						</div>
					))}
				</div>
			</div>

			{/* Modal */}
			<CourseModal course={openCourse} open={!!openCourse} onClose={() => setOpenCourse(null)} />
		</section>
	)
}

export default HomePopularCourses