import { Link, useNavigate } from "react-router-dom";

import {
  FiTrash2,
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiArrowRight,
  FiPackage,
  FiMessageCircle,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";

const Cart = () => {
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

  // =========================
  // EMPTY CART
  // =========================

  if (cart.length === 0) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md">

          <div className="w-24 h-24 mx-auto bg-red-50 rounded-full flex items-center justify-center">
            <FiShoppingCart
              size={42}
              className="text-red-500"
            />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-7">
            Your Enquiry Cart is Empty
          </h1>

          <p className="text-slate-500 mt-3 leading-6">
            Add tailoring materials to your cart and
            send us your enquiry for pricing and availability.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-7 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            <FiPackage />
            Browse Products
          </Link>

        </div>
      </div>
    );
  }

  // =========================
  // PROCEED TO ENQUIRY
  // =========================

  const handleProceedToEnquiry = () => {
    navigate("/enquiries");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =========================
          HEADER
      ========================= */}

      <section className="bg-gradient-to-r from-red-700 to-red-600 text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          <p className="text-red-100 text-sm font-semibold uppercase tracking-wider">
            Raj Ratna Button Center
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

            <div>
              <h1 className="text-3xl md:text-4xl font-bold mt-2">
                Your Enquiry Cart
              </h1>

              <p className="text-red-100 mt-2">
                Review your products before sending an enquiry.
              </p>
            </div>

            <div className="bg-white/15 border border-white/20 rounded-xl px-5 py-3">
              <p className="text-sm text-red-100">
                Total Products
              </p>

              <p className="text-2xl font-bold">
                {cart.length}
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =========================
          MAIN
      ========================= */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* =========================
              CART PRODUCTS
          ========================= */}

          <div className="lg:col-span-2 space-y-5">

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
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
                >

                  <div className="flex flex-col sm:flex-row gap-5">

                    {/* IMAGE */}

                    <div className="shrink-0">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full sm:w-32 h-32 object-cover rounded-xl bg-slate-100"
                      />

                    </div>


                    {/* DETAILS */}

                    <div className="flex-1">

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
                            {item.category}
                          </p>

                          <h2 className="text-xl font-bold text-slate-900 mt-1">
                            {item.name}
                          </h2>

                          <p className="text-sm text-slate-500 mt-1">
                            Seller: {item.seller || "Raj Ratna Button Center"}
                          </p>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                          title="Remove"
                        >
                          <FiTrash2 size={19} />
                        </button>

                      </div>


                      {/* PRICE */}

                      <div className="flex flex-wrap items-center gap-3 mt-4">

                        <span className="text-xl font-bold text-slate-900">
                          ₹{item.price}
                        </span>

                        <span className="text-sm text-slate-500">
                          per unit
                        </span>

                        {item.wholesalePrice && (
                          <span className="text-sm font-semibold text-green-600">
                            Wholesale: ₹{item.wholesalePrice}
                          </span>
                        )}

                      </div>


                      {/* MINIMUM ORDER */}

                      <div className="mt-3 inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg text-xs font-medium">
                        <FiPackage />
                        Minimum Order: {minimumOrder}
                      </div>


                      {/* QUANTITY + TOTAL */}

                      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        {/* QUANTITY */}

                        <div>

                          <p className="text-xs text-slate-500 mb-2">
                            Quantity
                          </p>

                          <div className="inline-flex items-center border border-slate-300 rounded-xl overflow-hidden">

                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(item.id)
                              }
                              disabled={
                                item.quantity <= minimumOrder
                              }
                              className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              <FiMinus />
                            </button>

                            <span className="w-14 text-center font-semibold text-slate-900">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(item.id)
                              }
                              className="w-10 h-10 flex items-center justify-center hover:bg-slate-100"
                            >
                              <FiPlus />
                            </button>

                          </div>

                        </div>


                        {/* ITEM TOTAL */}

                        <div className="sm:text-right">

                          <p className="text-xs text-slate-500">
                            Estimated Amount
                          </p>

                          <p className="text-2xl font-bold text-slate-900 mt-1">
                            ₹{itemTotal}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}


            {/* CONTINUE SHOPPING */}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">

              <Link
                to="/products"
                className="text-red-600 hover:text-red-700 font-semibold inline-flex items-center gap-2"
              >
                ← Continue Shopping
              </Link>

              <button
                type="button"
                onClick={clearCart}
                className="text-sm text-slate-500 hover:text-red-600 transition"
              >
                Clear Enquiry Cart
              </button>

            </div>

          </div>


          {/* =========================
              SUMMARY
          ========================= */}

          <div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 lg:sticky lg:top-28">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                  <FiShoppingCart size={21} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Enquiry Summary
                  </h2>

                  <p className="text-sm text-slate-500">
                    Your selected products
                  </p>
                </div>

              </div>


              {/* TOTAL ITEMS */}

              <div className="flex justify-between mt-7 text-slate-600">

                <span>
                  Total Items
                </span>

                <span className="font-semibold text-slate-900">
                  {totalItems}
                </span>

              </div>


              {/* PRODUCTS */}

              <div className="flex justify-between mt-4 text-slate-600">

                <span>
                  Products
                </span>

                <span className="font-semibold text-slate-900">
                  {cart.length}
                </span>

              </div>


              {/* SUBTOTAL */}

              <div className="flex justify-between mt-4 text-slate-600">

                <span>
                  Estimated Subtotal
                </span>

                <span className="font-semibold text-slate-900">
                  ₹{totalPrice}
                </span>

              </div>


              <div className="border-t border-slate-200 my-6" />


              {/* TOTAL */}

              <div className="flex justify-between items-center">

                <span className="text-lg font-bold text-slate-900">
                  Estimated Total
                </span>

                <span className="text-2xl font-bold text-red-600">
                  ₹{totalPrice}
                </span>

              </div>


              {/* NOTE */}

              <div className="mt-5 bg-red-50 border border-red-100 rounded-xl p-4">

                <p className="text-sm text-red-700 leading-6">
                  Final price may vary based on quantity,
                  wholesale pricing and product availability.
                </p>

              </div>


              {/* ENQUIRY BUTTON */}

              <button
                type="button"
                onClick={handleProceedToEnquiry}
                className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-red-100"
              >
                <FiMessageCircle size={19} />
                Proceed to Enquiry
                <FiArrowRight size={18} />
              </button>


              <Link
                to="/products"
                className="block text-center text-red-600 hover:text-red-700 font-medium mt-4"
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Cart;