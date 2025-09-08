import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, Lock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const CheckoutPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [orderData, setOrderData] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [paymentSuccess, setPaymentSuccess] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        billingAddress: '',
        city: '',
        postalCode: '',
        country: 'US'
    })

    useEffect(() => {
        // Get order data from navigation state
        if (location.state?.orderData) {
            setOrderData(location.state.orderData)
        } else {
            // Redirect back if no order data
            navigate('/')
        }
    }, [location.state, navigate])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsProcessing(true)

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false)
            setPaymentSuccess(true)

            // Redirect to success page after 2 seconds
            setTimeout(() => {
                navigate('/dashboard/my-courses', {
                    state: {
                        newCourse: orderData?.course,
                        message: 'Course enrolled successfully!'
                    }
                })
            }, 2000)
        }, 3000)
    }

    if (!orderData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">Loading checkout...</p>
                    <Button onClick={() => navigate('/')} variant="outline">
                        Return Home
                    </Button>
                </div>
            </div>
        )
    }

    if (paymentSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-50">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h1>
                    <p className="text-green-600 mb-6">
                        You have successfully enrolled in "{orderData.course.title}"
                    </p>
                    <div className="bg-white p-4 rounded-lg border border-green-200 mb-6">
                        <p className="text-sm text-gray-600">Amount Paid</p>
                        <p className="text-2xl font-bold text-green-600">${orderData.total.toFixed(2)}</p>
                    </div>
                    <p className="text-sm text-gray-500">Redirecting to your courses...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Payment Form */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <CreditCard className="w-5 h-5 text-blue-500" />
                            <h2 className="text-xl font-semibold">Payment Details</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="cardNumber">Card Number</Label>
                                <Input
                                    id="cardNumber"
                                    name="cardNumber"
                                    type="text"
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                    placeholder="1234 5678 9012 3456"
                                    maxLength={19}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="expiryDate">Expiry Date</Label>
                                    <Input
                                        id="expiryDate"
                                        name="expiryDate"
                                        type="text"
                                        value={formData.expiryDate}
                                        onChange={handleInputChange}
                                        placeholder="MM/YY"
                                        maxLength={5}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="cvv">CVV</Label>
                                    <Input
                                        id="cvv"
                                        name="cvv"
                                        type="text"
                                        value={formData.cvv}
                                        onChange={handleInputChange}
                                        placeholder="123"
                                        maxLength={3}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="cardholderName">Cardholder Name</Label>
                                <Input
                                    id="cardholderName"
                                    name="cardholderName"
                                    type="text"
                                    value={formData.cardholderName}
                                    onChange={handleInputChange}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="billingAddress">Billing Address</Label>
                                <Input
                                    id="billingAddress"
                                    name="billingAddress"
                                    type="text"
                                    value={formData.billingAddress}
                                    onChange={handleInputChange}
                                    placeholder="123 Main Street"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="city">City</Label>
                                    <Input
                                        id="city"
                                        name="city"
                                        type="text"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="New York"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="postalCode">Postal Code</Label>
                                    <Input
                                        id="postalCode"
                                        name="postalCode"
                                        type="text"
                                        value={formData.postalCode}
                                        onChange={handleInputChange}
                                        placeholder="10001"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium"
                                    size="lg"
                                >
                                    {isProcessing ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Processing Payment...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Lock className="w-4 h-4" />
                                            Complete Payment ${orderData.total.toFixed(2)}
                                        </div>
                                    )}
                                </Button>
                            </div>
                        </form>

                        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                            <Lock className="w-4 h-4" />
                            Your payment information is secure and encrypted
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">
                        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                        {/* Course Item */}
                        <div className="flex gap-4 mb-6">
                            <img
                                src={orderData.course.image}
                                alt={orderData.course.title}
                                className="w-20 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900 mb-1">
                                    {orderData.course.title}
                                </h3>
                                <p className="text-sm text-gray-500">{orderData.course.category}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <span className="text-xs text-amber-500">★</span>
                                    <span className="text-xs text-gray-600">
                                        {orderData.course.rating} ({orderData.course.students} students)
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className="border-t pt-4 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="text-gray-900">${orderData.subtotal.toFixed(2)}</span>
                            </div>

                            {orderData.discount > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                        Discount {orderData.promoCode && `(${orderData.promoCode})`}
                                    </span>
                                    <span className="text-green-600">-${orderData.discount.toFixed(2)}</span>
                                </div>
                            )}

                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Tax (VAT)</span>
                                <span className="text-gray-900">${orderData.tax.toFixed(2)}</span>
                            </div>

                            <div className="border-t pt-3">
                                <div className="flex justify-between">
                                    <span className="font-semibold text-gray-900">Total</span>
                                    <span className="font-bold text-xl text-gray-900">${orderData.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Security Info */}
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-start gap-3">
                                <Lock className="w-5 h-5 text-green-500 mt-0.5" />
                                <div>
                                    <h4 className="font-medium text-sm text-gray-900">Secure Payment</h4>
                                    <p className="text-xs text-gray-600 mt-1">
                                        Your payment is protected by 256-bit SSL encryption
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage
