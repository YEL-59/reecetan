import React, { useState } from 'react'
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
    Video
} from 'lucide-react'

const CourseDetails = () => {
    const { courseId } = useParams()
    const [activeTab, setActiveTab] = useState('overview')

    // Mock course data - in real app, fetch based on courseId
    const course = {
        id: courseId,
        title: "Complete Medical Terminology Course",
        instructor: "Dr. Sarah Mitchell, RN",
        rating: 4.8,
        totalStudents: 1234,
        duration: "12 hours",
        lessons: 45,
        certificates: 2,
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Demo video
        description: "Master medical terminology with this comprehensive course designed for healthcare professionals.",
        whatYouLearn: [
            "Understand basic medical terminology",
            "Learn anatomical terms and body systems",
            "Master medical abbreviations and symbols",
            "Apply terminology in clinical settings"
        ],
        courseContent: [
            {
                section: "Introduction to Medical Terminology",
                lessons: 8,
                duration: "2h 30m"
            },
            {
                section: "Body Systems and Anatomy",
                lessons: 12,
                duration: "3h 45m"
            },
            {
                section: "Medical Procedures and Treatments",
                lessons: 10,
                duration: "2h 15m"
            }
        ],
        requirements: [
            "Basic understanding of healthcare",
            "High school diploma or equivalent",
            "Access to computer and internet"
        ]
    }

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
                            <iframe
                                src={course.videoUrl}
                                title={course.title}
                                className="w-full h-full"
                                allowFullScreen
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <Link to={`/dashboard/my-courses/${courseId}/outline`}>
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                                        <Play className="w-6 h-6 mr-2" />
                                        Start Learning
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>

                    {/* Course Title and Info */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                        <p className="text-lg text-gray-600 mb-4">{course.description}</p>

                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                                <span className="font-medium">{course.rating}</span>
                            </div>
                            <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                <span>{course.totalStudents} students</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center">
                                <BookOpen className="w-4 h-4 mr-1" />
                                <span>{course.lessons} lessons</span>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
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
                                {/* What You'll Learn */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>What you'll learn</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {course.whatYouLearn.map((item, index) => (
                                                <div key={index} className="flex items-start">
                                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Requirements */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Requirements</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {course.requirements.map((req, index) => (
                                                <li key={index} className="flex items-start">
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                    <span className="text-gray-700">{req}</span>
                                                </li>
                                            ))}
                                        </ul>
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
                                        {course.courseContent.map((section, index) => (
                                            <div key={index} className="border rounded-lg p-4">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-semibold text-gray-900">{section.section}</h3>
                                                    <span className="text-sm text-gray-500">
                                                        {section.lessons} lessons • {section.duration}
                                                    </span>
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
                                    <CardTitle>Instructor</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-start space-x-4">
                                        <img
                                            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
                                            alt={course.instructor}
                                            className="w-20 h-20 rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2">{course.instructor}</h3>
                                            <p className="text-gray-600 mb-2">Registered Nurse & Healthcare Educator</p>
                                            <p className="text-sm text-gray-500">
                                                Dr. Sarah Mitchell has over 15 years of experience in healthcare and medical education.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === 'reviews' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Student Reviews</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                                ))}
                                            </div>
                                            <span className="font-semibold">{course.rating}</span>
                                            <span className="text-gray-500">({course.totalStudents} reviews)</span>
                                        </div>
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
                                    <div className="text-3xl font-bold text-gray-900 mb-2">Free</div>
                                    <p className="text-sm text-gray-600">Full access to course content</p>
                                </div>

                                <Link to={`/dashboard/my-courses/${courseId}/outline`} className="block">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                        <Video className="w-4 h-4 mr-2" />
                                        Go to Course
                                    </Button>
                                </Link>

                                <div className="space-y-3 pt-4 border-t">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Lessons</span>
                                        <span className="font-medium">{course.lessons}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Duration</span>
                                        <span className="font-medium">{course.duration}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Certificates</span>
                                        <span className="font-medium">{course.certificates}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Access</span>
                                        <span className="font-medium">Lifetime</span>
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
