import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GraduationCap, Play, Award, Star } from 'lucide-react'

const MyCourses = () => {
    const stats = [
        {
            title: "Total Courses",
            value: "04",
            icon: GraduationCap,
            color: "text-blue-600"
        },
        {
            title: "In Progress",
            value: "02",
            icon: Play,
            color: "text-blue-600"
        },
        {
            title: "Completed",
            value: "02",
            icon: Award,
            color: "text-blue-600"
        }
    ]

    const courses = [
        {
            id: 1,
            title: "Certified Nursing Assistant (CNA) Training",
            instructor: "By Dr. Sarah Mitchell, RN",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
            lastAccessed: "2 hours ago",
            status: "continue",
            progress: 65
        },
        {
            id: 2,
            title: "Medical Terminology & Documentation",
            instructor: "By Dr. Sarah Mitchell, RN",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop",
            lastAccessed: "2 hours ago",
            status: "continue",
            progress: 45
        },
        {
            id: 3,
            title: "Patient Care & Safety Protocols",
            instructor: "By Dr. Sarah Mitchell, RN",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=200&fit=crop",
            lastAccessed: "7 hours ago",
            status: "start",
            progress: 0
        }
    ]

    return (
        <div className="space-y-6 px-5 py-5">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white">
                <h1 className="text-2xl font-bold mb-2">My Courses</h1>
                <p className="text-blue-100">
                    You're making excellent progress in your healthcare training!
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <Card key={stat.title} className="shadow-sm">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 mb-1">
                                            {stat.title}
                                        </p>
                                        <p className={`text-3xl font-bold ${stat.color}`}>
                                            {stat.value}
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Icon className="w-6 h-6 text-gray-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <Card key={course.id} className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <Link to={`/dashboard/my-courses/${course.id}`}>
                            <div className="relative">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <div className="absolute top-3 left-3">
                                    <div className="flex items-center space-x-1 bg-white px-2 py-1 rounded-full">
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        <span className="text-sm font-medium">{course.rating}</span>
                                    </div>
                                </div>
                            </div>

                            <CardContent className="p-4">
                                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                    {course.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    {course.instructor}
                                </p>

                                {course.progress > 0 && (
                                    <div className="mb-3">
                                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                                            <span>Progress</span>
                                            <span>{course.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${course.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">
                                        Last accessed: {course.lastAccessed}
                                    </span>
                                    <Button
                                        size="sm"
                                        className={`${course.status === 'continue'
                                            ? 'bg-blue-600 hover:bg-blue-700'
                                            : 'bg-green-600 hover:bg-green-700'
                                            } text-white`}
                                    >
                                        {course.status === 'continue' ? 'Continue' : 'Start Course'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Link>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default MyCourses