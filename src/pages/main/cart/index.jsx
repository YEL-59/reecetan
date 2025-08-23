import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '@/contexts/cart-context'
import { Trash2 } from 'lucide-react'

const CartPage = () => {
  const { items, remove, clear, subtotal } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Browse our courses and start learning today.</p>
          <Link to="/courses" className="inline-flex px-6 py-3 rounded-full bg-primary text-white">Explore Courses</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 border rounded-xl">
                <img src={item.image} alt={item.title} className="w-24 h-16 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
                <div className="font-semibold mr-4">${item.price}</div>
                <button onClick={() => remove(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button onClick={clear} className="text-sm text-gray-600 hover:text-gray-800">Clear cart</button>
          </div>

          <div className="border rounded-xl p-6 h-max">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="text-xs text-gray-500 mb-4">Taxes calculated at checkout</div>
            <button onClick={() => navigate('/checkout')} className="w-full rounded-full bg-primary text-white px-4 py-3">Proceed to Checkout</button>
            <Link to="/courses" className="block text-center text-sm text-gray-600 mt-3 hover:text-gray-800">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CartPage
