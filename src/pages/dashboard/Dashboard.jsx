import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  GraduationCap,
  Play,
  Settings,
  BookOpen,
  PlayCircle
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getDashboard } from '@/lib/dashboardApi'

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboard,
  })

  const stats = data?.stats || { totalCourses: 0, inProgress: 0, inComplete: 0, certificates: 0 }

  const summaryCards = [
    { title: "Enroll Courses", value: isLoading ? '—' : String(stats.totalCourses), icon: GraduationCap, color: "text-blue-600" },
    { title: "In Progress", value: isLoading ? '—' : String(stats.inProgress), icon: Play, color: "text-blue-600" },
    { title: "Certificates", value: isLoading ? '—' : String(stats.certificates), icon: Settings, color: "text-blue-600" },
  ]

  const continueLearning = (data?.enrollments || []).map((e, idx) => ({
    id: `${e.course_id}-${idx}`,
    title: e.course_title,
    lessons: e.status === 'success' ? 'Completed' : 'In progress',
    nextTopic: `Enrolled: ${e.enrolled_at.split(' ')[0]}`,
    progress: e.status === 'success' ? 100 : 0,
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=80&h=80&fit=crop',
  }))

  const recentActivity = [
    {
      id: 1,
      activity: "Completed \"Infection Control Procedures\" lesson",
      time: "2 hours ago",
      color: "bg-green-500"
    },
    {
      id: 2,
      activity: "Scored 92% on Patient Care Quiz",
      time: "2 hours ago",
      color: "bg-blue-500"
    },
    {
      id: 3,
      activity: "Started \"Medication Administration\"",
      time: "2 hours ago",
      color: "bg-yellow-500"
    }
  ]

  return (
    <div className="space-y-6 px-5 py-5">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Hi {data?.user?.name || 'there'}, ready to advance your career? 🏥
        </h1>
        <p className="text-blue-100">
          Welcome to your dashboard.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryCards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.title} className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {card.title}
                    </p>
                    <p className={`text-3xl font-bold ${card.color}`}>
                      {card.value}
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

      {/* Continue Learning Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-bold text-gray-900">Continue Learning</h2>
        </div>
        <p className="text-sm text-gray-600">Pick up where you left off</p>

        <div className="space-y-4">
          {continueLearning.map((course) => (
            <Card key={course.id} className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Course Thumbnail */}
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Course Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      {course.lessons}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      {course.nextTopic}
                    </p>

                    {/* Progress Bar */}
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500 w-12">
                        {course.progress}%
                      </span>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <PlayCircle className="w-4 h-4" />
                    <span>Continue</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${activity.color}`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 leading-relaxed">
                    {activity.activity}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div> */}
    </div>
  )
}
