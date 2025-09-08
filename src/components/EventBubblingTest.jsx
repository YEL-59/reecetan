import React, { useState } from 'react'
import CourseCard from '@/components/course/CourseCard'
import CourseModal from '@/components/course/CourseModal'

const EventBubblingTest = () => {
    const [openCourse, setOpenCourse] = useState(null)
    const [clickLog, setClickLog] = useState([])

    // Demo course data
    const demoCourse = {
        id: 1,
        title: 'Event Bubbling Test Course',
        category: 'Web Development',
        rating: 4.8,
        students: 1234,
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop'
    }

    const logClick = (action) => {
        const timestamp = new Date().toLocaleTimeString()
        setClickLog(prev => [...prev, { action, timestamp }])
    }

    const handleCardOpen = (course) => {
        logClick('Course Details Modal Opened')
        setOpenCourse(course)
    }

    const handleEnroll = (course) => {
        logClick('Enroll Button Clicked (should NOT trigger details modal)')
    }

    const clearLog = () => {
        setClickLog([])
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        🐛 Event Bubbling Fix Test
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Test that clicking "Enroll Now" only opens the checkout modal and does NOT trigger the course details modal.
                    </p>
                </div>

                {/* Click Log */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Click Event Log</h2>
                        <button
                            onClick={clearLog}
                            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                        >
                            Clear Log
                        </button>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                        {clickLog.length === 0 ? (
                            <p className="text-gray-500 text-sm">No events logged yet. Try clicking the course card or enroll button.</p>
                        ) : (
                            clickLog.map((log, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                                    <span className={`font-medium ${log.action.includes('Details Modal') ? 'text-blue-600' : 'text-green-600'
                                        }`}>
                                        {log.action}
                                    </span>
                                    <span className="text-gray-500">{log.timestamp}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Test Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Test Instructions:</h3>
                    <div className="space-y-2 text-blue-800">
                        <p className="flex items-start gap-2">
                            <span className="font-bold">1.</span>
                            Click anywhere on the course card (NOT the Enroll button) - should open details modal
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="font-bold">2.</span>
                            Click the "Enroll Now" button - should ONLY open checkout modal (not details modal)
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="font-bold">3.</span>
                            Close the checkout modal - should NOT trigger the details modal
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="font-bold">4.</span>
                            Check the click log above to verify correct behavior
                        </p>
                    </div>
                </div>

                {/* Test Course Card */}
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-6 text-center">Test Course Card</h2>
                    <div className="max-w-sm mx-auto">
                        <CourseCard
                            course={demoCourse}
                            onOpen={handleCardOpen}
                            onEnroll={handleEnroll}
                            trigger="click"
                        />
                    </div>
                </div>

                {/* Expected vs Actual Behavior */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-red-900 mb-4">❌ Before Fix (Buggy Behavior):</h3>
                        <div className="space-y-2 text-red-800 text-sm">
                            <p>1. Click "Enroll Now" → Checkout modal opens</p>
                            <p>2. Close checkout modal → Details modal opens (BUG!)</p>
                            <p>3. Event bubbling causes unwanted modal opening</p>
                        </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-green-900 mb-4">✅ After Fix (Correct Behavior):</h3>
                        <div className="space-y-2 text-green-800 text-sm">
                            <p>1. Click "Enroll Now" → Only checkout modal opens</p>
                            <p>2. Close checkout modal → Nothing else happens</p>
                            <p>3. Event propagation properly prevented</p>
                        </div>
                    </div>
                </div>

                {/* Technical Details */}
                <div className="mt-8 bg-gray-100 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">🔧 Technical Fix Applied:</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                        <p>• Added <code className="bg-gray-200 px-1 rounded">e.stopPropagation()</code> to enroll button click handler</p>
                        <p>• Added <code className="bg-gray-200 px-1 rounded">e.preventDefault()</code> to prevent default behavior</p>
                        <p>• Updated modal close handlers to prevent event bubbling</p>
                        <p>• Added backdrop click handling with proper event checking</p>
                        <p>• Added <code className="bg-gray-200 px-1 rounded">onClick={(e) => e.stopPropagation()}</code> to modal content</p>
                    </div>
                </div>

                {/* Course Details Modal */}
                <CourseModal
                    course={openCourse}
                    open={!!openCourse}
                    onClose={() => {
                        logClick('Course Details Modal Closed')
                        setOpenCourse(null)
                    }}
                />
            </div>
        </div>
    )
}

export default EventBubblingTest
