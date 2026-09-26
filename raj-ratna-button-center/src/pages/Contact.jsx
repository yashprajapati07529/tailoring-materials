import {
  useState,
} from "react";

import toast from "react-hot-toast";

const Contact = () => {
  const [form, setForm] =
    useState({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.message
    ) {
      toast.error(
        "Please fill required fields"
      );
      return;
    }

    toast.success(
      "Message sent successfully"
    );

    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <section className="py-12">

      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2">

        <div className="rounded-3xl bg-gray-950 p-8 text-white sm:p-10">

          <p className="font-bold text-red-400">
            GET IN TOUCH
          </p>

          <h1 className="mt-3 text-4xl font-black">
            Let's Talk
          </h1>

          <p className="mt-5 leading-7 text-gray-400">
            Have a product enquiry or wholesale requirement?
            Send us a message.
          </p>

          <div className="mt-10 space-y-5 text-gray-300">
            <p>📞 +91 98765 43210</p>
            <p>✉️ info@rajratna.com</p>
            <p>📍 Surat, Gujarat, India</p>
          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10"
        >

          {[
            ["name", "Name"],
            ["email", "Email"],
            ["phone", "Phone"],
          ].map(
            ([name, label]) => (
              <div
                key={name}
                className="mb-5"
              >
                <label className="mb-2 block text-sm font-bold">
                  {label}
                </label>

                <input
                  name={name}
                  value={form[name]}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [name]:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500"
                />
              </div>
            )
          )}

          <div>
            <label className="mb-2 block text-sm font-bold">
              Message
            </label>

            <textarea
              rows="5"
              value={form.message}
              onChange={(e) =>
                setForm({
                  ...form,
                  message:
                    e.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <button className="mt-5 w-full rounded-xl bg-red-600 py-3.5 font-bold text-white hover:bg-red-700">
            Send Message
          </button>

        </form>

      </div>
    </section>
  );
};

export default Contact;