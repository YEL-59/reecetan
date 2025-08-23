import React, { useState } from 'react'
import { useCart } from '@/contexts/cart-context'
import { useNavigate } from 'react-router-dom'

const COUNTRIES = [
  'Philippines', 'United States', 'Canada', 'United Kingdom', 'Australia', 'India'
]

const CheckoutPage = () => {
  const { items, subtotal, clear, remove } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    country: '',
    cardNumber: '',
    exp: '',
    cvc: ''
  })
  const [method, setMethod] = useState('card')

  const placeOrder = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.country) return
    // Simulated success
    clear()
    navigate('/checkout/success')
  }

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Billing + Payment */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-2">Checkout</h1>
            <p className="text-xs text-gray-500 mb-6">All fields are required</p>

            {/* Billing information */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold uppercase text-gray-700 mb-2">Billing information</h2>
              <div className="border rounded-xl overflow-hidden">
                <div className="p-4 space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-600">NAME</label>
                    <input
                      className="mt-1 w-full border rounded-lg px-3 py-2"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e)=>setForm({...form, name:e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600">EMAIL</label>
                    <input
                      type="email"
                      className="mt-1 w-full border rounded-lg px-3 py-2"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e)=>setForm({...form, email:e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600">COUNTRY</label>
                    <select
                      className="mt-1 w-full border rounded-lg px-3 py-2"
                      value={form.country}
                      onChange={(e)=>setForm({...form, country:e.target.value})}
                      required
                    >
                      <option value="" disabled>Select your country</option>
                      {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment methods */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold uppercase text-gray-700 mb-2">Payment methods</h2>

              {/* Card */}
              <div className="border rounded-xl overflow-hidden mb-4">
                <button
                  type="button"
                  onClick={() => setMethod('card')}
                  className={`w-full text-left px-4 py-3 flex items-center gap-2 ${method==='card' ? 'bg-blue-50' : 'bg-gray-50'}`}
                >
                  <span className="w-5 h-5 rounded-full border flex items-center justify-center text-xs mr-1 bg-white">{method==='card' ? '●' : ''}</span>
                  <span className="font-medium text-sm">Card</span>
                </button>
                {method==='card' && (
                  <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-3">
                      <label className="text-xs text-gray-600">Card Number</label>
                      <input
                        className="mt-1 w-full border rounded-lg px-3 py-2"
                        placeholder="1234 1234 1234 1234"
                        value={form.cardNumber}
                        onChange={(e)=>setForm({...form, cardNumber:e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">Expiration Date</label>
                      <input
                        className="mt-1 w-full border rounded-lg px-3 py-2"
                        placeholder="MM / YY"
                        value={form.exp}
                        onChange={(e)=>setForm({...form, exp:e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">Security Code</label>
                      <input
                        className="mt-1 w-full border rounded-lg px-3 py-2"
                        placeholder="CVC"
                        value={form.cvc}
                        onChange={(e)=>setForm({...form, cvc:e.target.value})}
                      />
                    </div>
                    <div className="hidden md:block" />
                    <p className="md:col-span-3 text-xs text-gray-500">
                      By providing your card information, you allow us to charge your card for future payments in accordance with our terms.
                    </p>
                  </div>
                )}
              </div>

              {/* PayPal */}
              <div className="border rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMethod('paypal')}
                  className={`w-full text-left px-4 py-3 flex items-center gap-2 ${method==='paypal' ? 'bg-blue-50' : 'bg-gray-50'}`}
                >
                  <span className="w-5 h-5 rounded-full border flex items-center justify-center text-xs mr-1 bg-white">{method==='paypal' ? '●' : ''}</span>
                  <span className="font-medium text-sm">Paypal</span>
                </button>
                {method==='paypal' && (
                  <div className="p-4 text-sm text-gray-600">You will be redirected to PayPal to complete your purchase.</div>
                )}
              </div>

              {/* Submit */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <button onClick={placeOrder} className="px-6 py-3 rounded-full bg-primary text-white">Start Free Trial</button>
                <div className="text-sm text-gray-600">You won't be charged today</div>
              </div>
              <p className="mt-3 text-[11px] text-gray-500">By continuing, you agree to the Terms of Use and Privacy Policy.</p>
            </div>
          </div>

          {/* Right: Order summary */}
          <aside className="lg:col-span-1">
            <div className="border rounded-xl overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Today's Total:</h3>
                <div className="text-2xl font-bold">${subtotal.toFixed(2)} USD</div>
              </div>

              <div className="p-4 space-y-4">
                {items.map((i) => (
                  <div key={i.id} className="flex items-center gap-3">
                    <img src={i.image} alt={i.title} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-2">{i.title}</p>
                      <button onClick={() => remove(i.id)} className="text-xs text-blue-600 hover:underline">Remove from cart</button>
                    </div>
                    <div className="text-sm font-semibold">${i.price}</div>
                  </div>
                ))}

                <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
                  Your subscription begins today with a 7-day free trial. If you decide to stop during the trial period, visit your purchases to cancel before your trial ends and your card won't be charged.
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500 space-y-2">
              <div>140 Million+ learners</div>
              <div>10,000+ courses</div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default CheckoutPage
