import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    if (!formData.password.trim()) {
      toast.error("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      // MongoDB Backend Login API
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email: formData.email.trim(),
          password: formData.password,
        }
      );

      console.log("Login Response:", response.data);

      if (response.data.success) {
        // Save user in AuthContext
        login(response.data.user);

        // Save JWT token
        localStorage.setItem(
          "rajRatnaToken",
          response.data.token
        );

        toast.success("Login successful!");

        // Admin → Admin Dashboard
        if (response.data.user.role === "admin") {
          navigate("/admin");
        } else {
          // Normal User → Home
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-2xl font-bold">
            RR
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mt-5">
            Welcome Back
          </h1>

          <p className="text-slate-500 mt-2">
            Login to Raj Ratna Button Center
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-red-600 font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;