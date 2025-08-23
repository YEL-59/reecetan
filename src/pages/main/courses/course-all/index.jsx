import { useMemo, useState, useEffect } from 'react'
import CourseCard from '@/components/course/CourseCard'
import CourseModal from '@/components/course/CourseModal'
import { Search } from 'lucide-react'
import { useCart } from '@/contexts/cart-context'
import { useNavigate } from 'react-router-dom'

const CATEGORY_OPTIONS = [
  { label: 'Nursing', value: 'Nursing Programs' },
  { label: 'Home Care', value: 'Health Care' },
  { label: 'Marketing', value: 'Professional Skills' },
  { label: 'Design', value: 'Emotional Care' }
]

const LEVEL_OPTIONS = ['Beginner', 'Intermediate', 'Advanced']

const SEED_COURSES = [
  { id: 1,  title: 'Complete Medical Terminology Course', category: 'Health Care',          rating: 4.8, students: 123, price: 50, image: 'https://images.unsplash.com/photo-1580281658208-2cf4e1b1d4b3?q=80&w=1200&auto=format&fit=crop', level: 'Beginner' },
  { id: 2,  title: 'Nursing Fundamentals Bootcamp',      category: 'Nursing Programs',       rating: 4.7, students: 231, price: 60, image: 'https://images.unsplash.com/photo-1579154204601-01588f351e74?q=80&w=1200&auto=format&fit=crop', level: 'Beginner' },
  { id: 3,  title: 'Medical Basics: Anatomy Essentials',  category: 'Medical Basics',         rating: 4.9, students: 543, price: 70, image: 'https://images.unsplash.com/photo-1583316175707-1ff2d1f2f4d5?q=80&w=1200&auto=format&fit=crop', level: 'Intermediate' },
  { id: 4,  title: 'Professional Communication for Nurses', category: 'Professional Skills', rating: 4.6, students: 98,  price: 45, image: 'https://images.unsplash.com/photo-1551601651-8fc8fd76d297?q=80&w=1200&auto=format&fit=crop', level: 'Beginner' },
  { id: 5,  title: 'Emotional Care & Patient Empathy',    category: 'Emotional Care',        rating: 4.8, students: 412, price: 55, image: 'https://images.unsplash.com/photo-1600959907703-125ba1374a12?q=80&w=1200&auto=format&fit=crop', level: 'Intermediate' },
  { id: 6,  title: 'Exam Prep: Mock Boards Practice',     category: 'Exam Prep',              rating: 4.7, students: 827, price: 65, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop', level: 'Advanced' },
  { id: 7,  title: 'Clinical Procedures Mastery',         category: 'Health Care',            rating: 4.8, students: 256, price: 80, image: 'https://images.unsplash.com/photo-1582719478510-9ff3aa56a7d3?q=80&w=1200&auto=format&fit=crop', level: 'Advanced' },
  { id: 8,  title: 'Pediatric Nursing Essentials',        category: 'Nursing Programs',       rating: 4.7, students: 199, price: 58, image: 'https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?q=80&w=1200&auto=format&fit=crop', level: 'Intermediate' },
  { id: 9,  title: 'Pathophysiology Basics',              category: 'Medical Basics',         rating: 4.9, students: 334, price: 62, image: 'https://images.unsplash.com/photo-1559757175-08c4e7a4a74b?q=80&w=1200&auto=format&fit=crop', level: 'Beginner' },
  { id: 10, title: 'Leadership in Healthcare',            category: 'Professional Skills',    rating: 4.6, students: 288, price: 75, image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1200&auto=format&fit=crop', level: 'Advanced' },
  { id: 11, title: 'Patient Psychology & Care',           category: 'Emotional Care',         rating: 4.7, students: 167, price: 54, image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop', level: 'Intermediate' },
  { id: 12, title: 'NCLEX Comprehensive Review',          category: 'Exam Prep',              rating: 4.8, students: 904, price: 85, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop', level: 'Advanced' },
  { id: 13, title: 'Geriatric Care Fundamentals',         category: 'Health Care',            rating: 4.5, students: 140, price: 49, image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1200&auto=format&fit=crop', level: 'Beginner' },
  { id: 14, title: 'Nursing Pharmacology',                category: 'Nursing Programs',       rating: 4.7, students: 377, price: 68, image: 'https://images.unsplash.com/photo-1584985231208-6a1c10ca7b9d?q=80&w=1200&auto=format&fit=crop', level: 'Advanced' },
  { id: 15, title: 'Microbiology Essentials',             category: 'Medical Basics',         rating: 4.8, students: 220, price: 61, image: 'https://images.unsplash.com/photo-1582719478251-e26c88b06803?q=80&w=1200&auto=format&fit=crop', level: 'Intermediate' },
  { id: 16, title: 'Effective Healthcare Presentations',  category: 'Professional Skills',    rating: 4.4, students: 96,  price: 40, image: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=1200&auto=format&fit=crop', level: 'Beginner' },
  { id: 17, title: 'Therapeutic Communication',           category: 'Emotional Care',         rating: 4.6, students: 410, price: 59, image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=1200&auto=format&fit=crop', level: 'Beginner' },
  { id: 18, title: 'Rapid Fire Exams: Drill Sessions',    category: 'Exam Prep',              rating: 4.7, students: 740, price: 72, image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop', level: 'Intermediate' }
]

const SORT_OPTIONS = [
  { value: 'default', label: 'Default Sorting' },
  { value: 'rating',  label: 'Rating' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'students',   label: 'Most Students' }
]

const ITEMS_PER_PAGE = 9

const CourseAll = () => {
  const [query, setQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState(new Set())
  const [selectedLevels, setSelectedLevels] = useState(new Set())
  const [maxPrice, setMaxPrice] = useState(100)
  const [sortBy, setSortBy] = useState('default')
  const [page, setPage] = useState(1)
  const [openCourse, setOpenCourse] = useState(null)
  const { add } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    if (window.AOS) window.AOS.refresh()
  }, [query, selectedCategories, selectedLevels, maxPrice, sortBy, page])

  const courses = useMemo(() => SEED_COURSES, [])

  const filtered = useMemo(() => {
    let list = courses

    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(c => c.title.toLowerCase().includes(q))
    }

    if (selectedCategories.size > 0) {
      list = list.filter(c => selectedCategories.has(c.category))
    }

    if (selectedLevels.size > 0) {
      list = list.filter(c => selectedLevels.has(c.level))
    }

    list = list.filter(c => c.price <= maxPrice)

    switch (sortBy) {
      case 'rating':
        list = [...list].sort((a,b) => b.rating - a.rating)
        break
      case 'price-asc':
        list = [...list].sort((a,b) => a.price - b.price)
        break
      case 'price-desc':
        list = [...list].sort((a,b) => b.price - a.price)
        break
      case 'students':
        list = [...list].sort((a,b) => b.students - a.students)
        break
      default:
        break
    }

    return list
  }, [courses, query, selectedCategories, selectedLevels, maxPrice, sortBy])

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE))
  const startIdx = (page - 1) * ITEMS_PER_PAGE
  const endIdx = Math.min(total, startIdx + ITEMS_PER_PAGE)
  const pageItems = filtered.slice(startIdx, endIdx)

  useEffect(() => { setPage(1) }, [query, selectedCategories, selectedLevels, maxPrice, sortBy])

  const toggleCategory = (value) => {
    const next = new Set(selectedCategories)
    next.has(value) ? next.delete(value) : next.add(value)
    setSelectedCategories(next)
  }

  const toggleLevel = (value) => {
    const next = new Set(selectedLevels)
    next.has(value) ? next.delete(value) : next.add(value)
    setSelectedLevels(next)
  }

  const enroll = (course) => {
    add(course)
    navigate('/checkout')
  }

  return (
    <section className="py-12 bg-white" data-aos="fade-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          {/* Search */}
          <div className="flex items-center w-full sm:max-w-sm bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search course"
              className="ml-2 w-full outline-none text-sm"
            />
          </div>

          {/* Result counter */}
          <p className="text-xs text-gray-500">Showing {startIdx + 1}-{endIdx} of {total} results</p>

          {/* Sorting */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-48 border border-gray-200 rounded-lg px-3 py-2 text-sm shadow-sm"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar filters */}
          <aside className="space-y-6">
            {/* Category */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 text-sm font-medium">CATEGORY <span>▾</span></button>
              <div className="p-4 space-y-2">
                {CATEGORY_OPTIONS.map(opt => (
                  <label key={opt.value} className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" checked={selectedCategories.has(opt.value)} onChange={() => toggleCategory(opt.value)} />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Course Level */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 text-sm font-medium">Course Level <span>▾</span></button>
              <div className="p-4 space-y-2">
                {LEVEL_OPTIONS.map(level => (
                  <label key={level} className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" checked={selectedLevels.has(level)} onChange={() => toggleLevel(level)} />
                    <span>{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 text-sm font-medium">Price Range <span>▾</span></button>
              <div className="p-4 space-y-3">
                <input type="range" min="0" max="100" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full" />
                <div className="text-xs text-gray-600">Up to ${maxPrice}</div>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageItems.map((c, idx) => (
                <div key={c.id} data-aos="fade-up" data-aos-delay={idx * 40}>
                  <CourseCard course={c} onEnroll={enroll} onOpen={(course) => setOpenCourse(course)} trigger="click" />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} className={`w-8 h-8 rounded-full text-sm border ${page === 1 ? 'text-gray-300 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}>‹</button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} className={`w-8 h-8 rounded-full text-sm border ${page === (i + 1) ? 'bg-primary text-white border-primary' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}>{i + 1}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} className={`w-8 h-8 rounded-full text-sm border ${page === totalPages ? 'text-gray-300 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}>›</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <CourseModal course={openCourse} open={!!openCourse} onClose={() => setOpenCourse(null)} onBuy={enroll} />
    </section>
  )
}

export default CourseAll