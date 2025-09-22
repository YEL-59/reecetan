import { X, Star, CheckCircle2, PlayCircle } from 'lucide-react'
import CourseCard from '@/components/course/CourseCard'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import OrderSummaryModal from '@/components/OrderSummaryModal'
import { useNavigate } from 'react-router-dom'
import { enrollInCourse } from '@/lib/coursesApi'
import toast from 'react-hot-toast'
import {
	Dialog,
	DialogContent,
	DialogClose,
} from '@/components/ui/dialog'

export default function CourseModal({ course, open, onClose, onBuy }) {
	if (!course) return null
	const { title, image, rating, students, price, courseType } = course
	const [showOrderModal, setShowOrderModal] = useState(false)
	const [isEnrolling, setIsEnrolling] = useState(false)
	const navigate = useNavigate()

	const handleBuyNow = async (e) => {
		e?.stopPropagation()
		e?.preventDefault()

		// Check if course is free (handle both string and potential undefined cases)
		// Handle various possible values: 'free', 'Free', 'FREE', null, undefined, etc.
		const normalizedCourseType = courseType?.toString().toLowerCase()
		if (normalizedCourseType === 'free') {
			// Directly enroll in free course
			await handleFreeEnrollment()
		} else {
			// Show payment modal for paid course
			setShowOrderModal(true)
		}
	}

	const handleFreeEnrollment = async () => {
		setIsEnrolling(true)

		try {
			const result = await enrollInCourse(course.id)

			if (result.success) {
				toast.success(result.message, {
					duration: 5000,
					style: {
						background: '#10B981',
						color: 'white',
					},
					iconTheme: {
						primary: 'white',
						secondary: '#10B981',
					},
				})
				onClose() // Close modal after successful enrollment
			} else {
				toast.error(result.message, {
					duration: 5000,
					style: {
						background: '#EF4444',
						color: 'white',
					},
					iconTheme: {
						primary: 'white',
						secondary: '#EF4444',
					},
				})
			}
		} catch (error) {
			console.error('Enrollment error:', error)
			toast.error('Something went wrong. Please try again later.', {
				duration: 5000,
				style: {
					background: '#EF4444',
					color: 'white',
				},
				iconTheme: {
					primary: 'white',
					secondary: '#EF4444',
				},
			})
		} finally {
			setIsEnrolling(false)
		}
	}

	const handlePaymentNow = (orderData) => {
		setShowOrderModal(false)
		onClose() // Close the course modal
		navigate('/checkout', { state: { orderData } })
	}

	const handleModalClose = () => {
		setShowOrderModal(false)
	}

	const modules = course.modules || [
		{
			title: 'Module 1: Introduction to CNA',
			duration: '40m',
			lessons: [
				{ title: 'Course intro', duration: '4m' },
				{ title: 'Role of a CNA', duration: '9m' },
				{ title: 'Ethics & safety', duration: '12m' },
				{ title: 'Communication basics', duration: '7m' },
				{ title: 'Checklist & quiz', duration: '8m' },
			],
		},
		{
			title: 'Module 2: Patient Safety',
			duration: '1h 20m',
			lessons: [
				{ title: 'Patient identification', duration: '10m' },
				{ title: 'Fall prevention', duration: '15m' },
				{ title: 'Infection control', duration: '20m' },
				{ title: 'Medication safety', duration: '18m' },
				{ title: 'Emergency response', duration: '17m' },
			],
		},
		{
			title: 'Quiz: Basic Nursing Skills',
			duration: '30m',
			lessons: [
				{ title: 'Timed quiz – 10 questions', duration: '30m' },
			],
		},
	]

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-4xl max-h-[90vh] p-0">
				{/* Header image - Fixed */}
				<div className="relative h-48 sm:h-56 flex-shrink-0">
					<img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
					<div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />
					<DialogClose className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 hover:bg-black/60 flex items-center justify-center text-white transition-colors">
						<X className="w-5 h-5" />
					</DialogClose>

					<div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white">
						<h3 className="text-base sm:text-lg md:text-xl font-semibold">{title}</h3>
						<div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
							<div className="flex items-center gap-2">
								<Star className="w-4 h-4 text-amber-400 fill-amber-400" />
								<span className="font-medium">{rating.toFixed(1)}</span>
								<span className="text-white/80">{students.toLocaleString()} Students</span>
							</div>
							<div className="flex items-center gap-3">
								<span className="font-semibold">${price}</span>
								<Button
									onClick={handleBuyNow}
									disabled={isEnrolling}
									className="rounded-full bg-primary hover:bg-primary/90 h-9 px-5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{isEnrolling ? 'Enrolling...' : (courseType?.toString().toLowerCase() === 'free' ? 'Enroll Free' : 'Buy Now')}
								</Button>
							</div>
						</div>
					</div>
				</div>

				{/* Body - Scrollable */}
				<div className="flex-1 overflow-y-auto bg-white max-h-[50vh]">
					<div className="p-4 sm:p-6 pb-8 space-y-8">
						<p className="text-sm sm:text-base text-gray-600">
							Master essential nursing skills and prepare for your CNA certification with comprehensive training covering patient care, safety protocols, and professionalism in healthcare environments.
						</p>

						{/* What you'll learn */}
						<div>
							<h4 className="font-semibold mb-3">What You'll Learn</h4>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
								<p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Provide basic patient care and comfort</p>
								<p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Provide basic patient care and comfort</p>
								<p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Provide basic patient care and comfort</p>
								<p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Provide basic patient care and comfort</p>
							</div>
						</div>

						{/* Curriculum */}
						<div>
							<h4 className="font-semibold mb-3">Course Curriculum</h4>
							<div className="space-y-3">
								{modules.map((m, idx) => (
									<details key={idx} className="group rounded-lg bg-[#0A0F1E] text-white overflow-hidden">
										<summary className="cursor-pointer list-none p-4 flex items-center justify-between">
											<span>{m.title}</span>
											<span className="text-xs text-white/70">{m.duration}</span>
										</summary>
										<div className="grid grid-rows-[0fr] group-open:grid-rows-[1fr] transition-all duration-300">
											<div className="overflow-hidden">
												<ul className="px-4 pb-4 space-y-2 text-sm">
													{m.lessons.map((l, i) => (
														<li key={i} className="flex items-center justify-between text-white/90">
															<span className="flex items-center gap-2"><PlayCircle className="w-4 h-4 text-primary" /> {l.title}</span>
															<span className="text-xs text-white/60">{l.duration}</span>
														</li>
													))}
												</ul>
											</div>
										</div>
									</details>
								))}
							</div>
						</div>

						{/* Reviews */}
						<div>
							<h4 className="font-semibold mb-3">Student Reviews</h4>
							<div className="space-y-3">
								<div className="rounded-lg bg-[#0A0F1E] text-white p-4">
									<div className="flex items-center gap-1 text-amber-400 mb-1">
										{Array.from({ length: 5 }).map((_, i) => (
											<Star key={i} className="w-4 h-4 fill-amber-400" />
										))}
									</div>
									<p className="text-sm text-white/90">Great preparation for the CNA exam. Passed on my first try thanks to this comprehensive training program.</p>
									<p className="mt-2 text-xs text-white/60">James Simon</p>
								</div>
								<div className="rounded-lg bg-[#0A0F1E] text-white p-4">
									<div className="flex items-center gap-1 text-amber-400 mb-1">
										{Array.from({ length: 5 }).map((_, i) => (
											<Star key={i} className="w-4 h-4 fill-amber-400" />
										))}
									</div>
									<p className="text-sm text-white/90">Great preparation for the CNA exam. Passed on my first try thanks to this comprehensive training program.</p>
									<p className="mt-2 text-xs text-white/60">Alena Stark</p>
								</div>
							</div>
						</div>

						{/* More like this */}
						<div>
							<h4 className="font-semibold mb-3">More Like This</h4>
							<div className="max-w-xs">
								<CourseCard course={course} onEnroll={() => { }} />
							</div>
						</div>
					</div>
				</div>

				{/* Order Summary Modal */}
				<OrderSummaryModal
					course={course}
					isOpen={showOrderModal}
					onClose={handleModalClose}
					onPaymentNow={handlePaymentNow}
				/>
			</DialogContent>
		</Dialog>
	)
}
