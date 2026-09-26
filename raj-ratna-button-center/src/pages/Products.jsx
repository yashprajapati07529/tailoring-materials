import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import axios from "axios";

import {
  FiFilter,
  FiSearch,
} from "react-icons/fi";

import ProductCard from "../components/ProductCard";

const Products = () => {
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState(
      searchParams.get("search") || ""
    );

  const [category, setCategory] =
    useState(
      searchParams.get("category") || "All"
    );

  const [sort, setSort] =
    useState("default");

  useEffect(() => {
    const fetchProducts =
      async () => {
        try {
          const response =
            await axios.get(
              "http://localhost:5000/products"
            );

          setProducts(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        products.map(
          (product) =>
            product.category
        )
      ),
    ];
  }, [products]);

  const filteredProducts =
    useMemo(() => {
      let result = [...products];

      if (search.trim()) {
        const keyword =
          search.toLowerCase();

        result = result.filter(
          (product) =>
            product.name
              .toLowerCase()
              .includes(keyword) ||
            product.category
              .toLowerCase()
              .includes(keyword)
        );
      }

      if (category !== "All") {
        result = result.filter(
          (product) =>
            product.category === category
        );
      }

      if (sort === "low") {
        result.sort(
          (a, b) =>
            Number(a.price) -
            Number(b.price)
        );
      }

      if (sort === "high") {
        result.sort(
          (a, b) =>
            Number(b.price) -
            Number(a.price)
        );
      }

      if (sort === "rating") {
        result.sort(
          (a, b) =>
            Number(b.rating) -
            Number(a.rating)
        );
      }

      return result;
    }, [
      products,
      search,
      category,
      sort,
    ]);

  const updateSearch = (value) => {
    setSearch(value);

    const params =
      Object.fromEntries(
        searchParams.entries()
      );

    if (value) {
      params.search = value;
    } else {
      delete params.search;
    }

    setSearchParams(params);
  };

  return (
    <section className="min-h-screen py-10">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-8">

          <p className="font-bold text-red-600">
            OUR COLLECTION
          </p>

          <h1 className="mt-2 text-3xl font-black sm:text-4xl">
            Garment Accessories
          </h1>

          <p className="mt-2 text-gray-500">
            Find quality products for your
            garment business.
          </p>

        </div>

        {/* Filters */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

          <div className="grid gap-4 md:grid-cols-3">

            <div className="relative">
              <FiSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={search}
                onChange={(e) =>
                  updateSearch(
                    e.target.value
                  )
                }
                placeholder="Search products..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none focus:border-red-500"
              />
            </div>

            <select
              value={category}
              onChange={(e) => {
                setCategory(
                  e.target.value
                );

                setSearchParams({
                  category:
                    e.target.value ===
                    "All"
                      ? ""
                      : e.target.value,
                });
              }}
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-red-500"
            >
              {categories.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>

            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-red-500"
            >
              <option value="default">
                Sort: Default
              </option>

              <option value="low">
                Price: Low to High
              </option>

              <option value="high">
                Price: High to Low
              </option>

              <option value="rating">
                Highest Rating
              </option>
            </select>

          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
            <FiFilter />
            {filteredProducts.length}
            {" "}
            products found
          </div>

        </div>

        {/* Products */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map(
              (item) => (
                <div
                  key={item}
                  className="h-96 animate-pulse rounded-2xl bg-gray-200"
                />
              )
            )}
          </div>
        ) : filteredProducts.length ===
          0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">
            <h2 className="text-xl font-bold">
              No products found
            </h2>

            <p className="mt-2 text-gray-500">
              Try another search or category.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              )
            )}
          </div>
        )}

      </div>
    </section>
  );
};

export default Products;