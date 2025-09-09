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
import { useForgotPassword } from '@/hooks/auth.hook'

export default function ForgetPassword() {
    // Use the auth hook that matches your API
    const { form, mutate, isPending } = useForgotPassword()

    const onSubmit = (data) => {
        // Call the API using the auth hook
        mutate(data)
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
                        disabled={isPending}
                    >
                        {isPending ? 'Submitting...' : 'Submit Now'}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
