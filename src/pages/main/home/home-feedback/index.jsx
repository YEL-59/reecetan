import { useEffect, useMemo, useState } from 'react'
import { Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGetTestimonials } from '../api'


const FeedbackCard = ({ t }) => {
  return (
    <div className="border rounded-xl bg-white shadow-sm p-5">
      <div className="text-amber-400 flex gap-0.5 mb-3">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-400" />
        ))}
      </div>
      <p className="text-sm text-gray-700 leading-relaxed mb-4">{t.text}</p>
      <div className="flex items-center gap-3">
        <img
          src={t.avatar}
          alt={t.name}
          className="w-8 h-8 rounded-full object-cover"
          onError={(e) => {
            e.target.src = 'https://i.pravatar.cc/64?img=1'
          }}
        />
        <div>
          <p className="text-sm font-semibold text-gray-900">{t.name}</p>
          <p className="text-xs text-gray-500">{t.role}</p>
        </div>
      </div>
    </div>
  )
}

const usePageSize = () => {
  const [size, setSize] = useState(3)
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setSize(1)
      else if (window.innerWidth < 1024) setSize(2)
      else setSize(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return size
}

const HomeFeedback = () => {
  const { data, isLoading } = useGetTestimonials(1)

  // Fixed: Access the formatted data structure from your API hook
  const testimonials = useMemo(() => {
    if (!data?.testimonials) return []

    return data.testimonials.map((item) => ({
      id: item.id,
      name: item.user?.name || item.name || "Anonymous",
      avatar: item.user?.avatar || `https://i.pravatar.cc/64?img=${item.id}`,
      role: item.course?.title || "Student",
      rating: item.rating || 5,
      text: item.description || "Great course experience!",
    }))
  }, [data])

  const pageSize = usePageSize()
  const [index, setIndex] = useState(0)

  const pages = useMemo(() => {
    if (testimonials.length === 0) return []

    const chunks = []
    for (let i = 0; i < testimonials.length; i += pageSize) {
      chunks.push(testimonials.slice(i, i + pageSize))
    }
    return chunks
  }, [testimonials, pageSize])

  // Reset index if it exceeds available pages
  useEffect(() => {
    if (pages.length > 0 && index >= pages.length) {
      setIndex(0)
    }
  }, [pages, index])

  // Auto-rotate testimonials
  useEffect(() => {
    if (pages.length <= 1) return

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % pages.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [pages.length])

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border rounded-xl bg-gray-50 p-5">
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((j) => (
                        <div key={j} className="w-4 h-4 bg-gray-200 rounded"></div>
                      ))}
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <div>
                        <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
                        <div className="h-2 bg-gray-200 rounded w-12"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Student's <span className="text-primary">Feedback</span>
            </h2>
          </div>
          <div className="text-center py-10">
            <p className="text-gray-500">No student feedback available yet.</p>
            <p className="text-sm text-gray-400 mt-2">Be the first to share your experience!</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Student's <span className="text-primary">Feedback</span>
          </h2>
          <p className="text-gray-600 mt-2">
            See what our students are saying about their learning experience
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div
                  className={`grid gap-5 ${pageSize === 1
                      ? "grid-cols-1"
                      : pageSize === 2
                        ? "grid-cols-2"
                        : "grid-cols-3"
                    }`}
                >
                  {pages[index]?.map((t) => (
                    <FeedbackCard key={t.id} t={t} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots - only show if multiple pages */}
          {pages.length > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              {pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-primary" : "w-2.5 bg-gray-300"
                    }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default HomeFeedback