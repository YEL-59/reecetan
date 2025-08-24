import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft } from 'lucide-react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

const forgotPasswordSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
})

export default function ForgetPassword() {
    const form = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: 'ticketvilla@gmail.com',
        },
    })

    const onSubmit = async (data) => {
        try {
            console.log('Forgot password data:', data)
            // Here you would typically make an API call to send reset email
            // For now, we'll just simulate a delay
            await new Promise(resolve => setTimeout(resolve, 1000))
            // Show success message or redirect
        } catch (error) {
            console.error('Forgot password error:', error)
        }
    }

    return (
        <div className="space-y-8">
            {/* Back Button */}
            <Link
                to="/signin"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
            </Link>

            {/* Header */}
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold text-gray-900">Forgot Password</h1>
                <p className="text-gray-600">
                    Remember password?{' '}
                    <Link to="/login" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                        Sign in
                    </Link>
                </p>
            </div>

            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? 'Submitting...' : 'Submit Now'}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
