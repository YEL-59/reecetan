import React from 'react'
import { useSignIn, useAuthStatus } from '@/hooks/auth.hook'

const AuthExample = () => {
    const { form, mutate: signIn, isPending } = useSignIn()
    const { isAuthenticated, user } = useAuthStatus()

    const handleSubmit = form.handleSubmit((data) => {
        console.log('🚀 Submitting login form with data:', data)
        signIn(data)
    })

    if (isAuthenticated) {
        return (
            <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                <h2 className="text-xl font-semibold text-green-800 mb-2">
                    ✅ Welcome back, {user?.name}!
                </h2>
                <p className="text-green-600">You are successfully logged in.</p>
                <p className="text-sm text-green-500 mt-2">
                    Check the console for detailed auth logs! 🎯
                </p>
            </div>
        )
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">🔑 Login Example</h2>
            <p className="text-sm text-gray-600 mb-4">
                Open DevTools Console (F12) to see the cool test logs!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        {...form.register('email')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="john@example.com"
                    />
                    {form.formState.errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        {...form.register('password')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="password123"
                    />
                    {form.formState.errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.password.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isPending ? '⏳ Signing in...' : '🚀 Sign In'}
                </button>
            </form>

            <div className="mt-4 p-3 bg-gray-100 rounded-md">
                <p className="text-xs text-gray-600 mb-2">Test Credentials:</p>
                <div className="text-xs space-y-1">
                    <div><strong>Email:</strong> john@example.com</div>
                    <div><strong>Password:</strong> password123</div>
                </div>
            </div>
        </div>
    )
}

export default AuthExample

