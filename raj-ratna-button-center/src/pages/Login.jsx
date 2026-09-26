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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:5000/users?email=${encodeURIComponent(
          formData.email.trim()
        )}&password=${encodeURIComponent(formData.password)}`
      );

      if (response.data.length === 0) {
        toast.error("Invalid email or password");
        return;
      }

      const user = response.data[0];

      login(user);

      toast.success(
        user.role === "admin"
          ? "Admin login successful!"
          : "Login successful!"
      );

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Server error. Please start JSON Server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-8">

          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">
              RR
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mt-4">
              Welcome Back
            </h1>

            <p className="text-gray-500 text-sm mt-2">
              Login to Raj Ratna Button Center
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@rajratna.com"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-3 rounded-xl transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-red-600 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Admin Login
            </p>

            <p className="text-sm text-center font-semibold text-gray-800 mt-1">
              admin@rajratna.com
            </p>

            <p className="text-sm text-center font-semibold text-gray-800">
              Password: admin123
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;