import React from 'react'
import CourseCard from '@/components/course/CourseCard'

const DirectCheckoutDemo = () => {
    // Demo course data
    const demoCourse = {
        id: 1,
        title: 'Complete Web Development Course',
        category: 'Web Development',
        rating: 4.8,
        students: 1234,
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop'
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        🚀 Direct Checkout System Demo
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Experience the new streamlined checkout process! Click "Enroll Now" to see the order summary modal,
                        then click "Payment Now" to proceed to the checkout page.
                    </p>
                </div>

                {/* Demo Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            🛒
                        </div>
                        <h3 className="font-semibold mb-2">Cart System Hidden</h3>
                        <p className="text-sm text-gray-600">
                            Cart functionality is completely hidden from the UI while preserving the code
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            📋
                        </div>
                        <h3 className="font-semibold mb-2">Order Summary Modal</h3>
                        <p className="text-sm text-gray-600">
                            Beautiful modal with promo code support and order breakdown
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            💳
                        </div>
                        <h3 className="font-semibold mb-2">Direct Checkout</h3>
                        <p className="text-sm text-gray-600">
                            Streamlined payment flow with secure checkout page
                        </p>
                    </div>
                </div>

                {/* Demo Course Card */}
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-6 text-center">Try the Demo Course</h2>
                    <div className="max-w-sm mx-auto">
                        <CourseCard
                            course={demoCourse}
                            trigger="click"
                        />
                    </div>
                </div>

                {/* Instructions */}
                <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">How to Test:</h3>
                    <div className="space-y-2 text-blue-800">
                        <p className="flex items-start gap-2">
                            <span className="font-bold">1.</span>
                            Click the "Enroll Now" button on the course card above
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="font-bold">2.</span>
                            The Order Summary modal will appear with course details
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="font-bold">3.</span>
                            Try demo promo codes: SAVE20, DISCOUNT10, STUDENT50, WELCOME25
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="font-bold">4.</span>
                            Click "Payment Now" to proceed to the checkout page
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="font-bold">5.</span>
                            Fill out the checkout form and click "Complete Payment"
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="font-bold">6.</span>
                            See the success page and automatic redirect to dashboard
                        </p>
                    </div>
                </div>

                {/* Features List */}
                <div className="mt-12 bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4">✨ Features Implemented:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <p className="flex items-center gap-2 text-sm">
                                <span className="text-green-500">✅</span>
                                Cart system hidden (not deleted)
                            </p>
                            <p className="flex items-center gap-2 text-sm">
                                <span className="text-green-500">✅</span>
                                Order summary modal matching design
                            </p>
                            <p className="flex items-center gap-2 text-sm">
                                <span className="text-green-500">✅</span>
                                Promo code system with demo codes
                            </p>
                            <p className="flex items-center gap-2 text-sm">
                                <span className="text-green-500">✅</span>
                                Direct checkout from course cards
                            </p>
                        </div>
                        <div className="space-y-2">
                            <p className="flex items-center gap-2 text-sm">
                                <span className="text-green-500">✅</span>
                                Direct checkout from course modals
                            </p>
                            <p className="flex items-center gap-2 text-sm">
                                <span className="text-green-500">✅</span>
                                Secure checkout page with forms
                            </p>
                            <p className="flex items-center gap-2 text-sm">
                                <span className="text-green-500">✅</span>
                                Payment processing simulation
                            </p>
                            <p className="flex items-center gap-2 text-sm">
                                <span className="text-green-500">✅</span>
                                Success page with auto-redirect
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DirectCheckoutDemo
