import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  ChefHat, 
  Users, 
  TrendingUp, 
  BookOpen,
  BarChart3,
  Activity,
  Calendar,
  Star
} from 'lucide-react'

export default function Dashboard() {
  const stats = [
    {
      title: "Total Recipes",
      value: "1,234",
      change: "+12%",
      changeType: "positive",
      icon: ChefHat,
      description: "From last month"
    },
    {
      title: "Active Users",
      value: "5,678",
      change: "+8%",
      changeType: "positive",
      icon: Users,
      description: "From last month"
    },
    {
      title: "Recipe Views",
      value: "45,678",
      change: "+23%",
      changeType: "positive",
      icon: TrendingUp,
      description: "From last month"
    },
    {
      title: "Collections",
      value: "89",
      change: "+5%",
      changeType: "positive",
      icon: BookOpen,
      description: "From last month"
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: "recipe_created",
      title: "New recipe created",
      description: "Spicy Thai Basil Chicken",
      time: "2 hours ago",
      user: "Chef Sarah"
    },
    {
      id: 2,
      type: "user_registered",
      title: "New user registered",
      description: "john.doe@example.com",
      time: "4 hours ago",
      user: "System"
    },
    {
      id: 3,
      type: "recipe_shared",
      title: "Recipe shared",
      description: "Classic Margherita Pizza",
      time: "6 hours ago",
      user: "Chef Mike"
    },
    {
      id: 4,
      type: "collection_created",
      title: "New collection created",
      description: "Quick Weeknight Dinners",
      time: "1 day ago",
      user: "Chef Lisa"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your recipes today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change} {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts and Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              Recipe creation and user engagement over the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <div className="text-center space-y-2">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground">Chart component will be added here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates from your recipe community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{activity.user}</span>
                      <span>•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Create Recipe</CardTitle>
            <ChefHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Add a new recipe to your collection
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">View Analytics</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Check detailed performance metrics
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Manage Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              View and manage user accounts
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Review</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Review pending content submissions
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
