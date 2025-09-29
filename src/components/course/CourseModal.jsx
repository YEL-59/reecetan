import { X, Star, CheckCircle2, PlayCircle, Video } from 'lucide-react'
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
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { axiosPrivate } from '@/lib/axios.config'
import { useMutation } from '@tanstack/react-query' // Add this import
import { useStripePayment } from '@/hooks/useStripePayment'



/**
 * Format course details data for display
 * @param {Object} courseData - Raw course data from API
 * @returns {Object} Formatted course data
 */
export const formatCourseDetails = (courseData) => {
	return {
		id: courseData.id,
		title: courseData.title,
		description: courseData.description,
		image: courseData.image,
		price: courseData.price,
		level: courseData.level,
		duration: courseData.duration,
		language: courseData.language,
		courseType: courseData.course_type,
		rating: parseFloat(courseData.instructors?.rating || '0'),
		students: Math.floor(Math.random() * 10000), // You might want to get this from API

		// Format what you'll learn from the learns array
		learns: courseData.learns?.map(learn => ({
			id: learn.id,
			title: learn.title,
			description: learn.description
		})) || [],

		// Format instructor information
		instructor: courseData.instructors ? {
			id: courseData.instructors.id,
			name: courseData.instructors.name,
			image: courseData.instructors.image,
			rating: parseFloat(courseData.instructors.rating || '0'),
			totalLessons: courseData.instructors.total_lesson,
			user: courseData.instructors.user
		} : null,

		// Format lessons and parts
		lessons: courseData.lessons?.map(lesson => ({
			id: lesson.id,
			title: lesson.title,
			description: lesson.description,
			parts: lesson.parts?.map(part => ({
				id: part.id,
				title: part.title,
				video: part.video,
				content: part.content,
				quiz: part.quiz ? {
					id: part.quiz.id,
					title: part.quiz.title,
					questions: part.quiz.questions?.map(question => ({
						id: question.id,
						questionText: question.question_text,
						options: question.options?.map(option => ({
							id: option.id,
							text: option.option_text.en || option.option_text,
							isCorrect: option.is_correct
						})) || []
					})) || []
				} : null
			})) || []
		})) || [],

		// Format reviews
		reviews: courseData.reviews || []
	}
}

/**
 * Get course details with lessons and parts
 * @param {number} courseId - The ID of the course to fetch
 * @returns {Promise<Object>} API response with course details
 */
export const getCourseDetails = async (courseId) => {
	try {
		const response = await axiosPrivate.get(`/courses/${courseId}`)

		return {
			success: true,
			data: response.data.data,
			message: response.data.message
		}
	} catch (error) {
		console.error('Get course details error:', error)

		// Handle different error scenarios
		if (error.response) {
			const status = error.response.status
			const errorData = error.response.data

			if (status === 401) {
				return {
					success: false,
					error: 'Authentication required',
					message: 'Please log in to view this course'
				}
			} else if (status === 403) {
				return {
					success: false,
					error: 'Access denied',
					message: 'You are not enrolled in this course'
				}
			} else if (status === 404) {
				return {
					success: false,
					error: 'Course not found',
					message: 'The course you are looking for does not exist'
				}
			} else if (status >= 500) {
				return {
					success: false,
					error: 'Server error',
					message: 'Something went wrong on our end. Please try again later'
				}
			}

			return {
				success: false,
				error: errorData?.message || 'Failed to fetch course',
				message: errorData?.message || 'Unable to load course details. Please try again'
			}
		} else if (error.request) {
			return {
				success: false,
				error: 'Network error',
				message: 'Please check your internet connection and try again'
			}
		} else {
			return {
				success: false,
				error: 'Unexpected error',
				message: 'Something went wrong. Please try again'
			}
		}
	}
}

export default function CourseModal({ course, open, onClose, onBuy }) {
	if (!course) return null

	const { id, title, image, rating, students, price, courseType } = course
	const [showOrderModal, setShowOrderModal] = useState(false)
	const [isEnrolling, setIsEnrolling] = useState(false)
	const [courseDetails, setCourseDetails] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	console.log('Course ID:', id)

	// Stripe payment mutation using your custom hook
	const stripePayment = useStripePayment()

	// Fetch course details on component mount
	useEffect(() => {
		const fetchCourseDetails = async () => {
			if (!id) return

			setIsLoading(true)
			setError(null)

			try {
				const result = await getCourseDetails(id)
				console.log("API result:", result)

				if (result.success) {
					const formattedCourse = formatCourseDetails(result.data)
					setCourseDetails(formattedCourse)
				} else {
					setError(result.message)
					toast.error(result.message)
				}
			} catch (err) {
				console.error('Failed to fetch course details:', err)
				setError('Failed to load course details')
				toast.error('Failed to load course details')
			} finally {
				setIsLoading(false)
			}
		}

		fetchCourseDetails()
	}, [id])

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

	const handlePaymentNow = async (orderData) => {
		setShowOrderModal(false)

		const payload = {
			...orderData,
			payment_method: 'stripe',
			success_url: `${window.location.origin}/payment-success`,
			cancel_url: `${window.location.origin}/payment-cancel`,
		}

		// Trigger the Stripe payment mutation using your hook
		stripePayment.mutate(
			{ courseId: course.id, paymentData: payload },
			{
				onSuccess: (result) => {
					if (result.success) {
						const sessionUrl = result.data?.payment_url || result.data?.url
						const paymentId = result.data?.payment_id || result.data?.id

						if (paymentId) {
							// Store payment ID for success page reference
							localStorage.setItem("payment_id", paymentId)
						}

						if (sessionUrl) {
							// Redirect to Stripe Checkout
							window.location.href = sessionUrl
						} else {
							toast.success(result.message || 'Payment initialized')
							onClose() // Close modal if no redirect URL
						}
					} else {
						toast.error(result.message || 'Unable to create payment session')
					}
				},
				onError: (error) => {
					console.error('Payment mutation error:', error)
					toast.error('Payment request failed. Please try again.')
				},
			}
		)
	}

	const handleModalClose = () => {
		setShowOrderModal(false)
	}

	// Use courseDetails if available, otherwise fall back to course prop
	const displayCourse = courseDetails || course

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
									disabled={isEnrolling || stripePayment.isPending}
									className="rounded-full bg-primary hover:bg-primary/90 h-9 px-5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{isEnrolling
										? 'Enrolling...'
										: stripePayment.isPending
											? 'Processing...'
											: (courseType?.toString().toLowerCase() === 'free' ? 'Enroll Free' : 'Buy Now')
									}
								</Button>
							</div>
						</div>
					</div>
				</div>

				{/* Body - Scrollable */}
				<div className="flex-1 overflow-y-auto bg-white max-h-[50vh]">
					<div className="p-4 sm:p-6 pb-8 space-y-8">
						{/* Loading state */}
						{isLoading && (
							<div className="flex items-center justify-center py-8">
								<div className="text-gray-500">Loading course details...</div>
							</div>
						)}

						{/* Error state */}
						{error && !isLoading && (
							<div className="bg-red-50 border border-red-200 rounded-lg p-4">
								<div className="text-red-800">{error}</div>
							</div>
						)}

						{/* Course content */}
						{!isLoading && !error && (
							<>
								<p className="text-sm sm:text-base text-gray-600">
									{displayCourse?.description}
								</p>

								{/* What you'll learn */}
								<div>
									<h4 className="font-semibold mb-3">What You'll Learn</h4>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
										{displayCourse?.learns && displayCourse.learns.length > 0 ? (
											displayCourse.learns.map((learn) => (
												<div key={learn.id}>
													<p className="flex items-center gap-2 font-medium">
														<CheckCircle2 className="w-4 h-4 text-primary" />
														{learn.title}
													</p>
													{learn.description && Array.isArray(learn.description) && (
														<ul className="ml-6 mt-1 space-y-1">
															{learn.description.map((item, index) => (
																<li key={index} className="text-gray-600">• {item}</li>
															))}
														</ul>
													)}
												</div>
											))
										) : (
											// Fallback content if no learns data
											<>
												<p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Comprehensive course content</p>
												<p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Hands-on practical exercises</p>
												<p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Expert instruction and guidance</p>
												<p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Certificate upon completion</p>
											</>
										)}
									</div>
								</div>

								{/* Curriculum */}
								<div>
									<h4 className="font-semibold mb-3">Course Curriculum</h4>

									{displayCourse?.lessons && displayCourse.lessons.length > 0 ? (
										<div className="space-y-4">
											{displayCourse.lessons.map((lesson, index) => (
												<div key={lesson.id} className="border rounded-lg p-4">
													<div className="flex items-center justify-between mb-3">
														<h3 className="font-semibold text-gray-900">{lesson.title}</h3>
														<span className="text-sm text-gray-500">
															{lesson.parts.length} part{lesson.parts.length !== 1 ? 's' : ''}
														</span>
													</div>
													{lesson.description && (
														<p className="text-sm text-gray-600 mb-3">{lesson.description}</p>
													)}
													<div className="space-y-2">
														{lesson.parts.map((part) => (
															<div key={part.id} className="flex items-center justify-between text-sm">
																<div className="flex items-center text-gray-600">
																	<Video className="w-4 h-4 mr-2" />
																	<span>{part.title}</span>
																</div>
																{part.quiz && (
																	<span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
																		Quiz: {part.quiz.questions.length} questions
																	</span>
																)}
															</div>
														))}
													</div>
												</div>
											))}
										</div>
									) : (
										<div className="text-gray-500 text-center py-4">
											No curriculum details available
										</div>
									)}
								</div>

								{/* Instructor Info */}
								{displayCourse?.instructor && (
									<div>
										<h4 className="font-semibold mb-3">Instructor</h4>
										<div className="bg-gray-50 rounded-lg p-4">
											<div className="flex items-center gap-3">
												{displayCourse.instructor.image && (
													<img
														src={displayCourse.instructor.image}
														alt={displayCourse.instructor.name}
														className="w-12 h-12 rounded-full object-cover"
													/>
												)}
												<div>
													<h5 className="font-medium">{displayCourse.instructor.name}</h5>
													<div className="flex items-center gap-2 text-sm text-gray-600">
														<Star className="w-4 h-4 text-amber-400 fill-amber-400" />
														<span>{displayCourse.instructor.rating.toFixed(1)} rating</span>
														<span>•</span>
														<span>{displayCourse.instructor.totalLessons} lessons</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								)}

								{/* Reviews */}
								<div>
									<h4 className="font-semibold mb-3">Student Reviews</h4>
									{displayCourse?.reviews && displayCourse.reviews.length > 0 ? (
										<div className="space-y-3">
											{displayCourse.reviews.map((review, index) => (
												<div key={index} className="rounded-lg bg-[#0A0F1E] text-white p-4">
													<div className="flex items-center gap-1 text-amber-400 mb-1">
														{Array.from({ length: 5 }).map((_, i) => (
															<Star key={i} className="w-4 h-4 fill-amber-400" />
														))}
													</div>
													<p className="text-sm text-white/90">{review.comment}</p>
													<p className="mt-2 text-xs text-white/60">{review.user_name}</p>
												</div>
											))}
										</div>
									) : (
										// Sample reviews as fallback
										<div className="space-y-3">
											<div className="rounded-lg bg-[#0A0F1E] text-white p-4">
												<div className="flex items-center gap-1 text-amber-400 mb-1">
													{Array.from({ length: 5 }).map((_, i) => (
														<Star key={i} className="w-4 h-4 fill-amber-400" />
													))}
												</div>
												<p className="text-sm text-white/90">Excellent course content and very well structured. Highly recommend!</p>
												<p className="mt-2 text-xs text-white/60">Student Review</p>
											</div>
										</div>
									)}
								</div>

								{/* More like this */}
								<div>
									<h4 className="font-semibold mb-3">More Like This</h4>
									<div className="max-w-xs">
										<CourseCard course={course} onEnroll={() => { }} />
									</div>
								</div>
							</>
						)}
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