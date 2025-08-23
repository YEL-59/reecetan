import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSuccess = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-md p-8 rounded-2xl border">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
          <h1 className="text-2xl font-bold mb-2">Payment Successful</h1>
          <p className="text-gray-600 mb-6">Your purchase is confirmed. You can access your course in your dashboard.</p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/courses" className="px-5 py-2 rounded-full bg-primary text-white">Browse More Courses</Link>
            <Link to="/" className="px-5 py-2 rounded-full border">Go Home</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CheckoutSuccess
