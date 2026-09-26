import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      phone,
      password,
    } = formData;

    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password.trim()
    ) {
      toast.error(
        "Please fill all fields"
      );
      return;
    }

    try {
      setLoading(true);

      const usersResponse =
        await axios.get(
          "http://localhost:5000/users"
        );

      const exists =
        usersResponse.data.some(
          (user) =>
            user.email
              ?.toLowerCase()
              .trim() ===
            email
              .toLowerCase()
              .trim()
        );

      if (exists) {
        toast.error(
          "Email already registered"
        );
        return;
      }

      await axios.post(
        "http://localhost:5000/users",
        {
          name: name.trim(),
          email:
            email.trim().toLowerCase(),
          phone: phone.trim(),
          password,
          role: "user",
        }
      );

      toast.success(
        "Registration successful"
      );

      navigate("/login");

    } catch (error) {
      console.error(error);

      toast.error(
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">

      <div className="w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-6 shadow-xl sm:p-10">

        <div className="mb-8 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 font-black text-white">
            RR
          </div>

          <h1 className="mt-5 text-3xl font-black">
            Create Account
          </h1>

          <p className="mt-2 text-gray-500">
            Register as a customer.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-5 sm:grid-cols-2"
        >

          <div>
            <label className="mb-2 block text-sm font-bold">
              Full Name
            </label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">
              Phone
            </label>

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-bold">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-bold">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <button
            disabled={loading}
            className="sm:col-span-2 rounded-xl bg-red-600 py-3.5 font-bold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-red-600"
          >
            Login
          </Link>
        </p>

      </div>
    </section>
  );
};

export default Register;