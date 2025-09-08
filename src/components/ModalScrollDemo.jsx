import React, { useState } from 'react'
import CourseCard from '@/components/course/CourseCard'
import CourseModal from '@/components/course/CourseModal'

const ModalScrollDemo = () => {
    const [openCourse, setOpenCourse] = useState(null)

    // Demo course data with lots of content
    const demoCourse = {
        id: 1,
        title: 'Complete Medical Terminology Course - Improved Scrolling Demo',
        category: 'Health Care',
        rating: 4.8,
        students: 123,
        price: 50,
        image: 'https://images.unsplash.com/photo-1580281658208-2cf4e1b1d4b3?q=80&w=1200&auto=format&fit=crop',
        modules: [
            {
                title: 'Module 1: Introduction to Medical Terminology',
                duration: '2h 30m',
                lessons: [
                    { title: 'Course Introduction and Overview', duration: '15m' },
                    { title: 'Basic Medical Word Structure', duration: '20m' },
                    { title: 'Prefixes and Suffixes', duration: '25m' },
                    { title: 'Root Words and Combining Forms', duration: '30m' },
                    { title: 'Pronunciation Guidelines', duration: '20m' },
                    { title: 'Medical Dictionary Usage', duration: '15m' },
                    { title: 'Module 1 Quiz', duration: '15m' },
                ],
            },
            {
                title: 'Module 2: Body Systems Terminology',
                duration: '3h 45m',
                lessons: [
                    { title: 'Cardiovascular System', duration: '30m' },
                    { title: 'Respiratory System', duration: '25m' },
                    { title: 'Digestive System', duration: '35m' },
                    { title: 'Nervous System', duration: '40m' },
                    { title: 'Musculoskeletal System', duration: '30m' },
                    { title: 'Integumentary System', duration: '20m' },
                    { title: 'Endocrine System', duration: '25m' },
                    { title: 'Reproductive System', duration: '20m' },
                    { title: 'Module 2 Quiz', duration: '20m' },
                ],
            },
            {
                title: 'Module 3: Medical Procedures and Diagnostics',
                duration: '2h 15m',
                lessons: [
                    { title: 'Common Medical Procedures', duration: '25m' },
                    { title: 'Diagnostic Tests and Imaging', duration: '30m' },
                    { title: 'Laboratory Terminology', duration: '20m' },
                    { title: 'Surgical Terminology', duration: '25m' },
                    { title: 'Pharmacology Basics', duration: '30m' },
                    { title: 'Module 3 Quiz', duration: '15m' },
                ],
            },
            {
                title: 'Module 4: Pathology and Disease Terminology',
                duration: '2h 45m',
                lessons: [
                    { title: 'Disease Classifications', duration: '20m' },
                    { title: 'Signs and Symptoms', duration: '25m' },
                    { title: 'Infectious Diseases', duration: '30m' },
                    { title: 'Chronic Conditions', duration: '25m' },
                    { title: 'Cancer Terminology', duration: '20m' },
                    { title: 'Mental Health Terms', duration: '20m' },
                    { title: 'Module 4 Quiz', duration: '15m' },
                ],
            },
            {
                title: 'Module 5: Practice and Assessment',
                duration: '1h 30m',
                lessons: [
                    { title: 'Comprehensive Practice Exercises', duration: '30m' },
                    { title: 'Case Study Analysis', duration: '25m' },
                    { title: 'Final Assessment Preparation', duration: '20m' },
                    { title: 'Final Exam', duration: '45m' },
                ],
            },
        ]
    }

    const handleCardOpen = (course) => {
        setOpenCourse(course)
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        📜 Modal Scrolling Improvements Demo
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Test the improved modal scrolling behavior. The modal now has smooth, natural scrolling with a single, properly styled scrollbar.
                    </p>
                </div>

                {/* Before/After Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-red-900 mb-4">❌ Before (Issues):</h3>
                        <div className="space-y-2 text-red-800 text-sm">
                            <p>• Double scrollbars (outer container + inner content)</p>
                            <p>• Awkward scrolling behavior</p>
                            <p>• Poor visual hierarchy</p>
                            <p>• Inconsistent scroll styling</p>
                            <p>• Modal content not properly contained</p>
                        </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-green-900 mb-4">✅ After (Fixed):</h3>
                        <div className="space-y-2 text-green-800 text-sm">
                            <p>• Single, properly styled scrollbar</p>
                            <p>• Smooth, natural scrolling</p>
                            <p>• Fixed header, scrollable content</p>
                            <p>• Custom scrollbar design</p>
                            <p>• Proper modal height constraints</p>
                        </div>
                    </div>
                </div>

                {/* Technical Improvements */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">🔧 Technical Improvements:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800 text-sm">
                        <div>
                            <p className="font-medium mb-2">Structure Changes:</p>
                            <ul className="space-y-1 list-disc list-inside">
                                <li>Flexbox layout for proper height distribution</li>
                                <li>Fixed header with <code>flex-shrink-0</code></li>
                                <li>Scrollable body with <code>flex-1</code></li>
                                <li>Proper modal height constraint (90vh)</li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-medium mb-2">Scrolling Enhancements:</p>
                            <ul className="space-y-1 list-disc list-inside">
                                <li>Custom scrollbar styling</li>
                                <li>Smooth scroll behavior</li>
                                <li>Touch-friendly scrolling</li>
                                <li>Hover effects on scrollbar</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Demo Course Card */}
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-6 text-center">Test the Improved Modal</h2>
                    <div className="max-w-sm mx-auto">
                        <CourseCard
                            course={demoCourse}
                            onOpen={handleCardOpen}
                            trigger="click"
                        />
                    </div>
                </div>

                {/* Instructions */}
                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4">🎯 How to Test:</h3>
                    <div className="space-y-2 text-gray-700">
                        <p className="flex items-start gap-2">
                            <span className="font-bold">1.</span>
                            Click the course card above to open the modal
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="font-bold">2.</span>
                            Notice the clean, single scrollbar on the right side
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="font-bold">3.</span>
                            Scroll through the content - it should feel smooth and natural
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="font-bold">4.</span>
                            The header stays fixed while content scrolls
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="font-bold">5.</span>
                            Hover over the scrollbar to see the subtle hover effect
                        </p>
                    </div>
                </div>

                {/* CSS Classes Used */}
                <div className="mt-8 bg-gray-100 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">📝 CSS Classes Applied:</h3>
                    <div className="space-y-2 text-sm font-mono bg-white p-4 rounded border">
                        <p><span className="text-blue-600">flex flex-col</span> - Flexbox layout for modal</p>
                        <p><span className="text-blue-600">flex-shrink-0</span> - Prevent header from shrinking</p>
                        <p><span className="text-blue-600">flex-1 overflow-y-auto</span> - Expandable scrollable body</p>
                        <p><span className="text-blue-600">scrollbar-thin</span> - Custom thin scrollbar</p>
                        <p><span className="text-blue-600">modal-smooth-scroll</span> - Smooth scrolling behavior</p>
                        <p><span className="text-blue-600">max-h-[90vh]</span> - Constrain modal height</p>
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

export default ModalScrollDemo
