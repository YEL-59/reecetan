import { Link } from 'react-router-dom'
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
import { useResetPasswordOTP, useForgotPassword } from '@/hooks/auth.hook'

export default function ForgetPasswordOtp() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']) // Empty initially
    const [resendCountdown, setResendCountdown] = useState(0)
    const inputRefs = useRef([])

    // Use auth hooks for API integration - Reset Password OTP flow
    const { form, mutate: verifyOTP, isVerifying } = useResetPasswordOTP()
    const { mutate: resendEmail, isPending: isResending } = useForgotPassword()

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
    const handleResendOtp = () => {
        // Get email from form or location state
        const email = form.watch('email') || 'user@example.com' // You might need to get this from navigation state
        resendEmail({ email })
        setResendCountdown(60) // Start 60-second countdown
    }

    // Countdown timer for resend
    useEffect(() => {
        if (resendCountdown > 0) {
            const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [resendCountdown])

    const onSubmit = (data) => {
        // Prepare data for OTP verification API
        const apiData = {
            email: form.watch('email') || 'user@example.com', // You might need to get this from navigation state
            otp: otp.join('') // Convert array to string
        }
        verifyOTP(apiData)
    }

    return (
        <div className="space-y-8">
            {/* Back Button */}
            <Link
                to="/forgot-password"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
            </Link>

            {/* Header */}
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold text-gray-900">OTP Verification</h1>
                <p className="text-gray-600">
                    Please Verify Your Email Address
                </p>
            </div>

            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                                className={`w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${digit ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
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