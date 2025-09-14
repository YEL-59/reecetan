import React, { useState, useMemo } from 'react'
import { Star, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { useGetTestimonials, useSubmitTestimonial, useGetCourses } from '@/pages/main/home/api'
import { useAuthStatus } from '@/hooks/auth.hook'
import toast from 'react-hot-toast'

// Fallback courses if API fails
const FALLBACK_COURSES = [
  'Nursing Programs',
  'Health Care',
  'Medical Basics',
  'Emotional Care',
  'Professional Skills',
  'Exam Prep'
]

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Jenny Wilson',
    course: 'Nursing Programs',
    rating: 5,
    text: 'Once dreamt of becoming a topnotcher. Rank One played a huge part in turning that dream into reality. The lecturers have great expertise in equipping us with the concepts and test-taking strategies for the NLE.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    course: 'Health Care',
    rating: 5,
    text: 'Once dreamt of becoming a topnotcher. Rank One played a huge part in turning that dream into reality. The lecturers have great expertise in equipping us with the concepts and test-taking strategies for the NLE.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Michael Chen',
    course: 'Medical Basics',
    rating: 5,
    text: 'Once dreamt of becoming a topnotcher. Rank One played a huge part in turning that dream into reality. The lecturers have great expertise in equipping us with the concepts and test-taking strategies for the NLE.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'Emily Davis',
    course: 'Emotional Care',
    rating: 5,
    text: 'Once dreamt of becoming a topnotcher. Rank One played a huge part in turning that dream into reality. The lecturers have great expertise in equipping us with the concepts and test-taking strategies for the NLE.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 5,
    name: 'David Rodriguez',
    course: 'Professional Skills',
    rating: 5,
    text: 'Once dreamt of becoming a topnotcher. Rank One played a huge part in turning that dream into reality. The lecturers have great expertise in equipping us with the concepts and test-taking strategies for the NLE.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 6,
    name: 'Lisa Thompson',
    course: 'Exam Prep',
    rating: 5,
    text: 'Once dreamt of becoming a topnotcher. Rank One played a huge part in turning that dream into reality. The lecturers have great expertise in equipping us with the concepts and test-taking strategies for the NLE.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 7,
    name: 'James Wilson',
    course: 'Nursing Programs',
    rating: 5,
    text: 'Once dreamt of becoming a topnotcher. Rank One played a huge part in turning that dream into reality. The lecturers have great expertise in equipping us with the concepts and test-taking strategies for the NLE.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 8,
    name: 'Maria Garcia',
    course: 'Health Care',
    rating: 5,
    text: 'Once dreamt of becoming a topnotcher. Rank One played a huge part in turning that dream into reality. The lecturers have great expertise in equipping us with the concepts and test-taking strategies for the NLE.',
    avatar: 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 9,
    name: 'Robert Brown',
    course: 'Medical Basics',
    rating: 5,
    text: 'Once dreamt of becoming a topnotcher. Rank One played a huge part in turning that dream into reality. The lecturers have great expertise in equipping us with the concepts and test-taking strategies for the NLE.',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 10,
    name: 'Amanda Lee',
    course: 'Emotional Care',
    rating: 5,
    text: 'Once dreamt of becoming a topnotcher. Rank One played a huge part in turning that dream into reality. The lecturers have great expertise in equipping us with the concepts and test-taking strategies for the NLE.',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 11,
    name: 'Christopher Martinez',
    course: 'Professional Skills',
    rating: 5,
    text: 'Once dreamt of becoming a topnotcher. Rank One played a huge part in turning that dream into reality. The lecturers have great expertise in equipping us with the concepts and test-taking strategies for the NLE.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 12,
    name: 'Jessica Taylor',
    course: 'Exam Prep',
    rating: 5,
    text: 'Once dreamt of becoming a topnotcher. Rank One played a huge part in turning that dream into reality. The lecturers have great expertise in equipping us with the concepts and test-taking strategies for the NLE.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 13,
    name: 'Daniel Anderson',
    course: 'Nursing Programs',
    rating: 5,
    text: 'Once dreamt of becoming a topnotcher. Rank One played a huge part in turning that dream into reality. The lecturers have great expertise in equipping us with the concepts and test-taking strategies for the NLE.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 14,
    name: 'Nicole White',
    course: 'Health Care',
    rating: 5,
    text: 'Once dreamt of becoming a topnotcher. Rank One played a huge part in turning that dream into reality. The lecturers have great expertise in equipping us with the concepts and test-taking strategies for the NLE.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 15,
    name: 'Kevin Johnson',
    course: 'Medical Basics',
    rating: 5,
    text: 'Once dreamt of becoming a topnotcher. Rank One played a huge part in turning that dream into reality. The lecturers have great expertise in equipping us with the concepts and test-taking strategies for the NLE.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  }
]

const TestimonialAll = () => {
  const [selectedCourse, setSelectedCourse] = useState('All Courses')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    online_course_id: '',
    rating_point: 5,
    description: ''
  })

  // Get current user for testimonial submission
  const { user, isAuthenticated } = useAuthStatus()

  // Fetch testimonials and courses from API
  const { data: testimonialsResponse, isLoading: testimonialsLoading, isError: testimonialsError } = useGetTestimonials(currentPage)
  const { data: coursesData, isLoading: coursesLoading } = useGetCourses()

  // Submit testimonial mutation
  const submitTestimonialMutation = useSubmitTestimonial()

  // Transform API data with fallbacks
  const courses = useMemo(() => {
    if (coursesData && coursesData.length > 0) {
      return coursesData.map(course => ({
        id: course.id,
        title: course.title,
        category: course.category?.name || 'Uncategorized'
      }))
    }
    return FALLBACK_COURSES.map((course, index) => ({ id: index + 1, title: course, category: course }))
  }, [coursesData])

  const courseOptions = ['All Courses', ...courses.map(course => course.category)]

  const testimonials = testimonialsResponse?.testimonials || []
  const pagination = testimonialsResponse?.pagination || { currentPage: 1, lastPage: 1, total: 0 }

  const filteredTestimonials = selectedCourse === 'All Courses'
    ? testimonials
    : testimonials.filter(t => t.course?.title?.includes(selectedCourse) || t.course?.category?.includes(selectedCourse))

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isAuthenticated) {
      toast.error('Please sign in to submit a testimonial')
      return
    }

    if (!user?.id) {
      toast.error('User information not available')
      return
    }

    const testimonialData = {
      name: formData.name,
      description: formData.description,
      online_course_id: parseInt(formData.online_course_id),
      rating_point: formData.rating_point,
      user_id: user.id
    }

    try {
      await submitTestimonialMutation.mutateAsync(testimonialData)
      toast.success('Thank you for sharing your experience!')
      setIsModalOpen(false)
      setFormData({ name: '', online_course_id: '', rating_point: 5, description: '' })
    } catch (error) {
      toast.error(error.message || 'Failed to submit testimonial')
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore powerful success stories from real <span className="text-primary">RankReview</span> champions.
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Discover how our tailored preparation tools and expert-guided strategies have helped thousands of students succeed with confidence. These inspiring testimonials reveal how focused preparation and the right support from RankReview can turn dreams of professional success into reality.
          </p>
        </div>

        {/* Filter and Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full sm:w-48 border border-gray-200 rounded-lg px-3 py-2 text-sm shadow-sm"
          >
            {courseOptions.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>

          <Button
            onClick={() => {
              if (!isAuthenticated) {
                toast.error('Please sign in to submit a testimonial')
                return
              }
              setIsModalOpen(true)
            }}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg"
          >
            {isAuthenticated ? 'Submit Your Testimonial' : 'Sign In to Submit'}
          </Button>
        </div>

        {/* Loading State */}
        {testimonialsLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-gray-600">Loading testimonials...</span>
          </div>
        )}

        {/* Error State */}
        {testimonialsError && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Failed to load testimonials</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
          </div>
        )}

        {/* Testimonials Grid */}
        {!testimonialsLoading && !testimonialsError && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {testimonial.description}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                      alt={testimonial.user?.name || testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.user?.name || testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.course?.title || 'Course Student'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.lastPage > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                >
                  Previous
                </Button>

                <span className="text-sm text-gray-600 mx-4">
                  Page {pagination.currentPage} of {pagination.lastPage} ({pagination.total} total)
                </span>

                <Button
                  onClick={() => setCurrentPage(p => Math.min(pagination.lastPage, p + 1))}
                  disabled={currentPage === pagination.lastPage}
                  variant="outline"
                  size="sm"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md p-0">
          {/* Header */}
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold">Share Your Experience</DialogTitle>
              <DialogClose className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </DialogClose>
            </div>
          </DialogHeader>

          {/* Scrollable Content */}
          <div className="max-h-[70vh] overflow-y-auto p-6">

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder={user?.name || "Enter your name"}
                  value={formData.name || user?.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              {/* Course */}
              <div>
                <Label htmlFor="course">Course</Label>
                <select
                  value={formData.online_course_id}
                  onChange={(e) => setFormData({ ...formData, online_course_id: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm shadow-sm"
                  required
                >
                  <option value="">Select course</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.title}</option>
                  ))}
                </select>
                {coursesLoading && (
                  <p className="text-sm text-gray-500 mt-1">Loading courses...</p>
                )}
              </div>

              {/* Rating */}
              <div>
                <Label>Rating</Label>
                <div className="flex items-center gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating_point: i + 1 })}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${i < formData.rating_point ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review */}
              <div>
                <Label htmlFor="description">Your Experience</Label>
                <Textarea
                  id="description"
                  placeholder="Share your experience with the course..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1"
                  disabled={submitTestimonialMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gray-900 hover:bg-gray-800"
                  disabled={submitTestimonialMutation.isPending}
                >
                  {submitTestimonialMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Review'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default TestimonialAll