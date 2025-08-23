// Quiz Analytics Data
// This file centralizes all data used in the Quiz Analytics module

export const summaryStatsData = [
  {
    title: "Total Quizzes Taken",
    value: "5",
    subtitle: "Across all courses",
    icon: "FileText",
    color: "text-blue-600"
  },
  {
    title: "Pass Rate",
    value: "80%",
    subtitle: "Progress bar",
    icon: "TrendingUp",
    color: "text-green-600",
    progress: 80
  },
  {
    title: "Average Score",
    value: "82%",
    subtitle: "Excellent performance!",
    icon: "BarChart3",
    color: "text-purple-600"
  }
]

export const quizHistoryData = [
  {
    id: 1,
    title: "CNA Training - Ethics Quiz",
    status: "Passed",
    statusColor: "bg-green-100 text-green-700",
    details: "Best Score: 85% • Attempts: 2 • Time: 12 min",
    date: "2 days ago",
    score: 85,
    attempts: 2,
    timeSpent: "12 min"
  },
  {
    id: 2,
    title: "CNA Training - Vital Signs Quiz",
    status: "Passed",
    statusColor: "bg-green-100 text-green-700",
    details: "Best Score: 82% • Attempts: 1 • Time: 8 min",
    date: "1 week ago",
    score: 82,
    attempts: 1,
    timeSpent: "8 min"
  },
  {
    id: 3,
    title: "NCLEX Prep - Pharmacology",
    status: "Failed",
    statusColor: "bg-red-100 text-red-700",
    details: "Best Score: 62% • Attempts: 1 • Time: 8 min",
    date: "1 week ago",
    score: 62,
    attempts: 1,
    timeSpent: "8 min"
  }
]

export const subjectPerformanceData = [
  {
    id: 1,
    subject: "Patient Care",
    score: 85,
    status: "good",
    icon: "CheckCircle",
    color: "text-green-600"
  },
  {
    id: 2,
    subject: "Medical Terminology",
    score: 52,
    status: "good",
    icon: "CheckCircle",
    color: "text-green-600"
  },
  {
    id: 3,
    subject: "Pharmacology",
    score: 65,
    status: "needs-improvement",
    icon: "XCircle",
    color: "text-red-600"
  },
  {
    id: 4,
    subject: "Infection Control",
    score: 88,
    status: "good",
    icon: "CheckCircle",
    color: "text-green-600"
  }
]

// Helper functions for data processing
export const calculateOverallStats = () => {
  const totalQuizzes = quizHistoryData.length
  const passedQuizzes = quizHistoryData.filter(quiz => quiz.status === "Passed").length
  const passRate = Math.round((passedQuizzes / totalQuizzes) * 100)
  const averageScore = Math.round(
    quizHistoryData.reduce((sum, quiz) => sum + quiz.score, 0) / totalQuizzes
  )
  
  return {
    totalQuizzes,
    passRate,
    averageScore
  }
}

export const getSubjectsByPerformance = (threshold = 70) => {
  const goodPerformance = subjectPerformanceData.filter(subject => subject.score >= threshold)
  const needsImprovement = subjectPerformanceData.filter(subject => subject.score < threshold)
  
  return {
    goodPerformance,
    needsImprovement
  }
}

