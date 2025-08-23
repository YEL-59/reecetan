import React, { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    ArrowLeft,
    Play,
    Pause,
    Volume2,
    Maximize,
    Settings,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    BookOpen,
    FileText
} from 'lucide-react'

const Lesson = () => {
    const { courseId, lessonId, topicId } = useParams()
    const videoRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1)
    const [showNotes, setShowNotes] = useState(true)

    // Mock lesson data
    const lesson = {
        id: lessonId,
        title: "Introduction to Healthcare",
        currentTopic: {
            id: topicId,
            title: "Healthcare System Overview",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "15:30",
            description: "Learn about the structure and organization of healthcare systems.",
            transcript: `
        Welcome to this comprehensive overview of healthcare systems. In this lesson, we'll explore the fundamental 
        structure and organization of modern healthcare delivery. Healthcare systems are complex networks of 
        organizations, people, and actions whose primary intent is to promote, restore, or maintain health.
        
        The healthcare system includes hospitals, clinics, nursing homes, rehabilitation centers, and various 
        healthcare professionals working together to provide patient care. Understanding this system is crucial 
        for anyone working in healthcare, especially nursing assistants who play a vital role in patient care.
        
        Key components we'll cover include:
        - Primary care providers and their roles
        - Specialized healthcare services
        - Emergency care systems
        - Long-term care facilities
        - Healthcare financing and insurance
        
        As a nursing assistant, you'll work within this system to provide direct patient care under the supervision 
        of registered nurses and other healthcare professionals. Your role is essential in ensuring patients receive 
        compassionate, quality care.
      `
        },
        topics: [
            { id: 1, title: "Healthcare System Overview", duration: "15 min", completed: true },
            { id: 2, title: "Role of Nursing Assistants", duration: "15 min", completed: false },
            { id: 3, title: "Professional Standards", duration: "15 min", completed: false }
        ],
        notes: [
            {
                time: "2:30",
                content: "Healthcare systems include hospitals, clinics, and various care facilities"
            },
            {
                time: "5:45",
                content: "Nursing assistants work under supervision of registered nurses"
            },
            {
                time: "8:20",
                content: "Primary care providers serve as first point of contact for patients"
            },
            {
                time: "12:15",
                content: "Quality care requires collaboration between all healthcare team members"
            }
        ]
    }

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime)
        }
    }

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration)
        }
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const handleSeek = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const percent = (e.clientX - rect.left) / rect.width
        const newTime = percent * duration
        if (videoRef.current) {
            videoRef.current.currentTime = newTime
            setCurrentTime(newTime)
        }
    }

    const getCurrentTopicIndex = () => {
        return lesson.topics.findIndex(topic => topic.id === parseInt(topicId))
    }

    const getNextTopic = () => {
        const currentIndex = getCurrentTopicIndex()
        return currentIndex < lesson.topics.length - 1 ? lesson.topics[currentIndex + 1] : null
    }

    const getPreviousTopic = () => {
        const currentIndex = getCurrentTopicIndex()
        return currentIndex > 0 ? lesson.topics[currentIndex - 1] : null
    }

    return (
        <div className="space-y-6 px-5 py-5">
            {/* Back Button */}
            <Link
                to={`/dashboard/my-courses/${courseId}/outline`}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course Outline
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Video Area */}
                <div className="lg:col-span-3 space-y-4">
                    {/* Video Player */}
                    <Card className="overflow-hidden">
                        <div className="relative aspect-video bg-black">
                            <iframe
                                ref={videoRef}
                                src={lesson.currentTopic.videoUrl}
                                title={lesson.currentTopic.title}
                                className="w-full h-full"
                                allowFullScreen
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedMetadata={handleLoadedMetadata}
                            />

                            {/* Custom Video Controls Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                <div className="space-y-2">
                                    {/* Progress Bar */}
                                    <div
                                        className="w-full h-2 bg-white/30 rounded-full cursor-pointer"
                                        onClick={handleSeek}
                                    >
                                        <div
                                            className="h-full bg-blue-500 rounded-full transition-all"
                                            style={{ width: `${(currentTime / duration) * 100}%` }}
                                        ></div>
                                    </div>

                                    {/* Controls */}
                                    <div className="flex items-center justify-between text-white">
                                        <div className="flex items-center space-x-4">
                                            <button onClick={handlePlayPause} className="hover:text-blue-400">
                                                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                                            </button>
                                            <div className="flex items-center space-x-2">
                                                <Volume2 className="w-5 h-5" />
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="1"
                                                    step="0.1"
                                                    value={volume}
                                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                                    className="w-20"
                                                />
                                            </div>
                                            <span className="text-sm">
                                                {formatTime(currentTime)} / {formatTime(duration)}
                                            </span>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <button className="hover:text-blue-400">
                                                <Settings className="w-5 h-5" />
                                            </button>
                                            <button className="hover:text-blue-400">
                                                <Maximize className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Lesson Info */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                        {lesson.currentTopic.title}
                                    </h1>
                                    <p className="text-gray-600">{lesson.currentTopic.description}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span className="text-sm text-gray-600">Mark as Complete</span>
                                </div>
                            </div>

                            {/* Navigation */}
                            <div className="flex items-center justify-between pt-4 border-t">
                                {getPreviousTopic() ? (
                                    <Link
                                        to={`/dashboard/my-courses/${courseId}/lesson/${lessonId}/topic/${getPreviousTopic().id}`}
                                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        <span>Previous: {getPreviousTopic().title}</span>
                                    </Link>
                                ) : (
                                    <div></div>
                                )}

                                {getNextTopic() ? (
                                    <Link
                                        to={`/dashboard/my-courses/${courseId}/lesson/${lessonId}/topic/${getNextTopic().id}`}
                                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                                    >
                                        <span>Next: {getNextTopic().title}</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </Link>
                                ) : (
                                    <Link
                                        to={`/dashboard/my-courses/${courseId}/quiz/${lessonId}`}
                                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                    >
                                        <span>Take Quiz</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </Link>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tabs for Notes and Transcript */}
                    <Card>
                        <CardHeader>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => setShowNotes(true)}
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${showNotes ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    <BookOpen className="w-4 h-4" />
                                    <span>Lesson Notes</span>
                                </button>
                                <button
                                    onClick={() => setShowNotes(false)}
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${!showNotes ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    <FileText className="w-4 h-4" />
                                    <span>Transcript</span>
                                </button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {showNotes ? (
                                <div className="space-y-4">
                                    {lesson.notes.map((note, index) => (
                                        <div key={index} className="flex space-x-4 p-3 bg-gray-50 rounded-lg">
                                            <div className="text-sm font-mono text-blue-600 flex-shrink-0">
                                                {note.time}
                                            </div>
                                            <div className="text-sm text-gray-700">{note.content}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="prose max-w-none">
                                    <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                        {lesson.currentTopic.transcript}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar - Lesson Topics */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-20">
                        <CardHeader>
                            <CardTitle className="text-lg">{lesson.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {lesson.topics.map((topic) => (
                                <Link
                                    key={topic.id}
                                    to={`/dashboard/my-courses/${courseId}/lesson/${lessonId}/topic/${topic.id}`}
                                    className={`block p-3 rounded-lg transition-colors ${topic.id === parseInt(topicId)
                                            ? 'bg-blue-100 border border-blue-300'
                                            : topic.completed
                                                ? 'bg-green-50 border border-green-200 hover:bg-green-100'
                                                : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            {topic.completed ? (
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                            ) : topic.id === parseInt(topicId) ? (
                                                <Play className="w-5 h-5 text-blue-500" />
                                            ) : (
                                                <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                                            )}
                                            <div>
                                                <div className="font-medium text-sm">{topic.title}</div>
                                                <div className="text-xs text-gray-500">{topic.duration}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}

                            {/* Quiz Link */}
                            <Link
                                to={`/dashboard/my-courses/${courseId}/quiz/${lessonId}`}
                                className="block p-3 rounded-lg bg-yellow-50 border border-yellow-200 hover:bg-yellow-100 transition-colors"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-5 h-5 border-2 border-yellow-400 rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                    </div>
                                    <div>
                                        <div className="font-medium text-sm text-yellow-800">Lesson Quiz</div>
                                        <div className="text-xs text-yellow-600">Test your knowledge</div>
                                    </div>
                                </div>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Lesson
