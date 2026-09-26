import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";

import {
  FiArrowLeft,
  FiHeart,
  FiShoppingCart,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";
import {
  useWishlist,
} from "../context/WishlistContext";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  useEffect(() => {
    const fetchProduct =
      async () => {
        try {
          const response =
            await axios.get(
              `http://localhost:5000/products/${id}`
            );

          setProduct(response.data);
        } catch {
          setProduct(null);
        } finally {
          setLoading(false);
        }
      };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-black">
          Product Not Found
        </h1>

        <Link
          to="/products"
          className="mt-5 inline-block rounded-xl bg-red-600 px-5 py-3 font-bold text-white"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const handleCart = () => {
    addToCart(product);
    toast.success(
      `${product.name} added to cart`
    );
  };

  const handleWishlist = () => {
    const exists =
      isInWishlist(product.id);

    toggleWishlist(product);

    toast.success(
      exists
        ? "Removed from wishlist"
        : "Added to wishlist"
    );
  };

  return (
    <section className="py-10">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <Link
          to="/products"
          className="mb-8 inline-flex items-center gap-2 font-semibold text-gray-600 hover:text-red-600"
        >
          <FiArrowLeft />
          Back to Products
        </Link>

        <div className="grid gap-10 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:grid-cols-2 md:p-8">

          <div className="overflow-hidden rounded-2xl bg-gray-100">

            <img
              src={product.image}
              alt={product.name}
              className="h-[350px] w-full object-cover sm:h-[500px]"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/800x600/e5e7eb/374151?text=Product+Image";
              }}
            />

          </div>

          <div className="flex flex-col justify-center">

            <span className="w-fit rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-600">
              {product.category}
            </span>

            <h1 className="mt-5 text-3xl font-black sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-2">
              <span className="text-xl text-yellow-500">
                ★
              </span>

              <span className="font-bold">
                {product.rating}
              </span>
            </div>

            <p className="mt-6 leading-7 text-gray-600">
              {product.description}
            </p>

            <div className="mt-6">
              <span className="text-4xl font-black">
                ₹{product.price}
              </span>

              <span className="ml-3 text-lg text-gray-400 line-through">
                ₹{product.wholesalePrice}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-gray-500">
                  Stock
                </p>
                <p className="mt-1 font-bold">
                  {product.stock} pieces
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-gray-500">
                  Minimum Order
                </p>
                <p className="mt-1 font-bold">
                  {product.minimumOrder} pieces
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button
                onClick={handleCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 font-bold text-white hover:bg-red-700"
              >
                <FiShoppingCart />
                Add to Cart
              </button>

              <button
                onClick={handleWishlist}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3.5 font-bold hover:border-red-300 hover:text-red-600"
              >
                <FiHeart
                  className={
                    isInWishlist(product.id)
                      ? "fill-red-600 text-red-600"
                      : ""
                  }
                />
                Wishlist
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductDetails;