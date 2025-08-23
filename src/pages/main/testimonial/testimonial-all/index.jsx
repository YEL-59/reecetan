import React, { useState } from 'react'
import { Star, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const COURSES = [
  'All Courses',
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
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    rating: 5,
    review: ''
  })

  const filteredTestimonials = selectedCourse === 'All Courses' 
    ? TESTIMONIALS 
    : TESTIMONIALS.filter(t => t.course === selectedCourse)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Testimonial submitted:', formData)
    setIsModalOpen(false)
    setFormData({ name: '', course: '', rating: 5, review: '' })
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
          <Select 
            value={selectedCourse} 
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full sm:w-48"
          >
            {COURSES.map(course => (
              <SelectItem key={course} value={course}>{course}</SelectItem>
            ))}
          </Select>
          
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg"
          >
            Submit Your Testimonial
          </Button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-gray-700 mb-4 leading-relaxed">
                {testimonial.text}
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.course}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <h2 className="text-xl font-bold mb-6">Share Your Experience</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              {/* Course */}
              <div>
                <Label htmlFor="course">Course</Label>
                <Select 
                  value={formData.course} 
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                  required
                >
                  <SelectItem value="">Select course</SelectItem>
                  {COURSES.slice(1).map(course => (
                    <SelectItem key={course} value={course}>{course}</SelectItem>
                  ))}
                </Select>
              </div>

              {/* Rating */}
              <div>
                <Label>Rating</Label>
                <div className="flex items-center gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormData({...formData, rating: i + 1})}
                      className="p-1"
                    >
                      <Star 
                        className={`w-6 h-6 ${i < formData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review */}
              <div>
                <Label htmlFor="review">Your Review</Label>
                <Textarea
                  id="review"
                  placeholder="Share your experience with the course..."
                  value={formData.review}
                  onChange={(e) => setFormData({...formData, review: e.target.value})}
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
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-gray-900 hover:bg-gray-800">
                  Submit Review
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default TestimonialAll