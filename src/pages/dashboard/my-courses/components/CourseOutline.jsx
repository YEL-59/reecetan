import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    ArrowLeft,
    Play,
    Clock,
    CheckCircle,
    Lock,
    FileText,
    HelpCircle,
    ChevronRight,
    Award,
    Loader2,
    Video
} from 'lucide-react'
import { getCourseOutline, formatCourseOutline } from '@/lib/myCoursesApi'
import toast from 'react-hot-toast'

const CourseOutline = () => {
    const { courseId } = useParams()
    const [expandedLessons, setExpandedLessons] = useState({})
    const [course, setCourse] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedPart, setSelectedPart] = useState(null)

    const toggleLesson = (lessonId) => {
        setExpandedLessons(prev => ({
            ...prev,
            [lessonId]: !prev[lessonId]
        }))
    }

    // Fetch course outline on component mount
    useEffect(() => {
        const fetchCourseOutline = async () => {
            if (!courseId) return

            setIsLoading(true)
            setError(null)

            try {
                const result = await getCourseOutline(courseId)

                if (result.success) {
                    const formattedCourse = formatCourseOutline(result.data)
                    setCourse(formattedCourse)

                    // Auto-expand first lesson and select first part
                    if (formattedCourse.lessons.length > 0) {
                        setExpandedLessons({ [formattedCourse.lessons[0].id]: true })
                        if (formattedCourse.lessons[0].parts.length > 0) {
                            setSelectedPart(formattedCourse.lessons[0].parts[0])
                        }
                    }
                } else {
                    setError(result.message)
                    toast.error(result.message)
                }
            } catch (err) {
                console.error('Failed to fetch course outline:', err)
                setError('Failed to load course outline')
                toast.error('Failed to load course outline')
            } finally {
                setIsLoading(false)
            }
        }

        fetchCourseOutline()
    }, [courseId])

    const handlePartSelect = (part) => {
        setSelectedPart(part)
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="space-y-6 px-5 py-5">
                <Link
                    to={`/dashboard/my-courses/${courseId}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Course Details
                </Link>
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">Loading course outline...</span>
                </div>
            </div>
        )
    }

    // Error state
    if (error || !course) {
        return (
            <div className="space-y-6 px-5 py-5">
                <Link
                    to={`/dashboard/my-courses/${courseId}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Course Details
                </Link>
                <div className="text-center py-20">
                    <p className="text-gray-600 mb-4">{error || 'Course outline not found'}</p>
                    <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
                        Try Again
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 px-5 py-5">
            {/* Back Button */}
            <Link
                to={`/dashboard/my-courses/${courseId}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course Details
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
                {/* Left Sidebar - Course Content */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-20">
                        <CardHeader>
                            <CardTitle className="text-lg">Course Content</CardTitle>
                            <div className="text-sm text-gray-600">
                                {course.completedParts} of {course.totalParts} parts completed
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {course.lessons.map((lesson) => (
                                <div key={lesson.id} className="space-y-2">
                                    <button
                                        onClick={() => toggleLesson(lesson.id)}
                                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${lesson.completed
                                            ? 'bg-green-50 border border-green-200'
                                            : lesson.locked
                                                ? 'bg-gray-50 border border-gray-200 cursor-not-allowed'
                                                : 'bg-blue-50 border border-blue-200 hover:bg-blue-100'
                                            }`}
                                        disabled={lesson.locked}
                                    >
                                        <div className="flex items-center space-x-3">
                                            {lesson.completed ? (
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                            ) : lesson.locked ? (
                                                <Lock className="w-5 h-5 text-gray-400" />
                                            ) : (
                                                <Play className="w-5 h-5 text-blue-500" />
                                            )}
                                            <div>
                                                <div className="font-medium text-sm">{lesson.title}</div>
                                                <div className="text-xs text-gray-500">{lesson.parts.length} part{lesson.parts.length !== 1 ? 's' : ''}</div>
                                            </div>
                                        </div>
                                        <ChevronRight className={`w-4 h-4 transition-transform ${expandedLessons[lesson.id] ? 'rotate-90' : ''
                                            }`} />
                                    </button>

                                    {expandedLessons[lesson.id] && (
                                        <div className="ml-4 space-y-1">
                                            {lesson.parts.map((part) => (
                                                <button
                                                    key={part.id}
                                                    onClick={() => handlePartSelect(part)}
                                                    className={`w-full block p-2 rounded text-sm transition-colors text-left ${selectedPart?.id === part.id
                                                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                                        : part.completed
                                                            ? 'bg-green-50 text-green-700 hover:bg-green-100'
                                                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-2">
                                                            <Video className="w-4 h-4" />
                                                            <span>{part.title}</span>
                                                        </div>
                                                        <span className="text-xs">{part.duration}</span>
                                                    </div>
                                                </button>
                                            ))}

                                            {/* Quiz Sections */}
                                            {lesson.parts.map((part) =>
                                                part.quiz && (
                                                    <div
                                                        key={`quiz-${part.quiz.id}`}
                                                        className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100 p-2 rounded text-sm transition-colors cursor-pointer"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center space-x-2">
                                                                <HelpCircle className="w-4 h-4" />
                                                                <span>{part.quiz.title}</span>
                                                            </div>
                                                            <div className="text-xs">
                                                                {part.quiz.completed ? `${part.quiz.score}%` : `${part.quiz.totalQuestions} questions`}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Video Player */}
                    {selectedPart && (
                        <Card>
                            <CardContent className="p-0">
                                <div className="relative aspect-video bg-gray-900 rounded-t-lg overflow-hidden">
                                    {selectedPart.video ? (
                                        <iframe
                                            src={selectedPart.video}
                                            title={selectedPart.title}
                                            className="w-full h-full"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div className="text-center text-white">
                                                <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                                <p>No video available for this part</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedPart.title}</h2>
                                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                                        <span className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1" />
                                            {selectedPart.duration}
                                        </span>
                                        {selectedPart.quiz && (
                                            <span className="flex items-center">
                                                <HelpCircle className="w-4 h-4 mr-1" />
                                                Quiz: {selectedPart.quiz.totalQuestions} questions
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Course Header */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                                <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
                                <div className="flex items-center space-x-2">
                                    <Award className="w-5 h-5 text-yellow-500" />
                                    <span className="text-sm text-gray-600">Certificate Available</span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Course Progress</span>
                                    <span>{course.progressPercentage}% Complete</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                                        style={{ width: `${course.progressPercentage}%` }}
                                    ></div>
                                </div>
                                <div className="text-sm text-gray-600">
                                    {course.completedParts} of {course.totalParts} parts completed
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quiz Section */}
                    {selectedPart?.quiz && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <HelpCircle className="w-5 h-5 text-purple-600" />
                                    <span>{selectedPart.quiz.title}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-purple-50 rounded-lg p-4 mb-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-semibold text-purple-900">
                                            Quiz: {selectedPart.quiz.title}
                                        </h3>
                                        <span className="text-sm text-purple-700 bg-purple-100 px-2 py-1 rounded">
                                            {selectedPart.quiz.totalQuestions} Questions
                                        </span>
                                    </div>
                                    <p className="text-sm text-purple-800 mb-3">
                                        Test your knowledge on this part before moving forward.
                                    </p>
                                    <Link to={`/dashboard/my-courses/${courseId}/quiz/${selectedPart.quiz.id}`}>
                                        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                                            {selectedPart.quiz.completed ? 'Retake Quiz' : 'Start Quiz'}
                                        </Button>
                                    </Link>
                                </div>

                                {/* Quiz Questions Preview */}
                                <div className="space-y-3">
                                    <h4 className="font-medium text-gray-900 mb-3">Quiz Preview</h4>
                                    {selectedPart.quiz.questions.slice(0, 1).map((question, index) => (
                                        <div key={question.id} className="border rounded-lg p-4">
                                            <h5 className="font-medium text-gray-900 mb-3">
                                                Question {index + 1}: {question.questionText}
                                            </h5>
                                            <div className="space-y-2">
                                                {question.options.map((option) => (
                                                    <div key={option.id} className="flex items-center space-x-2">
                                                        <div className="w-4 h-4 border border-gray-300 rounded-full"></div>
                                                        <span className="text-sm text-gray-700">{option.text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                    {selectedPart.quiz.questions.length > 1 && (
                                        <p className="text-sm text-gray-500 text-center">
                                            ...and {selectedPart.quiz.questions.length - 1} more question{selectedPart.quiz.questions.length > 2 ? 's' : ''}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Course Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Award className="w-5 h-5 text-blue-600" />
                                <span>Course Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-blue-50 rounded-lg p-4 mb-4">
                                <h3 className="font-semibold text-blue-900 mb-2">
                                    {course.title}
                                </h3>
                                <p className="text-sm text-blue-800 mb-3">
                                    Complete all parts and quizzes to earn your certificate.
                                </p>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    View Course Details
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white border rounded-lg p-4">
                                    <h4 className="font-medium text-gray-900 mb-2">Progress</h4>
                                    <p className="text-sm text-gray-600">
                                        {course.completedParts} of {course.totalParts} parts completed ({course.progressPercentage}%)
                                    </p>
                                </div>
                                <div className="bg-white border rounded-lg p-4">
                                    <h4 className="font-medium text-gray-900 mb-2">Lessons</h4>
                                    <p className="text-sm text-gray-600">
                                        {course.lessons.length} lesson{course.lessons.length !== 1 ? 's' : ''} available
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Video Notes Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Video Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="prose max-w-none">
                                <p className="text-gray-700 mb-4">
                                    This comprehensive course covers essential medical terminology used in healthcare settings.
                                    Students will learn to identify, define, and memorize professional terminology. The objectives
                                    are to develop skills in medical vocabulary and terminology professional standards.
                                </p>
                                <p className="text-gray-700">
                                    Upon completion of this course, students will be able to demonstrate competency in healthcare
                                    professional legal and ethical requirements for all healthcare workers.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default CourseOutline
