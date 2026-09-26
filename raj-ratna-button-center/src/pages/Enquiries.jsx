import {
  useState,
} from "react";

import toast from "react-hot-toast";

const Enquiries = () => {
  const [form, setForm] =
    useState({
      product: "",
      quantity: "",
      message: "",
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.product ||
      !form.quantity
    ) {
      toast.error(
        "Please enter product and quantity"
      );
      return;
    }

    toast.success(
      "Enquiry submitted successfully"
    );

    setForm({
      product: "",
      quantity: "",
      message: "",
    });
  };

  return (
    <section className="py-12">

      <div className="mx-auto max-w-2xl px-4">

        <div className="mb-8 text-center">
          <p className="font-bold text-red-600">
            BUSINESS ENQUIRY
          </p>

          <h1 className="mt-2 text-4xl font-black">
            Send Product Enquiry
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10"
        >

          <div className="space-y-5">

            <div>
              <label className="mb-2 block text-sm font-bold">
                Product Name
              </label>

              <input
                value={form.product}
                onChange={(e) =>
                  setForm({
                    ...form,
                    product:
                      e.target.value,
                  })
                }
                placeholder="Example: Designer Button"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold">
                Required Quantity
              </label>

              <input
                type="number"
                value={form.quantity}
                onChange={(e) =>
                  setForm({
                    ...form,
                    quantity:
                      e.target.value,
                  })
                }
                placeholder="100"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500"
              />
            </div>

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

            <button className="w-full rounded-xl bg-red-600 py-3.5 font-bold text-white hover:bg-red-700">
              Submit Enquiry
            </button>

          </div>
        </form>

      </div>
    </section>
  );
};

export default Enquiries;