import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiSend,
  FiMessageCircle,
  FiClock,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

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
  // FORM SUBMIT
  // =========================
  const handleSubmit = async () => {
    console.log("🔥 HANDLE SUBMIT RUNNING");
    console.log("FORM DATA:", formData);

    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    if (!formData.message.trim()) {
      toast.error("Please enter your message");
      return;
    }

    try {
      setLoading(true);

      console.log("🚀 API REQUEST STARTING");

      const response = await axios.post(
        "http://localhost:4000/api/contact",
        {
          type: "Contact",
          ...formData,
        }
      );

      console.log("✅ API RESPONSE:", response.data);

      if (response.data.success) {
        toast.success("Message sent successfully!");

        // Open WhatsApp with pre-filled message
        if (response.data.whatsappUrl) {
          window.location.href = response.data.whatsappUrl;
        }

        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("❌ Contact Error:", error);

      toast.error(
        error.response?.data?.message ||
        "Message send nahi hua. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-red-500 text-white">

        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full" />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-white/10 rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 px-4 py-2 rounded-full text-sm font-medium">
              <FiMessageCircle />
              Raj Ratna Button Center
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Let's Talk About
              <span className="block text-red-100">
                Your Requirements
              </span>
            </h1>

            <p className="mt-5 text-red-100 text-base sm:text-lg leading-7 max-w-2xl">
              Buttons, laces, zippers, threads aur
              tailoring materials ke liye humse contact
              karein. Bulk orders aur product enquiries
              ke liye bhi hum available hain.
            </p>

          </div>

        </div>
      </section>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">

          {/* =================================================
              LEFT INFORMATION
          ================================================= */}
          <div className="lg:col-span-2">

            <div>
              <p className="text-red-600 font-semibold text-sm uppercase tracking-wider">
                Contact Information
              </p>

              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
                Get In Touch
              </h2>

              <p className="mt-4 text-slate-600 leading-7">
                Aap humse phone, WhatsApp ya email ke
                through contact kar sakte hain. Hamari
                team aapki product requirements ke liye
                help karne ke liye ready hai.
              </p>
            </div>


            {/* CONTACT CARDS */}
            <div className="mt-8 space-y-4">

              {/* PHONE */}
              <a
                href="tel:+918780005274"
                className="group flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-red-200 transition"
              >
                <div className="shrink-0 w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition">
                  <FiPhone size={22} />
                </div>

                <div className="flex-1">
                  <p className="text-sm text-slate-500">
                    Phone / WhatsApp
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    +91 87800 05274
                  </p>
                </div>

                <FiArrowRight className="text-slate-400 group-hover:text-red-600 transition" />
              </a>


              {/* EMAIL */}
              <a
                href="mailto:yashprajapati07529@gmail.com"
                className="group flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-red-200 transition"
              >
                <div className="shrink-0 w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition">
                  <FiMail size={22} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-500">
                    Email
                  </p>

                  <p className="mt-1 font-semibold text-slate-900 break-all">
                    yashprajapati07529@gmail.com
                  </p>
                </div>

                <FiArrowRight className="shrink-0 text-slate-400 group-hover:text-red-600 transition" />
              </a>


              {/* LOCATION */}
              <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

                <div className="shrink-0 w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                  <FiMapPin size={22} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Location
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    Surat, Gujarat, India
                  </p>
                </div>

              </div>


              {/* BUSINESS HOURS */}
              <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

                <div className="shrink-0 w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                  <FiClock size={22} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Business Hours
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    Mon - Sat: 9:00 AM - 7:00 PM
                  </p>
                </div>

              </div>

            </div>


            {/* WHY CONTACT US */}
            <div className="mt-6 bg-red-50 border border-red-100 rounded-2xl p-6">

              <h3 className="font-bold text-slate-900 text-lg">
                Why Contact Us?
              </h3>

              <div className="mt-4 space-y-3">

                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-red-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-600">
                    Bulk and wholesale requirements
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-red-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-600">
                    Product availability information
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-red-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-600">
                    Pricing and quantity enquiries
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              CONTACT FORM
          ================================================= */}
          <div className="lg:col-span-3">

            <div className="bg-white border border-slate-200 rounded-3xl shadow-lg p-6 sm:p-8 md:p-10">

              {/* FORM HEADER */}
              <div className="pb-6 border-b border-slate-100">

                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center">
                    <FiSend size={21} />
                  </div>

                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      Send Us a Message
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      Fill the form and our team will contact you.
                    </p>
                  </div>

                </div>

              </div>


              {/* FORM */}
              <form
                className="mt-7 space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >

                {/* NAME */}
                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Your Name
                    <span className="text-red-600 ml-1">*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-slate-900 placeholder:text-slate-400 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition"
                  />

                </div>


                {/* EMAIL + PHONE */}
                <div className="grid sm:grid-cols-2 gap-5">

                  {/* EMAIL */}
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
                      autoComplete="email"
                      className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-slate-900 placeholder:text-slate-400 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition"
                    />

                  </div>


                  {/* PHONE */}
                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number
                      <span className="text-red-600 ml-1">*</span>
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      autoComplete="tel"
                      className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-slate-900 placeholder:text-slate-400 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition"
                    />

                  </div>

                </div>


                {/* SUBJECT */}
                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What do you need help with?"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-slate-900 placeholder:text-slate-400 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition"
                  />

                </div>


                {/* MESSAGE */}
                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Message
                    <span className="text-red-600 ml-1">*</span>
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirement..."
                    rows={6}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-slate-900 placeholder:text-slate-400 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition resize-none"
                  />

                </div>


                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition duration-200 shadow-lg shadow-red-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >

                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend size={19} />
                      Send Message
                    </>
                  )}

                </button>


                {/* SMALL NOTE */}
                <p className="text-center text-xs text-slate-500">
                  Your message will be securely sent to our team.
                </p>

              </form>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">

          <div>

            <h2 className="text-2xl md:text-3xl font-bold">
              Need a Quick Response?
            </h2>

            <p className="mt-2 text-red-100">
              Call or WhatsApp us directly for urgent enquiries.
            </p>

          </div>

          <a
            href="https://wa.me/918780005274"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-white text-red-600 hover:bg-red-50 font-semibold px-6 py-3.5 rounded-xl transition"
          >
            <FiMessageCircle size={20} />
            WhatsApp Us
          </a>

        </div>

      </section>

    </div>
  );
};

export default Contact;