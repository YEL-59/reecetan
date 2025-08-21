import { X, Star, CheckCircle2, PlayCircle } from 'lucide-react'
import CourseCard from '@/components/course/CourseCard'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

export default function CourseModal({ course, open, onClose }) {
	if (!open || !course) return null
	const { title, image, rating, students, price } = course

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
		<AnimatePresence>
			{open && (
				<motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
					{/* Backdrop */}
					<motion.div
						className="absolute inset-0 bg-black/60"
						onClick={onClose}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					/>

					{/* Modal */}
					<div className="absolute inset-0 overflow-y-auto">
						<div className="min-h-full py-6 sm:py-8 px-3 sm:px-6 lg:px-8 flex justify-center">
							<motion.div
								className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden"
								initial={{ y: 24, scale: 0.98 }}
								animate={{ y: 0, scale: 1 }}
								exit={{ y: 24, scale: 0.98 }}
								transition={{ type: 'spring', stiffness: 240, damping: 24 }}
							>
								{/* Header image */}
								<div className="relative h-52 sm:h-64 md:h-72">
									<img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
									<div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />
									<button onClick={onClose} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 hover:bg-black/60 flex items-center justify-center text-white">
										<X className="w-5 h-5" />
									</button>

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
												<Button className="rounded-full bg-primary hover:bg-primary/90 h-9 px-5">Buy Now</Button>
											</div>
										</div>
									</div>
								</div>

								{/* Body */}
								<div className="p-4 sm:p-6 space-y-8">
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
											<CourseCard course={course} onEnroll={() => {}} />
										</div>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
