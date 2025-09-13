import { axiosPrivate, axiosPublic } from "@/lib/axios.config";
import {
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "@/schemas/auth.schemas";
import { secureTokenManager } from "@/lib/secure-auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

// 🎯 Test Console Helper
const testConsole = {
  success: (operation, data) => {
    console.log(`%c✅ ${operation} - SUCCESS`, 
      'color: #10B981; font-weight: bold; font-size: 14px;');
    console.log(`%c📊 Response Data:`, 'color: #3B82F6; font-weight: bold;');
    console.table(data);
    console.log(`%c🚀 Test Status: PASSED`, 'color: #10B981; font-weight: bold;');
    console.log('━'.repeat(60));
  },
  
  error: (operation, error) => {
    console.log(`%c❌ ${operation} - ERROR`, 
      'color: #EF4444; font-weight: bold; font-size: 14px;');
    console.log(`%c🐛 Error Details:`, 'color: #F59E0B; font-weight: bold;');
    console.error(error);
    console.log(`%c💥 Test Status: FAILED`, 'color: #EF4444; font-weight: bold;');
    console.log('━'.repeat(60));
  },
  
  loading: (operation) => {
    console.log(`%c⏳ ${operation} - LOADING`, 
      'color: #8B5CF6; font-weight: bold; font-size: 14px;');
    console.log(`%c🔄 Processing request...`, 'color: #6B7280;');
    console.log('━'.repeat(60));
  },
  
  info: (operation, message) => {
    console.log(`%c💡 ${operation} - INFO`, 
      'color: #06B6D4; font-weight: bold; font-size: 14px;');
    console.log(`%c📝 Message: ${message}`, 'color: #6B7280;');
    console.log('━'.repeat(60));
  }
};

// 🔐 Sign Up Hook - Matches your /api/register endpoint
export const useSignUp = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload) => {
      testConsole.loading("USER REGISTRATION");
      
      // Matches your Postman collection format exactly
      const data = {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        password_confirmation: payload.password_confirmation
      };

      const res = await axiosPublic.post("/register", data);
      
      // Debug: Log the full response
      console.log('🔍 API Response Status:', res.status);
      console.log('🔍 API Response Data:', res.data);
      
      // Check if the response indicates an error
      if (res.data && (res.data.status === false || res.data.success === false || res.data.error)) {
        console.log('❌ API returned error in response body:', res.data);
        throw new Error(res.data.message || res.data.error || "Registration failed");
      }
      
      // Check if we have the required fields for successful registration
      const token = res.data.access_token || res.data.token;
      const user = res.data.user;
      
      if (!token || !user) {
        console.log('❌ API response missing required fields:', res.data);
        throw new Error("Invalid response from server");
      }
      
      return res.data;
    },
    onSuccess: (data) => {
      testConsole.success("USER REGISTRATION", {
        status: 'success',
        message: 'Registration successful',
        user: data.user?.name || 'N/A',
        email: data.user?.email || 'N/A',
        token: (data.access_token || data.token) ? '✅ Generated' : '❌ Missing',
        otp: data.otp ? '✅ Generated' : '❌ Missing'
      });
      
      toast.success("Registration successful! Please verify your email.");
      
      // For email verification flow, DON'T store token yet
      // Token will be stored only after successful email verification
      console.log('🚀 Signup Success - User registered, redirecting to email verification')
      console.log('🚀 Signup Success - Full data object:', data)
      console.log('🚀 Signup Success - OTP for verification:', data.otp)
      
      const emailToPass = data.user?.email
      console.log('🚀 Signup Success - Navigating to email verification with email:', emailToPass)
      
      navigate("/email-verification", {
        state: { 
          email: emailToPass,
          otp: data.otp // Pass OTP for testing purposes
        }
      });
    },
    onError: (error) => {
      console.log('❌ Registration Error:', error);
      
      const message = error?.response?.data?.message || error?.message || "Registration failed";
      testConsole.error("USER REGISTRATION", {
        error: message,
        status: error?.response?.status,
        endpoint: "/register",
        fullError: error
      });
      
      if (message.toLowerCase().includes("email")) {
        form.setError("email", { message });
      } else {
        toast.error(message);
      }
    },
  });

  return { form, mutate, isPending };
};

// 🔑 Sign In Hook - Matches your /api/login endpoint
export const useSignIn = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const redirectUrl = params.get("redirect");

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (credentials) => {
      testConsole.loading("USER LOGIN");
      
      // Matches your Postman collection format exactly
      const data = {
        email: credentials.email,
        password: credentials.password
      };

      const res = await axiosPublic.post("/login", data);
      return res.data;
    },
    onSuccess: (data) => {
      testConsole.success("USER LOGIN", {
        status: data.status || 'success',
        message: data.message || 'Login successful',
        user: data.user?.name || data.name || 'N/A',
        email: data.user?.email || data.email || 'N/A',
        token: data.access_token || data.token ? '✅ Generated' : '❌ Missing',
        redirect: redirectUrl || '/dashboard'
      });
      
      toast.success(data?.message || "Login successful");
      
      // Handle token and user data with secure storage - check for access_token first
      const token = data.access_token || data.token;
      const user = data.user || { name: data.name, email: data.email };
      
      if (token && user) {
        console.log('🔑 Setting auth with token:', token.substring(0, 20) + '...');
        console.log('👤 Setting auth with user:', user);
        secureTokenManager.setAuth(token, user);
        
        // Wait a bit for the auth to be set, then navigate
        setTimeout(() => {
          console.log('🔍 Auth status after setting:', secureTokenManager.isAuthenticated());
          if (redirectUrl) {
            navigate(redirectUrl);
          } else {
            navigate("/dashboard");
          }
        }, 100);
      } else {
        console.error('❌ Missing token or user data:', { token: !!token, user: !!user });
      }
    },
    onError: (error) => {
      const message = error?.response?.data?.message || 
                     error?.response?.data?.error || 
                     error.message || 
                     "Login failed";

      testConsole.error("USER LOGIN", {
        error: message,
        status: error?.response?.status,
        endpoint: "/login"
      });

      if (typeof message === "string" && message.toLowerCase().includes("email")) {
        form.setError("email", { message });
      } else {
        toast.error(message);
      }
    },
  });

  return { form, mutate, isPending };
};

// 🚪 Sign Out Hook
export const useSignout = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      testConsole.loading("USER LOGOUT");
      
      // Clear auth first to prevent redirect loops
      console.log('🔓 Clearing authentication...');
      secureTokenManager.clearAuth();
      
      // If you have a logout endpoint, uncomment and adjust:
      // const { data } = await axiosPrivate.post("/logout");
      // return data;
      
      // For now, just return success
      return { status: true, message: "Logged out successfully" };
    },
    onSuccess: (data) => {
      testConsole.success("USER LOGOUT", {
        status: data?.status || true,
        message: data?.message || "Logged out successfully",
        action: "Tokens cleared",
        redirect: "/signin"
      });
      
      console.log('🚪 Logout successful, redirecting to signin...');
      toast.success(data?.message || "Logged out successfully");
      
      // Force navigation to signin
      window.location.href = '/signin';
    },
    onError: (error) => {
      testConsole.info("USER LOGOUT", "API failed, performing local logout");
      console.log('🔓 Clearing auth due to logout error...');
      secureTokenManager.clearAuth();
      toast.success("You've been signed out locally.");
      
      // Force navigation to signin
      window.location.href = '/signin';
    },
  });

  return { mutate, isPending };
};

// 📧 Forgot Password Hook - Matches your /api/forgot-password endpoint
export const useForgotPassword = () => {
  const navigate = useNavigate();
  
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ email }) => {
      testConsole.loading("FORGOT PASSWORD");
      
      // Matches your Postman collection format exactly
      const data = { email: email };
      
      const res = await axiosPublic.post("/forgot-password", data);
      return res.data;
    },
    onSuccess: (data) => {
      testConsole.success("FORGOT PASSWORD", {
        status: data.status || 'success',
        message: data.message || 'Password reset email sent',
        email: form.watch("email"),
        action: "Reset email sent successfully"
      });
      
      toast.success(data?.message || "Password reset email sent successfully");
      navigate("/forget-password-otp", {
        state: { email: form.watch("email") },
      });
    },
    onError: (error) => {
      const message = error?.response?.data?.message || error.message;
      testConsole.error("FORGOT PASSWORD", {
        error: message,
        status: error?.response?.status,
        endpoint: "/forgot-password"
      });
      toast.error(message || "Failed to send reset email");
    },
  });

  return { form, mutate, isPending };
};

// 🔄 Reset Password Hook - Matches your /api/reset-password endpoint
export const useResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      name: "",
      email,
      password: "",
      password_confirmation: "",
    },
  });

  useEffect(() => {
    if (email) {
      form.reset({
        name: "",
        email,
        password: "",
        password_confirmation: "",
      });
    }
  }, [email, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      testConsole.loading("RESET PASSWORD");
      
      // Matches your Postman collection format exactly
      const data = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      };

      const res = await axiosPublic.post("/reset-password", data);
      return res.data;
    },
    onSuccess: (data) => {
      testConsole.success("RESET PASSWORD", {
        status: data.status || 'success',
        message: data.message || 'Password reset successful',
        email: form.watch("email"),
        action: "Password reset successful"
      });
      
      toast.success(data.message || "Password reset successful");
      navigate("/login");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || error.message;
      testConsole.error("RESET PASSWORD", {
        error: message,
        status: error?.response?.status,
        endpoint: "/reset-password"
      });
      toast.error(message || "Password reset failed");
    },
  });

  return {
    form,
    mutate,
    isResetting: isPending,
  };
};

// 🔢 Verify OTP Hook - Matches your /api/verify-otp endpoint
export const useVerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const form = useForm({
    defaultValues: {
      email,
      otp: "",
    },
  });

  useEffect(() => {
    if (email) {
      form.reset({
        email,
        otp: "",
      });
    }
  }, [email, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      testConsole.loading("VERIFY OTP");
      
      // Matches your Postman collection format exactly
      const data = {
        email: formData.email,
        otp: formData.otp,
      };

      const res = await axiosPublic.post("/verify-otp", data);
      return res.data;
    },
    onSuccess: (data) => {
      testConsole.success("VERIFY OTP", {
        status: data.status || 'success',
        message: data.message || 'OTP verified successfully',
        email: form.watch("email"),
        action: "OTP verified successfully"
      });
      
      toast.success(data.message || "Email verified successfully! Please sign in to continue.");
      
      // For manual login flow, DON'T store token after OTP verification
      // User must manually sign in with email/password
      console.log('🚀 OTP Verified - Redirecting to signin for manual login')
      console.log('🚀 OTP Verified - Email:', form.watch("email"))
      
      navigate("/signin", {
        state: { 
          message: "Email verified successfully! Please sign in to continue.",
          email: form.watch("email") // Pre-fill email in signin form
        }
      });
    },
    onError: (error) => {
      const message = error?.response?.data?.message || error.message;
      testConsole.error("VERIFY OTP", {
        error: message,
        status: error?.response?.status,
        endpoint: "/verify-otp"
      });
      toast.error(message || "OTP verification failed");
    },
  });

  return {
    form,
    mutate,
    isVerifying: isPending,
  };
};

// 🔢 Reset Password OTP Verification Hook - Matches your /api/reset-verify-otp endpoint
export const useResetPasswordOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const form = useForm({
    defaultValues: {
      email,
      otp: "",
    },
  });

  useEffect(() => {
    if (email) {
      form.reset({
        email,
        otp: "",
      });
    }
  }, [email, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      testConsole.loading("RESET PASSWORD OTP VERIFICATION");
      
      // Matches your Postman collection format exactly
      const data = {
        email: formData.email,
        otp: formData.otp,
      };

      const res = await axiosPublic.post("/reset-verify-otp", data);
      return res.data;
    },
    onSuccess: (data) => {
      testConsole.success("RESET PASSWORD OTP VERIFICATION", {
        status: data.status || 'success',
        message: data.message || 'OTP verified successfully',
        email: form.watch("email"),
        action: "OTP verified for password reset"
      });
      
      toast.success(data.message || "OTP verified! You can now reset your password.");
      
      navigate("/reset-password", {
        state: { 
          email: form.watch("email"),
          verified: true
        }
      });
    },
    onError: (error) => {
      const message = error?.response?.data?.message || error.message;
      testConsole.error("RESET PASSWORD OTP VERIFICATION", {
        error: message,
        status: error?.response?.status,
        endpoint: "/reset-verify-otp"
      });
      toast.error(message || "OTP verification failed");
    },
  });

  return {
    form,
    mutate,
    isVerifying: isPending,
  };
};

// 🔍 Auth Status Hook
export const useAuthStatus = () => {
  const token = secureTokenManager.getAccessToken();
  const user = secureTokenManager.getUser();
  
  const isAuthenticated = !!token && !!user;
  
  // Test console for auth status check
  if (isAuthenticated) {
    testConsole.info("AUTH STATUS CHECK", `User authenticated: ${user?.name || user?.email}`);
  } else {
    testConsole.info("AUTH STATUS CHECK", "User not authenticated");
  }

  return {
    isAuthenticated,
    user,
    token,
    isGuest: !isAuthenticated,
  };
};

// 🛡️ Protected Route Hook
export const useRequireAuth = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStatus();

  useEffect(() => {
    if (!isAuthenticated) {
      testConsole.info("PROTECTED ROUTE", "Redirecting to login - User not authenticated");
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated;
};

// 👻 Guest Route Hook
export const useRequireGuest = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStatus();

  useEffect(() => {
    if (isAuthenticated) {
      testConsole.info("GUEST ROUTE", "Redirecting to dashboard - User already authenticated");
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return !isAuthenticated;
};
