import React, { useState } from 'react'
import {
    useSignUp,
    useSignIn,
    useSendOtp,
    useMatchOtp,
    useResetPassword,
    useUpdatePassword,
    useUpdateUser,
    useGetUser,
    useSignout,
    useTestAllAPIs,
    useAuthStatus
} from '@/hooks/auth.hook'

const AuthTestConsole = () => {
    const [activeTest, setActiveTest] = useState('status')
    const { user, isAuthenticated } = useAuthStatus()
    const { runAllTests } = useTestAllAPIs()

    // Test data
    const testData = {
        signUp: {
            name: "John Doe",
            email: "john@example.com",
            password: "password123",
            password_confirmation: "password123",
            phone_number: "1234567890",
            address: "123 Main St, City, Country",
            terms_and_conditions: true
        },
        signIn: {
            email: "john@example.com",
            password: "password123"
        },
        sendOtp: {
            email: "john@example.com"
        },
        matchOtp: {
            email: "john@example.com",
            otp0: "1",
            otp1: "2",
            otp2: "3",
            otp3: "4"
        },
        resetPassword: {
            email: "john@example.com",
            password: "newpassword123",
            password_confirmation: "newpassword123"
        },
        updatePassword: {
            current_password: "password123",
            new_password: "newpassword123",
            new_password_confirmation: "newpassword123"
        },
        updateProfile: {
            name: "John Doe Updated",
            phone_number: "9876543210",
            address: "456 New St, New City, Country"
        }
    }

    const TestButton = ({ onClick, loading, children, variant = "primary" }) => {
        const baseClasses = "px-4 py-2 rounded-md font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        const variants = {
            primary: "bg-blue-500 hover:bg-blue-600 text-white",
            success: "bg-green-500 hover:bg-green-600 text-white",
            warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
            danger: "bg-red-500 hover:bg-red-600 text-white",
            info: "bg-purple-500 hover:bg-purple-600 text-white"
        }

        return (
            <button
                onClick={onClick}
                disabled={loading}
                className={`${baseClasses} ${variants[variant]}`}
            >
                {loading ? '⏳ Testing...' : children}
            </button>
        )
    }

    const SignUpTest = () => {
        const { mutate, isPending } = useSignUp()

        return (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">🔐 Sign Up Test</h3>
                <div className="bg-gray-100 p-4 rounded-md">
                    <pre className="text-sm">{JSON.stringify(testData.signUp, null, 2)}</pre>
                </div>
                <TestButton
                    onClick={() => mutate(testData.signUp)}
                    loading={isPending}
                    variant="success"
                >
                    🚀 Test Sign Up
                </TestButton>
            </div>
        )
    }

    const SignInTest = () => {
        const { mutate, isPending } = useSignIn()

        return (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">🔑 Sign In Test</h3>
                <div className="bg-gray-100 p-4 rounded-md">
                    <pre className="text-sm">{JSON.stringify(testData.signIn, null, 2)}</pre>
                </div>
                <TestButton
                    onClick={() => mutate(testData.signIn)}
                    loading={isPending}
                    variant="primary"
                >
                    🚀 Test Sign In
                </TestButton>
            </div>
        )
    }

    const OtpTest = () => {
        const { mutate: sendOtp, isPending: sendingOtp } = useSendOtp()
        const { matchOtp, isMatching } = useMatchOtp()

        return (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">📧 OTP Test</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-medium mb-2">Send OTP</h4>
                        <div className="bg-gray-100 p-4 rounded-md mb-2">
                            <pre className="text-sm">{JSON.stringify(testData.sendOtp, null, 2)}</pre>
                        </div>
                        <TestButton
                            onClick={() => sendOtp(testData.sendOtp)}
                            loading={sendingOtp}
                            variant="info"
                        >
                            📧 Send OTP
                        </TestButton>
                    </div>
                    <div>
                        <h4 className="font-medium mb-2">Verify OTP</h4>
                        <div className="bg-gray-100 p-4 rounded-md mb-2">
                            <pre className="text-sm">{JSON.stringify(testData.matchOtp, null, 2)}</pre>
                        </div>
                        <TestButton
                            onClick={() => matchOtp(testData.matchOtp)}
                            loading={isMatching}
                            variant="success"
                        >
                            🔢 Verify OTP
                        </TestButton>
                    </div>
                </div>
            </div>
        )
    }

    const PasswordTest = () => {
        const { mutate: resetPassword, isResetting } = useResetPassword()
        const { updatePassword, isUpdating } = useUpdatePassword()

        return (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">🔄 Password Test</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-medium mb-2">Reset Password</h4>
                        <div className="bg-gray-100 p-4 rounded-md mb-2">
                            <pre className="text-sm">{JSON.stringify(testData.resetPassword, null, 2)}</pre>
                        </div>
                        <TestButton
                            onClick={() => resetPassword(testData.resetPassword)}
                            loading={isResetting}
                            variant="warning"
                        >
                            🔄 Reset Password
                        </TestButton>
                    </div>
                    <div>
                        <h4 className="font-medium mb-2">Update Password</h4>
                        <div className="bg-gray-100 p-4 rounded-md mb-2">
                            <pre className="text-sm">{JSON.stringify(testData.updatePassword, null, 2)}</pre>
                        </div>
                        <TestButton
                            onClick={() => updatePassword(testData.updatePassword)}
                            loading={isUpdating}
                            variant="warning"
                        >
                            🔐 Update Password
                        </TestButton>
                    </div>
                </div>
            </div>
        )
    }

    const ProfileTest = () => {
        const { updateUser, isLoading: isUpdating } = useUpdateUser()
        const { user: profileUser, isLoading: isFetching } = useGetUser()

        return (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">👤 Profile Test</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-medium mb-2">Update Profile</h4>
                        <div className="bg-gray-100 p-4 rounded-md mb-2">
                            <pre className="text-sm">{JSON.stringify(testData.updateProfile, null, 2)}</pre>
                        </div>
                        <TestButton
                            onClick={() => updateUser(testData.updateProfile)}
                            loading={isUpdating}
                            variant="info"
                        >
                            👤 Update Profile
                        </TestButton>
                    </div>
                    <div>
                        <h4 className="font-medium mb-2">Current Profile</h4>
                        <div className="bg-gray-100 p-4 rounded-md mb-2">
                            {isFetching ? (
                                <div className="text-center">Loading...</div>
                            ) : (
                                <pre className="text-sm">{JSON.stringify(profileUser || {}, null, 2)}</pre>
                            )}
                        </div>
                        <div className="text-sm text-gray-600">
                            Profile fetched automatically
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const AuthStatus = () => {
        const { mutate: signOut, isPending: signingOut } = useSignout()

        return (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">🔍 Auth Status</h3>
                <div className="bg-gray-100 p-4 rounded-md">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Status:</span>
                            <span className={`px-2 py-1 rounded-md text-sm ${isAuthenticated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                {isAuthenticated ? '✅ Authenticated' : '❌ Not Authenticated'}
                            </span>
                        </div>
                        {user && (
                            <>
                                <div><span className="font-medium">Name:</span> {user.name || 'N/A'}</div>
                                <div><span className="font-medium">Email:</span> {user.email || 'N/A'}</div>
                                <div><span className="font-medium">Phone:</span> {user.phone_number || 'N/A'}</div>
                            </>
                        )}
                    </div>
                </div>
                {isAuthenticated && (
                    <TestButton
                        onClick={() => signOut()}
                        loading={signingOut}
                        variant="danger"
                    >
                        🚪 Sign Out
                    </TestButton>
                )}
            </div>
        )
    }

    const tests = [
        { key: 'status', label: '🔍 Auth Status', component: AuthStatus },
        { key: 'signup', label: '🔐 Sign Up', component: SignUpTest },
        { key: 'signin', label: '🔑 Sign In', component: SignInTest },
        { key: 'otp', label: '📧 OTP', component: OtpTest },
        { key: 'password', label: '🔄 Password', component: PasswordTest },
        { key: 'profile', label: '👤 Profile', component: ProfileTest },
    ]

    const ActiveComponent = tests.find(t => t.key === activeTest)?.component || AuthStatus

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        🚀 Auth API Test Console
                    </h1>
                    <p className="text-gray-600">
                        Test all authentication APIs with cool console logs!
                    </p>
                    <div className="mt-4">
                        <button
                            onClick={runAllTests}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                        >
                            🎯 Initialize Test Suite
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {tests.map((test) => (
                        <button
                            key={test.key}
                            onClick={() => setActiveTest(test.key)}
                            className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTest === test.key
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border'
                                }`}
                        >
                            {test.label}
                        </button>
                    ))}
                </div>

                {/* Active Test */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <ActiveComponent />
                </div>

                {/* Console Instructions */}
                <div className="mt-8 bg-gray-900 text-white rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">📊 Console Instructions</h2>
                    <div className="space-y-2 text-sm">
                        <p>• <span className="text-green-400">Open Developer Console</span> (F12) to see the cool test logs!</p>
                        <p>• <span className="text-blue-400">Each API call</span> will show detailed success/error information</p>
                        <p>• <span className="text-yellow-400">Test data</span> is automatically populated for easy testing</p>
                        <p>• <span className="text-purple-400">Color-coded logs</span> make it easy to track API status</p>
                        <p>• <span className="text-pink-400">Response data</span> is displayed in organized tables</p>
                    </div>
                    <div className="mt-4 p-4 bg-gray-800 rounded-md">
                        <div className="text-green-400 font-mono">✅ SUCCESS - Styled in green</div>
                        <div className="text-red-400 font-mono">❌ ERROR - Styled in red</div>
                        <div className="text-purple-400 font-mono">⏳ LOADING - Styled in purple</div>
                        <div className="text-blue-400 font-mono">💡 INFO - Styled in blue</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthTestConsole

