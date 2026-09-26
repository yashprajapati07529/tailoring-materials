import {
  Link,
} from "react-router-dom";

const Categories = () => {
  const categories = [
    ["Buttons", "🔘"],
    ["Laces", "🧵"],
    ["Zippers", "🤐"],
    ["Hooks", "🪝"],
    ["Threads", "🪡"],
    ["Beads", "💎"],
    ["Buckles", "🔗"],
  ];

  return (
    <section className="py-12">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="text-center">
          <p className="font-bold text-red-600">
            SHOP BY CATEGORY
          </p>

          <h1 className="mt-2 text-4xl font-black">
            Product Categories
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Browse our range of tailoring and garment
            accessories.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">

          {categories.map(
            ([name, icon]) => (
              <Link
                key={name}
                to={`/products?category=${name}`}
                className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
              >
                <div className="text-5xl">
                  {icon}
                </div>

                <h2 className="mt-5 text-lg font-black">
                  {name}
                </h2>

                <p className="mt-2 text-sm text-red-600">
                  View Products →
                </p>
              </Link>
            )
          )}

        </div>

      </div>
    </section>
  );
};

export default Categories;