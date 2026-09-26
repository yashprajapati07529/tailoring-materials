import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";

const EditProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    const fetchProduct =
      async () => {
        try {
          const response =
            await axios.get(
              `http://localhost:5000/products/${id}`
            );

          setFormData(
            response.data
          );
        } catch {
          toast.error(
            "Product not found"
          );
        } finally {
          setLoading(false);
        }
      };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await axios.put(
        `http://localhost:5000/products/${id}`,
        {
          ...formData,
          price: Number(
            formData.price
          ),
          wholesalePrice: Number(
            formData.wholesalePrice
          ),
          stock: Number(
            formData.stock
          ),
          minimumOrder: Number(
            formData.minimumOrder
          ),
          rating: Number(
            formData.rating
          ),
        }
      );

      toast.success(
        "Product updated successfully"
      );

      navigate("/admin/products");

    } catch (error) {
      console.error(error);

      toast.error(
        "Update failed"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="py-20 text-center">
        Product not found
      </div>
    );
  }

  return (
    <section className="py-10">

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        <div className="mb-8">

          <Link
            to="/admin/products"
            className="font-bold text-red-600"
          >
            ← Back
          </Link>

          <h1 className="mt-3 text-3xl font-black">
            Edit Product
          </h1>

        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >

          <div className="grid gap-5 sm:grid-cols-2">

            {[
              ["name", "Product Name"],
              ["price", "Price"],
              [
                "wholesalePrice",
                "Wholesale Price",
              ],
              ["stock", "Stock"],
              [
                "minimumOrder",
                "Minimum Order",
              ],
              ["rating", "Rating"],
              ["seller", "Seller"],
              ["image", "Image URL"],
            ].map(
              ([name, label]) => (
                <div
                  key={name}
                  className={
                    name === "name" ||
                    name === "image"
                      ? "sm:col-span-2"
                      : ""
                  }
                >
                  <label className="mb-2 block text-sm font-bold">
                    {label}
                  </label>

                  <input
                    type={
                      [
                        "price",
                        "wholesalePrice",
                        "stock",
                        "minimumOrder",
                        "rating",
                      ].includes(name)
                        ? "number"
                        : "text"
                    }
                    step={
                      name === "rating"
                        ? "0.1"
                        : undefined
                    }
                    name={name}
                    value={
                      formData[name] ?? ""
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500"
                  />
                </div>
              )
            )}

            <div>
              <label className="mb-2 block text-sm font-bold">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500"
              >
                <option>Buttons</option>
                <option>Laces</option>
                <option>Zippers</option>
                <option>Hooks</option>
                <option>Threads</option>
                <option>Beads</option>
                <option>Buckles</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-bold">
                Description
              </label>

              <textarea
                rows="5"
                name="description"
                value={
                  formData.description ??
                  ""
                }
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500"
              />
            </div>

          </div>

          <button
            disabled={saving}
            className="mt-7 w-full rounded-xl bg-red-600 py-3.5 font-bold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {saving
              ? "Updating..."
              : "Update Product"}
          </button>

        </form>

      </div>
    </section>
  );
};

export default EditProduct;