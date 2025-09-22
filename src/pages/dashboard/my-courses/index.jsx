import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GraduationCap, Play, Award, Star, Loader2 } from 'lucide-react'
import { getMyEnrolledCourses, formatEnrolledCourse } from '@/lib/myCoursesApi'
import toast from 'react-hot-toast'

const MyCourses = () => {
    const [coursesData, setCoursesData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch enrolled courses on component mount
    useEffect(() => {
        const fetchMyCourses = async () => {
            setIsLoading(true)
            setError(null)

            try {
                const result = await getMyEnrolledCourses()

                if (result.success) {
                    setCoursesData(result.data)
                } else {
                    setError(result.message)
                    toast.error(result.message)
                }
            } catch (err) {
                console.error('Failed to fetch courses:', err)
                setError('Failed to load your courses')
                toast.error('Failed to load your courses')
            } finally {
                setIsLoading(false)
            }
        }

        fetchMyCourses()
    }, [])

    // Format stats from API data
    const stats = coursesData ? [
        {
            title: "Total Courses",
            value: coursesData.totalCourses.toString().padStart(2, '0'),
            icon: GraduationCap,
            color: "text-blue-600"
        },
        {
            title: "In Progress",
            value: coursesData.inProgressCount.toString().padStart(2, '0'),
            icon: Play,
            color: "text-blue-600"
        },
        {
            title: "Completed",
            value: coursesData.completedCount.toString().padStart(2, '0'),
            icon: Award,
            color: "text-blue-600"
        }
    ] : []

    // Format courses from API data
    const courses = coursesData?.inProgressCourses?.data ?
        coursesData.inProgressCourses.data.map(formatEnrolledCourse) : []

    // Loading state
    if (isLoading) {
        return (
            <div className="space-y-6 px-5 py-5">
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">My Courses</h1>
                    <p className="text-blue-100">
                        Loading your courses...
                    </p>
                </div>
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">Loading your enrolled courses...</span>
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="space-y-6 px-5 py-5">
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">My Courses</h1>
                    <p className="text-blue-100">
                        Unable to load your courses
                    </p>
                </div>
                <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">{error}</p>
                    <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
                        Try Again
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 px-5 py-5">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white">
                <h1 className="text-2xl font-bold mb-2">My Courses</h1>
                <p className="text-blue-100">
                    {courses.length > 0
                        ? "You're making excellent progress in your training!"
                        : "Start your learning journey by enrolling in courses!"}
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
            {courses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <Card key={course.enrollmentId} className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                            <Link to={`/dashboard/my-courses/${course.id}`}>
                                <div className="relative">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-48 object-cover rounded-t-lg"
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop'
                                        }}
                                    />
                                    <div className="absolute top-3 left-3">
                                        <div className="flex items-center space-x-1 bg-white px-2 py-1 rounded-full">
                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            <span className="text-sm font-medium">{course.rating}</span>
                                        </div>
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${course.courseType === 'free'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {course.courseType === 'free' ? 'Free' : 'Paid'}
                                        </div>
                                    </div>
                                </div>

                                <CardContent className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                        {course.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-2">
                                        {course.level} • {course.duration} • {course.language}
                                    </p>
                                    <p className="text-xs text-gray-500 mb-3">
                                        Enrolled: {new Date(course.enrolledAt).toLocaleDateString()}
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
                                            className={`${course.status === 'pending' || course.progress === 0
                                                ? 'bg-green-600 hover:bg-green-700'
                                                : 'bg-blue-600 hover:bg-blue-700'
                                                } text-white`}
                                        >
                                            {course.status === 'pending' || course.progress === 0 ? 'Start Course' : 'Continue'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Link>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <GraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No courses enrolled yet</h3>
                    <p className="text-gray-600 mb-6">Start your learning journey by browsing our available courses</p>
                    <Link to="/courses">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            Browse Courses
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default MyCourses