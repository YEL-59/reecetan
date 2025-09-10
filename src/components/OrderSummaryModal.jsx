import React, { useState } from 'react'
import { X, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from '@/components/ui/dialog'

const OrderSummaryModal = ({ course, isOpen, onClose, onPaymentNow }) => {
    const [promoCode, setPromoCode] = useState('')
    const [discount, setDiscount] = useState(0)
    const [isPromoApplied, setIsPromoApplied] = useState(false)

    if (!course) return null

    const subtotal = parseFloat(course.price) || 0
    const discountAmount = discount
    const tax = subtotal * 0.1 // 10% tax
    const total = subtotal - discountAmount + tax

    const handleApplyPromo = () => {
        // Demo promo codes
        const promoCodes = {
            'SAVE20': 20,
            'DISCOUNT10': 10,
            'STUDENT50': 50,
            'WELCOME25': 25
        }

        const discountValue = promoCodes[promoCode.toUpperCase()]
        if (discountValue) {
            setDiscount(discountValue)
            setIsPromoApplied(true)
        } else {
            setDiscount(0)
            setIsPromoApplied(false)
        }
    }

    const handlePaymentNow = (e) => {
        e?.stopPropagation()
        const orderData = {
            course,
            subtotal,
            discount: discountAmount,
            tax,
            total,
            promoCode: isPromoApplied ? promoCode : null
        }
        onPaymentNow?.(orderData)
    }


    return (
        <Dialog open={isOpen} onOpenChange={onClose} >
            <DialogContent className="max-w-md p-0 z-50">
                {/* Header */}
                <DialogHeader className="p-6 pb-0">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-semibold">Order Summary</DialogTitle>
                        <DialogClose className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X className="w-5 h-5 text-gray-500" />
                        </DialogClose>
                    </div>
                </DialogHeader>

                {/* Content */}
                <div className="max-h-[70vh] overflow-y-auto">
                    {/* Course Item */}
                    <div className="p-6 border-b">
                        <div className="flex gap-3">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-16 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900 text-sm leading-tight">
                                    {course.title}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">{course.category}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-900">${subtotal.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Promo Code */}
                    <div className="p-6 border-b">
                        <div className="flex gap-2">
                            <div className="flex-1 relative">
                                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Enter Promo Code"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    className="pl-10 text-sm"
                                />
                            </div>
                            <Button
                                onClick={handleApplyPromo}
                                variant="outline"
                                size="sm"
                                className="px-4"
                            >
                                Apply
                            </Button>
                        </div>

                        {isPromoApplied && (
                            <div className="mt-2 flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-xs text-green-600 font-medium">
                                    Merchant Applied: -${discountAmount.toFixed(2)}
                                </span>
                            </div>
                        )}

                        {/* Demo promo codes hint */}
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <p className="text-xs text-blue-600 font-medium mb-1">Try these demo codes:</p>
                            <div className="flex flex-wrap gap-1">
                                {['SAVE20', 'DISCOUNT10', 'STUDENT50', 'WELCOME25'].map(code => (
                                    <button
                                        key={code}
                                        onClick={() => setPromoCode(code)}
                                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                                    >
                                        {code}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Breakdown */}
                    <div className="p-6 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                        </div>

                        {discountAmount > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Discount</span>
                                <span className="text-green-600">-${discountAmount.toFixed(2)}</span>
                            </div>
                        )}

                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tax (VAT)</span>
                            <span className="text-gray-900">${tax.toFixed(2)}</span>
                        </div>

                        <div className="border-t pt-3">
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-900">Total</span>
                                <span className="font-bold text-xl text-gray-900">${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Button */}
                    <div className="p-6 pt-0">
                        <Button
                            onClick={handlePaymentNow}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium"
                            size="lg"
                        >
                            Payment Now
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default OrderSummaryModal
