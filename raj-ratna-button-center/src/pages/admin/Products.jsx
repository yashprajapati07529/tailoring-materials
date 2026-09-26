import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";

import {
  FiEdit2,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";

const Products = () => {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchProducts =
    async () => {
      try {
        const response =
          await axios.get(
            "http://localhost:5000/products"
          );

        setProducts(response.data);
      } catch {
        toast.error(
          "Unable to load products"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/products/${id}`
      );

      setProducts(
        (previousProducts) =>
          previousProducts.filter(
            (product) =>
              product.id !== id
          )
      );

      toast.success(
        "Product deleted"
      );
    } catch {
      toast.error(
        "Delete failed"
      );
    }
  };

  return (
    <section className="py-10">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <p className="font-bold text-red-600">
              ADMIN
            </p>

            <h1 className="mt-1 text-3xl font-black">
              Manage Products
            </h1>
          </div>

          <Link
            to="/admin/products/add"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-700"
          >
            <FiPlus />
            Add Product
          </Link>

        </div>

        {loading ? (
          <div className="rounded-2xl bg-white p-10 text-center">
            Loading...
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[800px] text-left">

                <thead className="bg-gray-50 text-sm">
                  <tr>
                    <th className="px-5 py-4">
                      Product
                    </th>

                    <th className="px-5 py-4">
                      Category
                    </th>

                    <th className="px-5 py-4">
                      Price
                    </th>

                    <th className="px-5 py-4">
                      Stock
                    </th>

                    <th className="px-5 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">

                  {products.map(
                    (product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-gray-50"
                      >

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">

                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-12 w-12 rounded-lg object-cover"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://placehold.co/100x100/e5e7eb/374151?text=IMG";
                              }}
                            />

                            <span className="font-bold">
                              {product.name}
                            </span>

                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-500">
                          {product.category}
                        </td>

                        <td className="px-5 py-4 font-bold">
                          ₹{product.price}
                        </td>

                        <td className="px-5 py-4">
                          {product.stock}
                        </td>

                        <td className="px-5 py-4">

                          <div className="flex gap-2">

                            <Link
                              to={`/admin/products/edit/${product.id}`}
                              className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                            >
                              <FiEdit2 />
                            </Link>

                            <button
                              onClick={() =>
                                handleDelete(
                                  product.id
                                )
                              }
                              className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                            >
                              <FiTrash2 />
                            </button>

                          </div>

                        </td>
                      </tr>
                    )
                  )}

                </tbody>
              </table>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Products;