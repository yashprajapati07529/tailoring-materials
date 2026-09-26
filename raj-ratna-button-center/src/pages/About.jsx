const About = () => {
  return (
    <section className="py-14">

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="rounded-3xl bg-gray-950 p-8 text-white sm:p-12">

          <p className="font-bold text-red-400">
            ABOUT RAJ RATNA
          </p>

          <h1 className="mt-3 text-4xl font-black">
            Your Garment Accessory Partner
          </h1>

          <p className="mt-6 max-w-3xl leading-8 text-gray-400">
            Raj Ratna Button Center provides buttons,
            laces, zippers, threads, hooks, beads and
            other garment accessories for manufacturers,
            retailers, designers and tailoring businesses.
          </p>

        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          {[
            [
              "Quality",
              "We focus on providing reliable garment accessories."
            ],
            [
              "Variety",
              "Multiple categories for different garment requirements."
            ],
            [
              "Wholesale",
              "Bulk purchasing options for businesses."
            ],
          ].map(
            ([title, description]) => (
              <div
                key={title}
                className="rounded-2xl border border-gray-200 bg-white p-7"
              >
                <h2 className="text-xl font-black">
                  {title}
                </h2>

                <p className="mt-3 leading-7 text-gray-500">
                  {description}
                </p>
              </div>
            )
          )}

        </div>

      </div>
    </section>
  );
};

export default About;