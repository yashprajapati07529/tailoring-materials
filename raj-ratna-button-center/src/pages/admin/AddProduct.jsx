import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    wholesalePrice: "",
    stock: "",
    minimumOrder: "",
    rating: "",
    seller: "Raj Ratna Button Center",
    image: "",
    description: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Normal input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Image select from computer
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Only images
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // File size check - 2MB
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result;

      setFormData((previous) => ({
        ...previous,
        image: base64Image,
      }));

      setImagePreview(base64Image);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please select product image");
      return;
    }

    try {
      setLoading(true);

      const productData = {
        ...formData,

        price: Number(formData.price),
        wholesalePrice: Number(formData.wholesalePrice),
        stock: Number(formData.stock),
        minimumOrder: Number(formData.minimumOrder),
        rating: Number(formData.rating),
      };

      await axios.post(
        "http://localhost:5000/products",
        productData
      );

      toast.success("Product added successfully!");

      navigate("/admin/products");
    } catch (error) {
      console.error("Add Product Error:", error);

      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Add New Product
          </h1>

          <p className="mt-2 text-gray-500">
            Add a new product to Raj Ratna Button Center.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-5 shadow-sm sm:p-8"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* Product Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Premium Shirt Button"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-red-500"
              >
                <option value="">Select Category</option>
                <option value="Buttons">Buttons</option>
                <option value="Laces">Laces</option>
                <option value="Zippers">Zippers</option>
                <option value="Hooks">Hooks</option>
                <option value="Threads">Threads</option>
                <option value="Beads">Beads</option>
                <option value="Buckles">Buckles</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="25"
                required
                min="0"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
              />
            </div>

            {/* Wholesale Price */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Wholesale Price
              </label>

              <input
                type="number"
                name="wholesalePrice"
                value={formData.wholesalePrice}
                onChange={handleChange}
                placeholder="20"
                required
                min="0"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="150"
                required
                min="0"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
              />
            </div>

            {/* Minimum Order */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Minimum Order
              </label>

              <input
                type="number"
                name="minimumOrder"
                value={formData.minimumOrder}
                onChange={handleChange}
                placeholder="50"
                required
                min="1"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Rating
              </label>

              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                placeholder="4.5"
                min="0"
                max="5"
                step="0.1"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
              />
            </div>

            {/* Seller */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Seller
              </label>

              <input
                type="text"
                name="seller"
                value={formData.seller}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
              />
            </div>

            {/* IMAGE UPLOAD */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Product Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-red-700"
              />

              <p className="mt-2 text-xs text-gray-500">
                JPG, PNG, WEBP — Maximum 2MB
              </p>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-semibold text-gray-700">
                    Image Preview
                  </p>

                  <div className="h-64 w-full overflow-hidden rounded-xl border bg-gray-50 sm:w-80">
                    <img
                      src={imagePreview}
                      alt="Product Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description..."
                rows="5"
                required
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;