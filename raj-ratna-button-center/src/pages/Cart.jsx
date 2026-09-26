import { Link } from "react-router-dom";

import {
  FiTrash2,
  FiMinus,
  FiPlus,
  FiShoppingCart,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";


const Cart = () => {

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();


  // Empty Cart

  if (cart.length === 0) {

    return (

      <div className="max-w-7xl mx-auto px-4 py-24 text-center">

        <FiShoppingCart
          size={60}
          className="mx-auto text-gray-300"
        />

        <h1 className="text-3xl font-bold mt-6">
          Your Cart is Empty
        </h1>

        <p className="text-gray-500 mt-2">
          Add some tailoring materials to your cart.
        </p>

        <Link
          to="/products"
          className="inline-block mt-6 bg-red-600 text-white px-6 py-3 rounded-lg"
        >
          Browse Products
        </Link>

      </div>

    );

  }


  return (

    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <p className="text-red-600 font-semibold">
            RAJ RATNA BUTTON CENTER
          </p>

          <h1 className="text-4xl font-bold mt-2">
            Shopping Cart
          </h1>

        </div>


        <button
          onClick={clearCart}
          className="text-red-600 hover:underline"
        >
          Clear Cart
        </button>

      </div>


      <div className="grid lg:grid-cols-3 gap-8">

        {/* Products */}

        <div className="lg:col-span-2 space-y-5">

          {cart.map((item) => (

            <div
              key={item.id}
              className="bg-white border rounded-xl p-5"
            >

              <div className="flex gap-5">

                {/* Image */}

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-lg"
                />


                {/* Details */}

                <div className="flex-1">

                  <div className="flex justify-between">

                    <div>

                      <p className="text-sm text-red-600">
                        {item.category}
                      </p>

                      <h2 className="font-bold text-lg">
                        {item.name}
                      </h2>

                    </div>


                    <button
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      className="text-red-600"
                    >
                      <FiTrash2 />
                    </button>

                  </div>


                  <p className="font-bold text-xl mt-3">
                    ₹{item.price}
                  </p>


                  {/* Quantity */}

                  <div className="flex items-center justify-between mt-4">

                    <div className="flex items-center border rounded-lg">

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                        className="px-3 py-2"
                      >
                        <FiMinus />
                      </button>

                      <span className="px-4">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                        className="px-3 py-2"
                      >
                        <FiPlus />
                      </button>

                    </div>


                    <p className="font-bold">

                      ₹
                      {item.price * item.quantity}

                    </p>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>


        {/* Summary */}

        <div>

          <div className="bg-white border rounded-xl p-6 sticky top-28">

            <h2 className="text-2xl font-bold">
              Order Summary
            </h2>


            <div className="flex justify-between mt-6 text-gray-600">

              <span>
                Total Items
              </span>

              <span>
                {totalItems}
              </span>

            </div>


            <div className="flex justify-between mt-4 text-gray-600">

              <span>
                Subtotal
              </span>

              <span>
                ₹{totalPrice}
              </span>

            </div>


            <div className="border-t my-5" />


            <div className="flex justify-between text-xl font-bold">

              <span>
                Total
              </span>

              <span>
                ₹{totalPrice}
              </span>

            </div>


            <button className="w-full bg-red-600 text-white py-3 rounded-lg mt-6 font-semibold">
              Proceed to Enquiry
            </button>


            <Link
              to="/products"
              className="block text-center text-red-600 mt-4"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </div>

    </div>

  );
};


export default Cart;