import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] =
    useState({
      products: 0,
      users: 0,
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchStats =
      async () => {
        try {
          const [
            products,
            users,
          ] = await Promise.all([
            axios.get(
              "http://localhost:5000/products"
            ),
            axios.get(
              "http://localhost:5000/users"
            ),
          ]);

          setStats({
            products:
              products.data.length,
            users:
              users.data.length,
          });
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchStats();
  }, []);

  const cards = [
    [
      "Total Products",
      stats.products,
      "📦",
    ],
    [
      "Total Users",
      stats.users,
      "👥",
    ],
    [
      "Categories",
      7,
      "🏷️",
    ],
    [
      "Status",
      "Active",
      "✅",
    ],
  ];

  return (
    <section className="py-10">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="font-bold text-red-600">
            ADMIN PANEL
          </p>

          <h1 className="mt-2 text-3xl font-black sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your Raj Ratna store.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {cards.map(
            ([title, value, icon]) => (
              <div
                key={title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">
                    {icon}
                  </span>

                  <span className="text-sm font-semibold text-gray-400">
                    {title}
                  </span>
                </div>

                <p className="mt-5 text-3xl font-black">
                  {loading
                    ? "..."
                    : value}
                </p>
              </div>
            )
          )}

        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">

          <Link
            to="/admin/products"
            className="rounded-2xl bg-gray-950 p-7 text-white transition hover:bg-gray-900"
          >
            <h2 className="text-2xl font-black">
              Manage Products
            </h2>

            <p className="mt-2 text-gray-400">
              Add, edit and delete products.
            </p>

            <span className="mt-6 inline-block font-bold text-red-400">
              Open →
            </span>
          </Link>

          <Link
            to="/admin/products/add"
            className="rounded-2xl bg-red-600 p-7 text-white transition hover:bg-red-700"
          >
            <h2 className="text-2xl font-black">
              Add New Product
            </h2>

            <p className="mt-2 text-red-100">
              Create a new product for your store.
            </p>

            <span className="mt-6 inline-block font-bold">
              Add Product →
            </span>
          </Link>

        </div>

      </div>
    </section>
  );
};

export default Dashboard;