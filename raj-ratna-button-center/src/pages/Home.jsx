import {
  Link,
} from "react-router-dom";

import {
  FiArrowRight,
  FiTruck,
  FiShield,
  FiPackage,
  FiHeadphones,
} from "react-icons/fi";

const Home = () => {
  const categories = [
    {
      name: "Buttons",
      icon: "🔘",
    },
    {
      name: "Laces",
      icon: "🧵",
    },
    {
      name: "Zippers",
      icon: "🤐",
    },
    {
      name: "Threads",
      icon: "🪡",
    },
    {
      name: "Hooks",
      icon: "🪝",
    },
    {
      name: "Beads",
      icon: "💎",
    },
  ];

  return (
    <div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-red-50 via-white to-orange-50">

        <div className="mx-auto grid min-h-[600px] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">

          <div>

            <span className="inline-flex rounded-full bg-red-100 px-4 py-2 text-sm font-bold text-red-700">
              QUALITY GARMENT ACCESSORIES
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight text-gray-950 sm:text-5xl lg:text-6xl">
              Everything Your
              <span className="block text-red-600">
                Garment Business Needs
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              Premium buttons, laces, zippers, threads,
              hooks and fashion accessories at competitive
              retail and wholesale prices.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-red-200 transition hover:bg-red-700"
              >
                Explore Products
                <FiArrowRight />
              </Link>

              <Link
                to="/contact"
                className="rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-center font-bold text-gray-800 transition hover:border-red-300 hover:text-red-600"
              >
                Contact Us
              </Link>

            </div>
          </div>

          <div className="relative">

            <div className="rounded-[2rem] bg-gray-900 p-4 shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000"
                alt="Garment accessories"
                className="h-[380px] w-full rounded-[1.5rem] object-cover sm:h-[450px]"
              />

            </div>

            <div className="absolute -bottom-5 -left-2 rounded-2xl bg-white p-5 shadow-xl sm:-left-6">
              <p className="text-2xl font-black">
                100+
              </p>
              <p className="text-sm text-gray-500">
                Products
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {[
              [
                FiTruck,
                "Fast Delivery",
                "Reliable delivery for your orders",
              ],
              [
                FiShield,
                "Quality Products",
                "Products selected for quality",
              ],
              [
                FiPackage,
                "Bulk Orders",
                "Wholesale quantities available",
              ],
              [
                FiHeadphones,
                "Support",
                "Friendly customer assistance",
              ],
            ].map(
              ([Icon, title, description]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-gray-200 p-6 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Icon size={23} />
                  </div>

                  <h3 className="font-bold">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {description}
                  </p>
                </div>
              )
            )}

          </div>

        </div>
      </section>

      {/* Categories */}
      <section className="py-16">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-8 flex items-end justify-between gap-4">

            <div>
              <p className="font-bold text-red-600">
                SHOP BY CATEGORY
              </p>

              <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                Popular Categories
              </h2>
            </div>

            <Link
              to="/categories"
              className="hidden font-bold text-red-600 sm:block"
            >
              View All →
            </Link>

          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">

            {categories.map(
              (category) => (
                <Link
                  key={category.name}
                  to={`/products?category=${category.name}`}
                  className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
                >
                  <div className="text-4xl">
                    {category.icon}
                  </div>

                  <h3 className="mt-4 font-bold">
                    {category.name}
                  </h3>
                </Link>
              )
            )}

          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;