import { Link } from "react-router-dom";

import {
  FiHeart,
  FiShoppingCart,
} from "react-icons/fi";

import toast from "react-hot-toast";

import { useCart } from "../context/CartContext";
import {
  useWishlist,
} from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const handleAddToCart = () => {
    addToCart(product);

    toast.success(
      `${product.name} added to cart`
    );
  };

  const handleWishlist = () => {
    const alreadyAdded =
      isInWishlist(product.id);

    toggleWishlist(product);

    toast.success(
      alreadyAdded
        ? "Removed from wishlist"
        : "Added to wishlist"
    );
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gray-100 sm:h-56">

        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/800x600/e5e7eb/374151?text=Product+Image";
          }}
        />

        <button
          type="button"
          onClick={handleWishlist}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-red-50"
        >
          <FiHeart
            size={19}
            className={
              isInWishlist(product.id)
                ? "fill-red-600 text-red-600"
                : "text-gray-700"
            }
          />
        </button>

        <div className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-red-600 shadow">
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">

        <Link
          to={`/products/${product.id}`}
        >
          <h3 className="line-clamp-2 min-h-12 text-lg font-bold text-gray-900 transition hover:text-red-600">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-1">
          <span className="text-yellow-500">
            ★
          </span>

          <span className="text-sm font-semibold text-gray-600">
            {product.rating}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-2xl font-black text-gray-900">
            ₹{product.price}
          </span>

          {product.wholesalePrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.wholesalePrice}
            </span>
          )}
        </div>

        <p className="mt-1 text-sm font-medium text-green-600">
          Wholesale ₹{product.wholesalePrice}
        </p>

        <p className="mt-2 text-xs text-gray-500">
          Minimum order:{" "}
          <span className="font-semibold">
            {product.minimumOrder} pieces
          </span>
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2">

          <Link
            to={`/products/${product.id}`}
            className="rounded-xl border border-red-600 py-2.5 text-center text-sm font-bold text-red-600 transition hover:bg-red-50"
          >
            View
          </Link>

          <button
            type="button"
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-600 py-2.5 text-sm font-bold text-white transition hover:bg-red-700 active:scale-95"
          >
            <FiShoppingCart />
            Add
          </button>

        </div>
      </div>
    </article>
  );
};

export default ProductCard;