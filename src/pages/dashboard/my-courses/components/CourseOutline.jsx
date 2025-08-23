import React, { useState } from 'react'
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
    Award
} from 'lucide-react'

const CourseOutline = () => {
    const { courseId } = useParams()
    const [expandedLessons, setExpandedLessons] = useState({})

    const toggleLesson = (lessonId) => {
        setExpandedLessons(prev => ({
            ...prev,
            [lessonId]: !prev[lessonId]
        }))
    }

    // Mock course data
    const course = {
        id: courseId,
        title: "Complete Medical Terminology Course",
        totalLessons: 27,
        completedLessons: 12,
        progress: 45,
        lessons: [
            {
                id: 1,
                title: "Introduction to Healthcare",
                duration: "45 min",
                completed: true,
                locked: false,
                type: "lesson",
                topics: [
                    { id: 1, title: "Healthcare System Overview", duration: "15 min", completed: true },
                    { id: 2, title: "Role of Nursing Assistants", duration: "15 min", completed: true },
                    { id: 3, title: "Professional Standards", duration: "15 min", completed: true }
                ],
                quiz: {
                    id: 1,
                    title: "Healthcare Fundamentals Quiz",
                    questions: 10,
                    duration: "15 min",
                    completed: true,
                    score: 85
                }
            },
            {
                id: 2,
                title: "Patient Safety and Infection Control",
                duration: "60 min",
                completed: false,
                locked: false,
                type: "lesson",
                topics: [
                    { id: 4, title: "Infection Control Principles", duration: "20 min", completed: false },
                    { id: 5, title: "Hand Hygiene Protocols", duration: "20 min", completed: false },
                    { id: 6, title: "Personal Protective Equipment", duration: "20 min", completed: false }
                ],
                quiz: {
                    id: 2,
                    title: "Patient Safety Quiz",
                    questions: 15,
                    duration: "20 min",
                    completed: false,
                    score: null
                }
            },
            {
                id: 3,
                title: "Basic Patient Care",
                duration: "75 min",
                completed: false,
                locked: true,
                type: "lesson",
                topics: [
                    { id: 7, title: "Vital Signs Monitoring", duration: "25 min", completed: false },
                    { id: 8, title: "Patient Positioning", duration: "25 min", completed: false },
                    { id: 9, title: "Mobility Assistance", duration: "25 min", completed: false }
                ],
                quiz: {
                    id: 3,
                    title: "Patient Care Assessment",
                    questions: 20,
                    duration: "25 min",
                    completed: false,
                    score: null
                }
            }
        ]
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
                                {course.completedLessons} of {course.totalLessons} lessons completed
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
                                                <div className="text-xs text-gray-500">{lesson.duration}</div>
                                            </div>
                                        </div>
                                        <ChevronRight className={`w-4 h-4 transition-transform ${expandedLessons[lesson.id] ? 'rotate-90' : ''
                                            }`} />
                                    </button>

                                    {expandedLessons[lesson.id] && (
                                        <div className="ml-4 space-y-1">
                                            {lesson.topics.map((topic) => (
                                                <Link
                                                    key={topic.id}
                                                    to={`/dashboard/my-courses/${courseId}/lesson/${lesson.id}/topic/${topic.id}`}
                                                    className={`block p-2 rounded text-sm transition-colors ${topic.completed
                                                        ? 'bg-green-50 text-green-700 hover:bg-green-100'
                                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span>{topic.title}</span>
                                                        <span className="text-xs">{topic.duration}</span>
                                                    </div>
                                                </Link>
                                            ))}

                                            {/* Quiz Section */}
                                            <Link
                                                to={`/dashboard/my-courses/${courseId}/quiz/${lesson.quiz.id}`}
                                                className={`block p-2 rounded text-sm transition-colors ${lesson.quiz.completed
                                                    ? 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                                                    : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        <HelpCircle className="w-4 h-4" />
                                                        <span>{lesson.quiz.title}</span>
                                                    </div>
                                                    <div className="text-xs">
                                                        {lesson.quiz.completed ? `${lesson.quiz.score}%` : `${lesson.quiz.questions} questions`}
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3 space-y-6">
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
                                    <span>{course.progress}% Complete</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                                        style={{ width: `${course.progress}%` }}
                                    ></div>
                                </div>
                                <div className="text-sm text-gray-600">
                                    {course.completedLessons} of {course.totalLessons} lessons completed
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Professional Standards Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Award className="w-5 h-5 text-blue-600" />
                                <span>Professional Standards</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-blue-50 rounded-lg p-4 mb-4">
                                <h3 className="font-semibold text-blue-900 mb-2">
                                    Certified Nursing Assistant (CNA) Training Certification by Dr. Sarah Mitchell, RN
                                </h3>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    View Certificate
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white border rounded-lg p-4">
                                    <h4 className="font-medium text-gray-900 mb-2">Video Notes</h4>
                                    <p className="text-sm text-gray-600">
                                        Access comprehensive video notes and study materials to enhance your learning experience.
                                    </p>
                                </div>
                                <div className="bg-white border rounded-lg p-4">
                                    <h4 className="font-medium text-gray-900 mb-2">Resources</h4>
                                    <p className="text-sm text-gray-600">
                                        Download additional resources, practice materials, and reference guides.
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
