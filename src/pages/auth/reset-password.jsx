import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { useResetPassword } from '@/hooks/auth.hook'

export default function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // Use the auth hook that matches your API
    const { form, mutate, isResetting } = useResetPassword()

    const onSubmit = (data) => {
        // Call the API using the auth hook (includes name field as per your API)
        mutate(data)
    }

    return (
        <div className="space-y-8">
            {/* Back Button */}
            <Link
                to="/forget-password-otp"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
            </Link>

            {/* Header */}
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
                <p className="text-gray-600">
                    No worries, enter the email address associated with your account and we'll send you instructions to reset your password.
                </p>
            </div>

            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name Field - Required by your API */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#1E1E1E] text-[18px] font-normal leading-none">
                                    Full Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Enter your full name"
                                        className="bg-[#EDFCFF] p-4 rounded-full w-full focus-visible:ring-0 shadow-none mt-2 py-5"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email Field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#1E1E1E] text-[18px] font-normal leading-none">
                                    Email Address
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="bg-[#EDFCFF] p-4 rounded-full w-full focus-visible:ring-0 shadow-none mt-2 py-5"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Password Field */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#1E1E1E] text-[18px] font-normal leading-none">
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                            className="bg-[#EDFCFF] p-4 pr-12 rounded-full w-full focus-visible:ring-0 shadow-none mt-2 py-5"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Confirm Password Field */}
                    <FormField
                        control={form.control}
                        name="password_confirmation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#1E1E1E] text-[18px] font-normal leading-none">
                                    Confirm Password
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Retype password"
                                            className="bg-[#EDFCFF] p-4 pr-12 rounded-full w-full focus-visible:ring-0 shadow-none mt-2 py-5"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                        disabled={isResetting}
                    >
                        {isResetting ? 'Resetting...' : 'Submit Now'}
                    </Button>
                </form>
            </Form>
        </div>
    )
}