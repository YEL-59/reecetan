import React, { useState } from 'react'
import CourseCard from '@/components/course/CourseCard'
import CourseModal from '@/components/course/CourseModal'

const BlueScrollbarDemo = () => {
    const [openCourse, setOpenCourse] = useState(null)

    // Demo course data
    const demoCourse = {
        id: 1,
        title: 'Blue Scrollbar & Normal Mouse Wheel Demo',
        category: 'UI/UX Demo',
        rating: 4.9,
        students: 999,
        price: 99,
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop'
    }

    const handleCardOpen = (course) => {
        setOpenCourse(course)
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        🔵 Blue Scrollbar & Normal Mouse Wheel Demo
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Test the new blue scrollbar design and normal mouse wheel scrolling behavior in the course details modal.
                    </p>
                </div>

                {/* Features Showcase */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            🎨
                        </div>
                        <h3 className="text-lg font-semibold text-center mb-3">Blue Scrollbar Design</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p>• Beautiful blue scrollbar (#3B82F6)</p>
                            <p>• Darker blue on hover (#2563EB)</p>
                            <p>• Smooth transitions and animations</p>
                            <p>• Consistent across browsers</p>
                            <p>• 8px width for better visibility</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            🖱️
                        </div>
                        <h3 className="text-lg font-semibold text-center mb-3">Normal Mouse Wheel</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p>• Natural mouse wheel scrolling</p>
                            <p>• No smooth scroll interference</p>
                            <p>• Touch-friendly on mobile</p>
                            <p>• Proper overscroll behavior</p>
                            <p>• Responsive scroll speed</p>
                        </div>
                    </div>
                </div>

                {/* Scrollbar Color Palette */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h3 className="text-lg font-semibold mb-4">🎨 Scrollbar Color Palette</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-500 rounded-lg mx-auto mb-2"></div>
                            <p className="text-sm font-medium">Primary Blue</p>
                            <p className="text-xs text-gray-500">#3B82F6</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-lg mx-auto mb-2"></div>
                            <p className="text-sm font-medium">Hover Blue</p>
                            <p className="text-xs text-gray-500">#2563EB</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2"></div>
                            <p className="text-sm font-medium">Track Gray</p>
                            <p className="text-xs text-gray-500">#E5E7EB</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-2"></div>
                            <p className="text-sm font-medium">Background</p>
                            <p className="text-xs text-gray-500">#F3F4F6</p>
                        </div>
                    </div>
                </div>

                {/* Demo Course Card */}
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-6 text-center">Test the Blue Scrollbar Modal</h2>
                    <div className="max-w-sm mx-auto">
                        <CourseCard
                            course={demoCourse}
                            onOpen={handleCardOpen}
                            trigger="click"
                        />
                    </div>
                </div>

                {/* Instructions */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">🎯 Testing Instructions:</h3>
                    <div className="space-y-2 text-blue-800">
                        <p className="flex items-start gap-2">
                            <span className="font-bold">1.</span>
                            Click the course card above to open the modal
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="font-bold">2.</span>
                            Look for the beautiful blue scrollbar on the right side
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="font-bold">3.</span>
                            Use your mouse wheel to scroll - it should feel natural and responsive
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="font-bold">4.</span>
                            Hover over the scrollbar to see it change to a darker blue
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="font-bold">5.</span>
                            Try scrolling with different speeds - it should respond naturally
                        </p>
                    </div>
                </div>

                {/* Technical Details */}
                <div className="mt-8 bg-gray-100 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">⚙️ Technical Implementation:</h3>
                    <div className="space-y-3 text-sm">
                        <div className="bg-white p-3 rounded border-l-4 border-blue-500">
                            <p className="font-medium">CSS Classes:</p>
                            <code className="text-blue-600">scrollbar-blue modal-scroll-container</code>
                        </div>
                        <div className="bg-white p-3 rounded border-l-4 border-green-500">
                            <p className="font-medium">Scroll Behavior:</p>
                            <code className="text-green-600">scroll-behavior: auto; overscroll-behavior-y: contain;</code>
                        </div>
                        <div className="bg-white p-3 rounded border-l-4 border-purple-500">
                            <p className="font-medium">Touch Support:</p>
                            <code className="text-purple-600">-webkit-overflow-scrolling: touch;</code>
                        </div>
                    </div>
                </div>

                {/* Live Scrollbar Preview */}
                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4">📋 Live Scrollbar Preview</h3>
                    <div className="bg-gray-50 rounded-lg p-4 h-40 scrollbar-blue modal-scroll-container">
                        <div className="space-y-4">
                            {Array.from({ length: 20 }, (_, i) => (
                                <div key={i} className="p-3 bg-white rounded border">
                                    <p className="text-sm">Scrollable content item {i + 1}</p>
                                    <p className="text-xs text-gray-500">Use mouse wheel to scroll and see the blue scrollbar in action</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Course Details Modal */}
                <CourseModal
                    course={openCourse}
                    open={!!openCourse}
                    onClose={() => setOpenCourse(null)}
                />
            </div>
        </div>
    )
}

export default BlueScrollbarDemo
