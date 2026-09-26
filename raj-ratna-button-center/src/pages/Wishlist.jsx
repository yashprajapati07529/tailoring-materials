import {
  Link,
} from "react-router-dom";

import {
  FiHeart,
  FiTrash2,
} from "react-icons/fi";

import {
  useWishlist,
} from "../context/WishlistContext";

const Wishlist = () => {
  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();

  return (
    <section className="py-10">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <h1 className="text-3xl font-black">
            My Wishlist
          </h1>

          <p className="mt-2 text-gray-500">
            Products you saved for later.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">

            <FiHeart
              size={50}
              className="mx-auto text-gray-300"
            />

            <h2 className="mt-5 text-xl font-black">
              Wishlist is empty
            </h2>

            <Link
              to="/products"
              className="mt-6 inline-block rounded-xl bg-red-600 px-6 py-3 font-bold text-white"
            >
              Explore Products
            </Link>

          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {wishlist.map(
              (product) => (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-48 w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/800x600/e5e7eb/374151?text=Product";
                    }}
                  />

                  <div className="p-5">

                    <h2 className="font-bold">
                      {product.name}
                    </h2>

                    <p className="mt-2 text-xl font-black">
                      ₹{product.price}
                    </p>

                    <div className="mt-4 flex gap-2">

                      <Link
                        to={`/products/${product.id}`}
                        className="flex-1 rounded-xl bg-red-600 py-2 text-center text-sm font-bold text-white"
                      >
                        View
                      </Link>

                      <button
                        onClick={() =>
                          removeFromWishlist(
                            product.id
                          )
                        }
                        className="rounded-xl border border-gray-200 px-4 text-red-600"
                      >
                        <FiTrash2 />
                      </button>

                    </div>

                  </div>
                </div>
              )
            )}

          </div>
        )}

      </div>
    </section>
  );
};

export default Wishlist;