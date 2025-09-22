import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    ArrowLeft,
    Play,
    Clock,
    Users,
    Award,
    Star,
    CheckCircle,
    BookOpen,
    Video,
    Loader2
} from 'lucide-react'
import { getCourseDetails, formatCourseDetails } from '@/lib/myCoursesApi'
import toast from 'react-hot-toast'

const CourseDetails = () => {
    const { courseId } = useParams()
    const [activeTab, setActiveTab] = useState('overview')
    const [course, setCourse] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch course details on component mount
    useEffect(() => {
        const fetchCourseDetails = async () => {
            if (!courseId) return

            setIsLoading(true)
            setError(null)

            try {
                const result = await getCourseDetails(courseId)

                if (result.success) {
                    const formattedCourse = formatCourseDetails(result.data)
                    setCourse(formattedCourse)
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
    }, [courseId])

    // Loading state
    if (isLoading) {
        return (
            <div className="space-y-6 px-5 py-5">
                <Link
                    to="/dashboard/my-courses"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to My Courses
                </Link>
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">Loading course details...</span>
                </div>
            </div>
        )
    }

    // Error state
    if (error || !course) {
        return (
            <div className="space-y-6 px-5 py-5">
                <Link
                    to="/dashboard/my-courses"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to My Courses
                </Link>
                <div className="text-center py-20">
                    <p className="text-gray-600 mb-4">{error || 'Course not found'}</p>
                    <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
                        Try Again
                    </Button>
                </div>
            </div>
        )
    }

    // Get current video URL from current part or first part
    const getCurrentVideoUrl = () => {
        if (course.currentPart?.video) {
            return course.currentPart.video
        }
        // Fallback to first part of first lesson
        if (course.lessons.length > 0 && course.lessons[0].parts.length > 0) {
            return course.lessons[0].parts[0].video
        }
        return null
    }

    const videoUrl = getCurrentVideoUrl()

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'curriculum', label: 'Curriculum' },
        { id: 'instructor', label: 'Instructor' },
        { id: 'reviews', label: 'Reviews' }
    ]

    return (
        <div className="space-y-6 px-5 py-5">
            {/* Back Button */}
            <Link
                to="/dashboard/my-courses"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to My Courses
            </Link>

            {/* Course Header */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Course Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Video Player */}
                    <Card className="overflow-hidden">
                        <div className="relative aspect-video bg-gray-900">
                            {videoUrl ? (
                                <iframe
                                    src={videoUrl}
                                    title={course.title}
                                    className="w-full h-full"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                        <p>No video available</p>
                                    </div>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <Link to={`/dashboard/my-courses/${courseId}/outline`}>
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                                        <Play className="w-6 h-6 mr-2" />
                                        {course.progressPercentage > 0 ? 'Continue Learning' : 'Start Learning'}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>

                    {/* Course Title and Info */}
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                        <p className="text-base md:text-lg text-gray-600 mb-4">{course.description}</p>

                        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-600">
                            <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                                <span className="font-medium">4.5</span>
                            </div>
                            <div className="flex items-center">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${course.courseType === 'free'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-blue-100 text-blue-800'
                                    }`}>
                                    {course.courseType === 'free' ? 'Free Course' : 'Paid Course'}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center">
                                <BookOpen className="w-4 h-4 mr-1" />
                                <span>{course.totalLessons} lessons</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-xs">{course.level} • {course.language}</span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        {course.progressPercentage > 0 && (
                            <div className="mt-4">
                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                    <span>Course Progress</span>
                                    <span>{course.progressPercentage}% Complete</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${course.progressPercentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex flex-wrap gap-4 md:space-x-8">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="space-y-6">
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                {/* Course Description */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>About this course</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-700 leading-relaxed">{course.description}</p>
                                    </CardContent>
                                </Card>

                                {/* Course Stats */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Course Details</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-blue-600">{course.totalLessons}</div>
                                                <div className="text-sm text-gray-600">Lessons</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-blue-600">{course.totalParts}</div>
                                                <div className="text-sm text-gray-600">Parts</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-blue-600">{course.completedParts}</div>
                                                <div className="text-sm text-gray-600">Completed</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-blue-600">{course.progressPercentage}%</div>
                                                <div className="text-sm text-gray-600">Progress</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {activeTab === 'curriculum' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Course Content</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {course.lessons.map((lesson, index) => (
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
                                                        <div key={part.id} className="flex items-center text-sm text-gray-600">
                                                            <Video className="w-4 h-4 mr-2" />
                                                            <span>{part.title}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === 'instructor' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Course Creator</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {course.instructor ? (
                                        <div className="flex items-start space-x-4">
                                            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                                                <span className="text-2xl font-bold text-blue-600">
                                                    {course.instructor.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-2">{course.instructor.name}</h3>
                                                <p className="text-gray-600 mb-2">{course.instructor.email}</p>
                                                <div className="flex items-center text-sm">
                                                    {course.instructor.isVerified ? (
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            <CheckCircle className="w-3 h-3 mr-1" />
                                                            Verified Creator
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-500">Course Creator</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500">No instructor information available</p>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === 'reviews' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Course Reviews</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-8">
                                        <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500">No reviews available yet</p>
                                        <p className="text-sm text-gray-400 mt-2">Be the first to review this course!</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Right Column - Course Card */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-20">
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-gray-900 mb-2">
                                        {course.courseType === 'free' ? 'Free' : `$${course.price}`}
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        {course.courseType === 'free' ? 'Full access to course content' : 'One-time payment'}
                                    </p>
                                </div>

                                <Link to={`/dashboard/my-courses/${courseId}/outline`} className="block">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                        <Video className="w-4 h-4 mr-2" />
                                        {course.progressPercentage > 0 ? 'Continue Course' : 'Start Course'}
                                    </Button>
                                </Link>

                                <div className="space-y-3 pt-4 border-t">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Lessons</span>
                                        <span className="font-medium">{course.totalLessons}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Parts</span>
                                        <span className="font-medium">{course.totalParts}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Duration</span>
                                        <span className="font-medium">{course.duration}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Level</span>
                                        <span className="font-medium">{course.level}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Language</span>
                                        <span className="font-medium">{course.language}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Progress</span>
                                        <span className="font-medium">{course.progressPercentage}%</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default CourseDetails
