import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import API from "../../api/axios.js";
import { setUser } from "../../redux/userSlice.js";
import CV from "../assets/CV.png";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // React‑Hook‑Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // signup submit handler
  const onSubmit = async (data) => {
    setSubmitted(true);
    try {
      const res = await API.post("/auth/register", data);
      const { token, userId } = res.data;

      // store local data
      localStorage.setItem("cv_token", token);
      localStorage.setItem("cv_user", JSON.stringify({ username: data.username, id: userId }));

      dispatch(setUser({ user: { username: data.username, id: userId }, token }));

      navigate("/dashboard");
      reset();
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setSubmitted(false);
    }
  };

  // Google signup
  const handleGoogleSignup = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Logo and heading */}
        <div className="flex flex-col items-center text-center mb-6">
          <img src={CV} alt="logo" className="w-16 h-16 mb-4 rounded-full" />
          <h1 className="text-3xl font-bold text-blue-700">CareerMaker</h1>
          <p className="text-gray-500 mt-2">Create your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              {...register("username", { required: "Username is required" })}
              type="text"
              placeholder="Enter your username"
              className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${
                errors.username ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email",
                },
              })}
              type="email"
              placeholder="you@example.com"
              className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${
                errors.email ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Contact number (optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number <span className="text-gray-400">(optional)</span>
            </label>
            <input
              {...register("contact", {
                pattern: {
                  value: /^[0-9+\s()-]*$/,
                  message: "Enter a valid phone number",
                },
              })}
              type="text"
              placeholder="+91 98765 43210"
              className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${
                errors.contact ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.contact && (
              <p className="text-sm text-red-500 mt-1">
                {errors.contact.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="At least 6 characters"
                className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 pr-10 ${
                  errors.password ? "border-red-400" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7 9 4 9 7a5.002 5.002 0 01-9 4.825zm-3.9-9.65A2.997 2.997 0 0012 9c1.657 0 3 1.343 3 3 0 .528-.132 1.026-.373 1.465M15 15l6 6" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5C7 4.5 3 8.5 3 12s4 7.5 9 7.5 9-4 9-7.5-4-7.5-9-7.5z" />
                    <circle cx="12" cy="12" r="2.5" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 mt-0.5 border-gray-300 text-blue-600 focus:ring-blue-500 rounded"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree to the{" "}
              <a href="/terms" className="text-blue-600 hover:text-blue-800 font-medium">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">
                Privacy Policy
              </a>.
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={submitted}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {submitted ? "Creating Account..." : "Create Account"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google signup */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm transition"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-gray-700 font-medium">Sign up with Google</span>
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:text-blue-800 font-medium underline underline-offset-2"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}