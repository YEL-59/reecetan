import { axiosPrivate, axiosPublic } from "@/lib/axios.config";
import {
  matchOtpSchema,
  resetPasswordSchema,
  sendOtpSchema,
  signInSchema,
  signUpSchema,
  updatePasswordSchema,
  updateProfileSchema,
} from "@/schemas/auth.schemas";

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

// 🔐 Sign Up Hook
export const useSignUp = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone_number: "",
      address: "",
      password_confirmation: "",
      terms_and_conditions: false,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload) => {
      testConsole.loading("USER REGISTRATION");
      
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (key === "terms_and_conditions") {
          formData.append(key, value ? "1" : "0");
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      const res = await axiosPublic.post("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        testConsole.success("USER REGISTRATION", {
          status: data.status,
          message: data.message,
          user: data.data?.name || 'N/A',
          email: data.data?.email || 'N/A',
          token: data.data?.token ? '✅ Generated' : '❌ Missing'
        });
        
        toast.success(data?.message || "User created successfully");
        const token = data?.data?.token;
        localStorage.setItem("token", token);
        const user = data?.data;
        localStorage.setItem("usersignup", JSON.stringify(user));
        navigate("/sign-in");
      } else {
        testConsole.error("USER REGISTRATION", data?.message || "Registration failed");
        toast.error(data?.message || "Failed to create user");
      }
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to create user";
      testConsole.error("USER REGISTRATION", {
        error: message,
        status: error?.response?.status,
        endpoint: "/auth/register"
      });
      
      if (message.includes("email")) {
        form.setError("email", { message });
      } else {
        toast.error(message);
      }
    },
  });

  return { form, mutate, isPending };
};

// 🔑 Sign In Hook
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
      const res = await axiosPublic.post("/auth/login", credentials);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        testConsole.success("USER LOGIN", {
          status: data.status,
          message: data.message,
          user: data.data?.name || 'N/A',
          email: data.data?.email || 'N/A',
          token: data.token ? '✅ Generated' : '❌ Missing',
          redirect: redirectUrl || '/'
        });
        
        toast.success(data?.message || "Sign in successfully");
        const token = data?.token;
        localStorage.setItem("token", token);
        const user = data?.data;
        localStorage.setItem("user", JSON.stringify(user));

        if (redirectUrl) {
          navigate(redirectUrl);
        } else {
          navigate("/");
        }
      } else {
        testConsole.error("USER LOGIN", data?.message || "Login failed");
        toast.error(data?.message || "Failed to sign in");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "Failed to sign in";

      testConsole.error("USER LOGIN", {
        error: message,
        status: error?.response?.status,
        endpoint: "/auth/login"
      });

      if (
        typeof message === "string" &&
        message.toLowerCase().includes("email")
      ) {
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
      const { data } = await axiosPrivate.post("/auth/logout");
      if (!data?.status) {
        throw new Error(data?.message || "Failed to logout");
      }
      return data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        testConsole.success("USER LOGOUT", {
          status: data.status,
          message: data.message,
          action: "Tokens cleared",
          redirect: "/sign-in"
        });
        
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("usersignup");
        navigate("/sign-in");
        toast.success(data?.message || "Logged out successfully");
      } else {
        testConsole.error("USER LOGOUT", "Logout failed");
        toast.error("error");
      }
    },
    onError: (error) => {
      testConsole.info("USER LOGOUT", "API failed, performing local logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("usersignup");
      toast.success("You've been signed out locally.");
      navigate("/sign-in");
    },
  });

  return { mutate, isPending };
};

// 📧 Send OTP Hook
export const useSendOtp = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(sendOtpSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ email }) => {
      testConsole.loading("SEND OTP");
      const payload = { email: email };
      const { data } = await axiosPublic.post("/auth/send-otp", payload);
      if (!data?.status) {
        throw new Error(data?.message || "Failed to send OTP");
      }
      return data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        testConsole.success("SEND OTP", {
          status: data.status,
          message: data.message,
          email: form.watch("email"),
          action: "OTP sent successfully"
        });
        
        navigate("/verification", {
          state: { email: form.watch("email") },
        });
        toast.success(data?.message || "OTP sent successfully");
      } else {
        testConsole.error("SEND OTP", "Failed to send OTP");
        toast.error("error");
      }
    },
    onError: (error) => {
      const message = error?.response?.data?.message || error.message;
      testConsole.error("SEND OTP", {
        error: message,
        status: error?.response?.status,
        endpoint: "/auth/send-otp"
      });
      toast.error(message || "Failed to send OTP");
    },
  });

  return { form, mutate, isPending };
};

// 🔢 Match OTP Hook
export const useMatchOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const form = useForm({
    resolver: zodResolver(matchOtpSchema),
    defaultValues: {
      email,
      otp0: "",
      otp1: "",
      otp2: "",
      otp3: "",
    },
  });

  useEffect(() => {
    if (email) {
      form.reset({
        email,
        otp0: "",
        otp1: "",
        otp2: "",
        otp3: "",
      });
    }
  }, [email, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      testConsole.loading("VERIFY OTP");
      
      const otp =
        `${formData.otp0}${formData.otp1}${formData.otp2}${formData.otp3}`
          .replace(/\s/g, "")
          .toUpperCase();

      const payload = {
        email: formData.email,
        otp,
      };

      const { data } = await axiosPublic.post("/auth/verify-otp", payload);
      return data;
    },
    onSuccess: (data) => {
      testConsole.success("VERIFY OTP", {
        status: data.status || true,
        message: data.message,
        email: form.watch("email"),
        action: "OTP verified successfully"
      });
      
      navigate("/verificationsuccess", {
        state: { email: form.watch("email") },
      });
      toast.success(data.message || "OTP Verified");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || error.message;
      testConsole.error("VERIFY OTP", {
        error: message,
        status: error?.response?.status,
        endpoint: "/auth/verify-otp"
      });
      toast.error(message || "OTP verification failed");
    },
  });

  return {
    form,
    matchOtp: mutate,
    isMatching: isPending,
  };
};

// 🔄 Reset Password Hook
export const useResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email,
      password: "",
      password_confirmation: "",
    },
  });

  useEffect(() => {
    if (email) {
      form.reset({
        email,
        password: "",
        password_confirmation: "",
      });
    }
  }, [email, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      testConsole.loading("RESET PASSWORD");
      
      const payload = {
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      };

      const { data } = await axiosPublic.post("/auth/reset-password", payload);

      if (!data?.status) {
        throw new Error(data?.message || "Reset failed");
      }

      return data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        testConsole.success("RESET PASSWORD", {
          status: data.status,
          message: data.message,
          email: form.watch("email"),
          action: "Password reset successful"
        });
        
        toast.success(data.message || "Password reset successful");
        navigate("/sign-in");
      }
    },
    onError: (error) => {
      const message = error?.response?.data?.message || error.message;
      testConsole.error("RESET PASSWORD", {
        error: message,
        status: error?.response?.status,
        endpoint: "/auth/reset-password"
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

// 🔐 Update Password Hook
export const useUpdatePassword = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      testConsole.loading("UPDATE PASSWORD");
      
      const payload = {
        current_password: formData.current_password,
        new_password: formData.new_password,
        new_password_confirmation: formData.new_password_confirmation,
      };

      const { data } = await axiosPrivate.post(
        "/dashboard/password/update",
        payload
      );

      if (!data?.status) {
        throw new Error(data?.message || "Update failed");
      }

      return data;
    },
    onSuccess: (data) => {
      testConsole.success("UPDATE PASSWORD", {
        status: data.status,
        message: data.message,
        action: "Password updated successfully",
        redirect: "/sign-in"
      });
      
      toast.success(data.message || "Password update successful");
      navigate("/sign-in");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || error.message;
      testConsole.error("UPDATE PASSWORD", {
        error: message,
        status: error?.response?.status,
        endpoint: "/dashboard/password/update"
      });
      toast.error(message || "Password update failed");
    },
  });

  return {
    form,
    updatePassword: mutate,
    isUpdating: isPending,
  };
};

// 👤 Update User Profile Hook
export const useUpdateUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
      phone_number: "",
      avatar: "",
      address: "",
    },
  });

  const { mutate: updateUser, isPending: isLoading } = useMutation({
    mutationFn: async (data) => {
      testConsole.loading("UPDATE USER PROFILE");
      
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("phone_number", data.phone_number);
      formData.append("address", data.address);

      if (data.avatar instanceof File) {
        formData.append("avatar", data.avatar);
      }

      const res = await axiosPrivate.post(
        "/dashboard/profile/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data;
    },
    onSuccess: (data) => {
      testConsole.success("UPDATE USER PROFILE", {
        status: data.status || true,
        message: data.message,
        user: data?.data?.user?.name || 'Updated',
        action: "Profile updated successfully"
      });
      
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["userprofile"] });
      navigate("/dashboard");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Something went wrong";
      testConsole.error("UPDATE USER PROFILE", {
        error: message,
        status: error?.response?.status,
        endpoint: "/dashboard/profile/update"
      });
      toast.error(message);
    },
  });

  return { form, updateUser, isLoading };
};

// 👤 Get User Profile Hook
export const useGetUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["userprofile"],
    queryFn: async () => {
      testConsole.loading("GET USER PROFILE");
      const res = await axiosPrivate.get("/profile");
      
      testConsole.success("GET USER PROFILE", {
        status: res.data?.status || true,
        user: res.data?.data?.name || 'N/A',
        email: res.data?.data?.email || 'N/A',
        phone: res.data?.data?.phone_number || 'N/A',
        action: "Profile fetched successfully"
      });
      
      return res.data;
    },
    refetchOnWindowFocus: false,
    onError: (error) => {
      testConsole.error("GET USER PROFILE", {
        error: error.message,
        status: error?.response?.status,
        endpoint: "/profile"
      });
    }
  });

  return { user: data?.data, isLoading };
};

// 🔍 Auth Status Hook
export const useAuthStatus = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
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
      navigate('/sign-in', { replace: true });
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

// 🎯 Test All APIs Hook (for development/testing)
export const useTestAllAPIs = () => {
  const testSignUp = useSignUp();
  const testSignIn = useSignIn();
  const testSendOtp = useSendOtp();
  const testMatchOtp = useMatchOtp();
  const testResetPassword = useResetPassword();
  const testUpdatePassword = useUpdatePassword();
  const testUpdateUser = useUpdateUser();
  const testGetUser = useGetUser();
  const testSignout = useSignout();

  const runAllTests = () => {
    console.log(`%c🚀 STARTING COMPREHENSIVE AUTH API TESTS`, 
      'color: #10B981; font-weight: bold; font-size: 16px; background: #1F2937; padding: 10px;');
    console.log('═'.repeat(80));
    
    // You can uncomment these to test individual APIs
    // testSignUp.mutate({ /* test data */ });
    // testSignIn.mutate({ /* test data */ });
    // testSendOtp.mutate({ /* test data */ });
    // ... etc
    
    testConsole.info("TEST SUITE", "All auth hooks initialized and ready for testing!");
  };

  return {
    testSignUp,
    testSignIn,
    testSendOtp,
    testMatchOtp,
    testResetPassword,
    testUpdatePassword,
    testUpdateUser,
    testGetUser,
    testSignout,
    runAllTests,
  };
};