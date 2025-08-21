import { useEffect, useMemo, useState } from 'react'
import { Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: 'Jenny Wilson',
    role: 'Medtech with Sorth',
    avatar: 'https://i.pravatar.cc/64?img=5',
    rating: 5,
    text:
      "once dreamt of becoming a topnotcher. Rank One played a huge part in turning that dream into reality. The lecturers have great expertise in equipping us with the concepts and test-taking strategies for the NLE.",
  },
  {
    id: 2,
    name: 'Jenny Wilson',
    role: 'Medtech with Sorth',
    avatar: 'https://i.pravatar.cc/64?img=6',
    rating: 5,
    text:
      "once dreamt of becoming a topnotcher. Rank One played a huge part in turning that dream into reality. The lecturers have great expertise in equipping us with the concepts and test-taking strategies for the NLE.",
  },
  {
    id: 3,
    name: 'Jenny Wilson',
    role: 'Medtech with Sorth',
    avatar: 'https://i.pravatar.cc/64?img=7',
    rating: 5,
    text:
      "once dreamt of becoming a topnotcher. Rank One played a huge part in turning that dream into reality. The lecturers have great expertise in equipping us with the concepts and test-taking strategies for the NLE.",
  },
  {
    id: 4,
    name: 'Jenny Wilson',
    role: 'Medtech with Sorth',
    avatar: 'https://i.pravatar.cc/64?img=8',
    rating: 5,
    text:
      "once dreamt of becoming a topnotcher. Rank One played a huge part in turning that dream into reality. The lecturers have great expertise in equipping us with the concepts and test-taking strategies for the NLE.",
  },
  {
    id: 5,
    name: 'Jenny Wilson',
    role: 'Medtech with Sorth',
    avatar: 'https://i.pravatar.cc/64?img=9',
    rating: 5,
    text:
      "once dreamt of becoming a topnotcher. Rank One played a huge part in turning that dream into reality. The lecturers have great expertise in equipping us with the concepts and test-taking strategies for the NLE.",
  },
]

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
        <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full" />
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
  const pageSize = usePageSize()
  const pages = useMemo(() => {
    const chunks = []
    for (let i = 0; i < testimonials.length; i += pageSize) {
      chunks.push(testimonials.slice(i, i + pageSize))
    }
    return chunks
  }, [pageSize])

  const [index, setIndex] = useState(0)
  const next = () => setIndex((p) => (p + 1) % pages.length)
  const prev = () => setIndex((p) => (p - 1 + pages.length) % pages.length)

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Student's <span className="text-primary">Feedback</span>
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <div className={`grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-${pageSize}`}> 
                  {pages[index].map((t) => (
                    <FeedbackCard key={t.id} t={t} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-primary' : 'w-2.5 bg-gray-300'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeFeedback