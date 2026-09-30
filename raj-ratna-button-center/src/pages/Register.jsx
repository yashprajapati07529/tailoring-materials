import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }
      );

      if (response.data.success) {
        // Save logged-in user
        login(response.data.user);

        // Save token
        localStorage.setItem(
          "rajRatnaToken",
          response.data.token
        );

        toast.success("Registration successful!");

        navigate("/");
      }
    } catch (error) {
      console.error("Register Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Create Account
          </h1>

          <p className="text-slate-500 mt-2">
            Register with Raj Ratna Button Center
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-semibold mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Email
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

          <div>
            <label className="block text-sm font-semibold mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;