import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCallback, useRef, useState } from 'react'
import OrderSummaryModal from '@/components/OrderSummaryModal'
import { useNavigate } from 'react-router-dom'
import { enrollInCourse } from '@/lib/coursesApi'
import toast from 'react-hot-toast'
import { useStripePayment } from '@/hooks/useStripePayment'

export default function CourseCard({ course, onEnroll, onOpen, trigger = 'hover' }) {
	const { title, image, category, rating, students, price, courseType } = course
	const hoverTimer = useRef(null)
	const [showOrderModal, setShowOrderModal] = useState(false)
	const [isEnrolling, setIsEnrolling] = useState(false)
	const navigate = useNavigate()
	const stripePayment = useStripePayment()

	const handleMouseEnter = () => {
		if (!onOpen || trigger !== 'hover') return
		hoverTimer.current = window.setTimeout(() => onOpen(course), 350)
	}
	const handleMouseLeave = () => {
		if (hoverTimer.current) {
			window.clearTimeout(hoverTimer.current)
			hoverTimer.current = null
		}
	}

	const handleClick = useCallback(() => {
		if (trigger === 'click') {
			onOpen?.(course)
		}
	}, [course, onOpen, trigger])

	const handleEnrollClick = async (e) => {
		e.stopPropagation()
		e.preventDefault()

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

	// const handlePaymentNow = (orderData) => {
	// 	setShowOrderModal(false)
	// 	navigate('/checkout', { state: { orderData } })
	// }

	const handlePaymentNow = async (orderData) => {
		setShowOrderModal(false)

		const payload = {
			...orderData,
			payment_method: 'stripe', // or 'card' depending on backend
			success_url: `${window.location.origin}/payment-success`,
			cancel_url: `${window.location.origin}/payment-cancel`,
		}

		stripePayment.mutate(
			{ courseId: course.id, paymentData: payload },
			{
				onSuccess: (result) => {
					if (result.success) {
						const sessionUrl = result.data?.payment_url
						const paymentId = result.data?.payment_id // 👈 get payment_id

						if (paymentId) {
							// save it somewhere accessible from success page
							localStorage.setItem("payment_id", paymentId)
						}
						if (sessionUrl) {
							window.location.href = sessionUrl
						} else {
							toast.success(result.message || 'Payment initialized')
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



	const handleModalClose = (e) => {
		if (e) {
			e.stopPropagation()
			e.preventDefault()
		}
		setShowOrderModal(false)
	}

	return (
		<div
			className="relative h-64 rounded-xl overflow-hidden shadow-md cursor-pointer "
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={handleClick}
		>
			{/* Image */}
			<img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />

			{/* Dark gradient overlay */}
			<div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

			{/* Category badge */}
			{category ? (
				<div className="absolute top-3 left-3 z-10">
					<span className="px-3 py-1 text-[10px] font-medium rounded-full bg-white/90 text-gray-900 shadow">
						{category}
					</span>
				</div>
			) : null}

			{/* Content */}
			<div className="absolute inset-x-0 bottom-0 p-4 z-10">
				<h3 className="text-white font-semibold text-sm leading-snug line-clamp-2">
					{title}
				</h3>

				<div className="mt-2 flex items-center justify-between">
					<div className="flex items-center gap-1 text-[13px] text-white/90">
						<Star className="w-4 h-4 text-amber-400 fill-amber-400" />
						<span className="font-medium">{rating.toFixed(1)}</span>
						<span className="text-white/70">({students} Students)</span>
					</div>
					<div className="text-white font-semibold">${price}</div>
				</div>

				<div className="mt-3">
					<Button
						variant="outline"
						onClick={handleEnrollClick}
						//disabled={isEnrolling}
						disabled={isEnrolling || stripePayment.isPending}
						className="w-[140px] h-8 rounded-full border-primary text-primary bg-transparent hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isEnrolling ? 'Enrolling...' : (courseType?.toString().toLowerCase() === 'free' ? 'Enroll Free' : 'Buy Now')}
					</Button>
				</div>
			</div>

			{/* Order Summary Modal */}
			<OrderSummaryModal
				course={course}
				isOpen={showOrderModal}
				onClose={handleModalClose}
				onPaymentNow={handlePaymentNow}
			/>
		</div>
	)
}
