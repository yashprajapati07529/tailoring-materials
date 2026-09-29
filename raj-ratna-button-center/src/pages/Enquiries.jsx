import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import {
  FiArrowLeft,
  FiCheckCircle,
  FiMail,
  FiMessageCircle,
  FiMinus,
  FiPackage,
  FiPhone,
  FiPlus,
  FiSend,
  FiTrash2,
  FiUser,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";

const Enquiries = () => {
  const navigate = useNavigate();

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // SUBMIT ENQUIRY
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Your enquiry cart is empty.");
      navigate("/products");
      return;
    }

    if (!formData.name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }

    if (!formData.message.trim()) {
      toast.error("Please enter your enquiry message.");
      return;
    }

    try {
      setLoading(true);

      // =========================
      // PRODUCT DETAILS
      // =========================

      const productDetails = cart
        .map(
          (item, index) =>
            `${index + 1}. ${item.name}
Category: ${item.category || "N/A"}
Quantity: ${item.quantity}
Price: ₹${item.price}
Estimated Amount: ₹${
              Number(item.price || 0) *
              Number(item.quantity || 0)
            }`
        )
        .join("\n\n");

      // =========================
      // MESSAGE
      // =========================

      const finalMessage = `
Product Enquiry

Selected Products:

${productDetails}

Total Products: ${cart.length}
Total Quantity: ${totalItems}
Estimated Total: ₹${totalPrice}

Customer Message:
${formData.message}
`;

      console.log("🚀 Sending enquiry...");

      const response = await axios.post(
        "http://localhost:4000/api/contact",
        {
          type: "Product Enquiry",

          name: formData.name.trim(),

          email: formData.email.trim(),

          phone: formData.phone.trim(),

          subject: `Product Enquiry - ${cart.length} Product(s)`,

          product: cart
            .map((item) => item.name)
            .join(", "),

          quantity: cart
            .map(
              (item) =>
                `${item.name}: ${item.quantity}`
            )
            .join(", "),

          message: finalMessage,
        }
      );

      console.log("✅ Enquiry Response:", response.data);

      if (response.data.success) {
        toast.success(
          "Enquiry sent successfully!"
        );

        // WhatsApp pre-filled message
        if (response.data.whatsappUrl) {
          window.location.href =
            response.data.whatsappUrl;
        }

        // Clear cart after successful enquiry
        clearCart();

        // Clear form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (error) {
      console.error(
        "❌ Enquiry Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Enquiry send nahi hui. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // EMPTY CART
  // =========================

  if (cart.length === 0) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center px-4 py-16">

        <div className="text-center max-w-md">

          <div className="w-24 h-24 mx-auto bg-red-50 rounded-full flex items-center justify-center">
            <FiPackage
              size={42}
              className="text-red-500"
            />
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mt-7">
            No Products for Enquiry
          </h1>

          <p className="text-slate-500 mt-3 leading-6">
            Please add products to your cart before
            submitting an enquiry.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-7 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            Browse Products
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =========================
          HEADER
      ========================= */}

      <section className="bg-gradient-to-r from-red-700 to-red-600 text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-red-100 hover:text-white text-sm font-medium"
          >
            <FiArrowLeft />
            Back to Cart
          </Link>

          <p className="text-red-100 text-sm font-semibold uppercase tracking-wider mt-6">
            Raj Ratna Button Center
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Product Enquiry
          </h1>

          <p className="text-red-100 mt-2 max-w-2xl">
            Share your requirements with us and our team
            will contact you with pricing and availability.
          </p>

        </div>

      </section>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="grid lg:grid-cols-5 gap-8">

          {/* =========================
              LEFT - PRODUCTS
          ========================= */}

          <div className="lg:col-span-3">

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">

              <div className="flex items-center justify-between gap-4 mb-6">

                <div>

                  <h2 className="text-2xl font-bold text-slate-900">
                    Selected Products
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    {cart.length} product(s) • {totalItems} total units
                  </p>

                </div>

                <div className="w-11 h-11 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                  <FiPackage size={21} />
                </div>

              </div>


              {/* PRODUCTS */}

              <div className="space-y-4">

                {cart.map((item) => {

                  const minimumOrder = Number(
                    item.minimumOrder || 1
                  );

                  const itemTotal =
                    Number(item.price || 0) *
                    Number(item.quantity || 0);

                  return (
                    <div
                      key={item.id}
                      className="border border-slate-200 rounded-xl p-4"
                    >

                      <div className="flex gap-4">

                        {/* IMAGE */}

                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg bg-slate-100 shrink-0"
                        />

                        {/* DETAILS */}

                        <div className="flex-1 min-w-0">

                          <div className="flex items-start justify-between gap-3">

                            <div>

                              <p className="text-xs text-red-600 font-semibold uppercase">
                                {item.category}
                              </p>

                              <h3 className="font-bold text-slate-900 mt-1">
                                {item.name}
                              </h3>

                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                removeFromCart(item.id)
                              }
                              className="text-slate-400 hover:text-red-600"
                              title="Remove"
                            >
                              <FiTrash2 />
                            </button>

                          </div>


                          <div className="flex flex-wrap items-center justify-between gap-4 mt-3">

                            {/* QUANTITY */}

                            <div>

                              <p className="text-xs text-slate-500 mb-1">
                                Quantity
                              </p>

                              <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">

                                <button
                                  type="button"
                                  disabled={
                                    item.quantity <=
                                    minimumOrder
                                  }
                                  onClick={() =>
                                    decreaseQuantity(
                                      item.id
                                    )
                                  }
                                  className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40"
                                >
                                  <FiMinus size={14} />
                                </button>

                                <span className="w-12 text-center text-sm font-semibold">
                                  {item.quantity}
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    increaseQuantity(
                                      item.id
                                    )
                                  }
                                  className="w-8 h-8 flex items-center justify-center hover:bg-slate-100"
                                >
                                  <FiPlus size={14} />
                                </button>

                              </div>

                            </div>


                            {/* TOTAL */}

                            <div className="text-right">

                              <p className="text-xs text-slate-500">
                                Estimated
                              </p>

                              <p className="font-bold text-slate-900">
                                ₹{itemTotal}
                              </p>

                            </div>

                          </div>

                        </div>

                      </div>

                    </div>
                  );
                })}

              </div>


              {/* TOTAL */}

              <div className="mt-6 pt-5 border-t border-slate-200">

                <div className="flex justify-between text-slate-600">

                  <span>
                    Total Quantity
                  </span>

                  <span className="font-semibold text-slate-900">
                    {totalItems}
                  </span>

                </div>

                <div className="flex justify-between mt-3">

                  <span className="font-semibold text-slate-900">
                    Estimated Total
                  </span>

                  <span className="text-xl font-bold text-red-600">
                    ₹{totalPrice}
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* =========================
              RIGHT - FORM
          ========================= */}

          <div className="lg:col-span-2">

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 lg:sticky lg:top-28">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 bg-red-600 text-white rounded-xl flex items-center justify-center">
                  <FiSend size={20} />
                </div>

                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    Send Enquiry
                  </h2>

                  <p className="text-sm text-slate-500">
                    Enter your contact details
                  </p>

                </div>

              </div>


              <form
                onSubmit={handleSubmit}
                className="mt-6 space-y-5"
              >

                {/* NAME */}

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Your Name *
                  </label>

                  <div className="relative">

                    <FiUser
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full border border-slate-300 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    />

                  </div>

                </div>


                {/* EMAIL */}

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email
                  </label>

                  <div className="relative">

                    <FiMail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@gmail.com"
                      className="w-full border border-slate-300 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    />

                  </div>

                </div>


                {/* PHONE */}

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone Number *
                  </label>

                  <div className="relative">

                    <FiPhone
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="w-full border border-slate-300 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    />

                  </div>

                </div>


                {/* MESSAGE */}

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Your Requirement *
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Example: I need 500 premium shirt buttons..."
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 resize-none"
                  />

                </div>


                {/* SUMMARY */}

                <div className="bg-slate-50 rounded-xl p-4">

                  <div className="flex justify-between text-sm">

                    <span className="text-slate-500">
                      Products
                    </span>

                    <span className="font-semibold">
                      {cart.length}
                    </span>

                  </div>

                  <div className="flex justify-between text-sm mt-2">

                    <span className="text-slate-500">
                      Total Quantity
                    </span>

                    <span className="font-semibold">
                      {totalItems}
                    </span>

                  </div>

                  <div className="flex justify-between mt-3 pt-3 border-t border-slate-200">

                    <span className="font-semibold">
                      Estimated Total
                    </span>

                    <span className="font-bold text-red-600">
                      ₹{totalPrice}
                    </span>

                  </div>

                </div>


                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >

                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Sending Enquiry...
                    </>
                  ) : (
                    <>
                      <FiSend size={18} />
                      Send Enquiry
                    </>
                  )}

                </button>


                <p className="text-xs text-center text-slate-500">
                  Your enquiry will be sent to Raj Ratna Button Center.
                </p>

              </form>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Enquiries;