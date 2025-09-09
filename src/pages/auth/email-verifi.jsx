import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { useVerifyOTP } from '@/hooks/auth.hook'

export default function EmailVerification() {
    const [otp, setOtp] = useState(['6', '', '', '', '', '']) // Pre-filled with '6' as shown in image
    const [isResending, setIsResending] = useState(false)
    const [resendCountdown, setResendCountdown] = useState(0)
    const inputRefs = useRef([])
    const location = useLocation()

    // Use the auth hook that matches your API
    const { form, mutate, isVerifying } = useVerifyOTP()

    // Debug: Check what email is being received
    useEffect(() => {
        console.log('📍 Email Verification Page - Location State:', location.state)
        console.log('📍 Email Verification Page - Form Email:', form.getValues('email'))
        console.log('📍 Email Verification Page - OTP from API:', location.state?.otp)
    }, [location.state, form])

    // Handle OTP input changes
    const handleOtpChange = (index, value) => {
        if (value.length > 1) return // Prevent multiple characters

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // Update form value
        form.setValue('otp', newOtp.join(''))

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    // Handle backspace
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    // Handle paste
    const handlePaste = (e) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').slice(0, 6)
        if (/^\d{6}$/.test(pastedData)) {
            const newOtp = pastedData.split('')
            setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')])
            form.setValue('otp', pastedData)
        }
    }

    // Resend OTP functionality
    const handleResendOtp = async () => {
        setIsResending(true)
        try {
            // API call to resend OTP
            await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
            console.log('OTP resent successfully')
            setResendCountdown(60) // Start 60-second countdown
        } catch (error) {
            console.error('Failed to resend OTP:', error)
        } finally {
            setIsResending(false)
        }
    }

    // Countdown timer for resend
    useEffect(() => {
        if (resendCountdown > 0) {
            const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [resendCountdown])

    const onSubmit = (data) => {
        // Prepare data for your API format
        const email = form.getValues('email') || location.state?.email
        const apiData = {
            email: email, // Get email from form or location state
            otp: otp.join('') // Convert array to string
        }
        console.log('🚀 Submitting OTP with email:', email)
        mutate(apiData)
    }

    return (
        <div className="space-y-8">
            {/* Back Button */}
            <Link
                to="/register"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
            </Link>

            {/* Header */}
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold text-gray-900">
                    You Almost there, last Step 🎉
                </h1>
                <p className="text-gray-600">
                    Please Verify Your Email Address
                </p>
                {(form.getValues('email') || location.state?.email) && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                        <p className="text-sm text-gray-600 mb-1">Verification code sent to:</p>
                        <p className="text-sm text-blue-600 font-medium">
                            {form.getValues('email') || location.state?.email}
                        </p>
                        {location.state?.otp && (
                            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                                <p className="text-xs text-yellow-700">
                                    <strong>For Testing:</strong> OTP is {location.state.otp}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Hidden Email Field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="hidden">
                                <FormControl>
                                    <Input type="hidden" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* OTP Input Fields */}
                    <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex justify-center space-x-3">
                                        {otp.map((digit, index) => (
                                            <Input
                                                key={index}
                                                ref={(el) => (inputRefs.current[index] = el)}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                onPaste={handlePaste}
                                                className={`w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${digit ? 'border-blue-500 bg-blue-50' : 'border-blue-200'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Instructions */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600 leading-relaxed">
                            We've sent a 6 digit verification code to your email. Check your spam folder in case you didn't receive the code.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                        disabled={isVerifying || otp.join('').length !== 6}
                    >
                        {isVerifying ? 'Verifying...' : 'Submit'}
                    </Button>

                    {/* Resend Code */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Did you not receive the email?{' '}
                            {resendCountdown > 0 ? (
                                <span className="text-gray-500">
                                    Resend in {resendCountdown}s
                                </span>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleResendOtp}
                                    disabled={isResending}
                                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium disabled:opacity-50"
                                >
                                    {isResending ? 'Sending...' : 'Resend Code'}
                                </button>
                            )}
                        </p>
                    </div>
                </form>
            </Form>
        </div>
    )
}