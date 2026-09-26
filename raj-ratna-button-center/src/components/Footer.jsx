import {
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="mt-16 bg-gray-950 text-white">

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">

        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 font-black">
              RR
            </div>

            <div>
              <h2 className="font-bold">
                Raj Ratna
              </h2>

              <p className="text-xs text-gray-400">
                Button Center
              </p>
            </div>
          </div>

          <p className="text-sm leading-6 text-gray-400">
            Quality tailoring and garment accessories
            for manufacturers, designers and retailers.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-bold">
            Quick Links
          </h3>

          <div className="space-y-3 text-sm text-gray-400">
            <p>Products</p>
            <p>Categories</p>
            <p>About Us</p>
            <p>Contact</p>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-bold">
            Categories
          </h3>

          <div className="space-y-3 text-sm text-gray-400">
            <p>Buttons</p>
            <p>Laces</p>
            <p>Zippers</p>
            <p>Threads</p>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-bold">
            Contact
          </h3>

          <div className="space-y-4 text-sm text-gray-400">
            <p className="flex gap-3">
              <FiPhone className="mt-1 shrink-0" />
              +91 98765 43210
            </p>

            <p className="flex gap-3">
              <FiMail className="mt-1 shrink-0" />
              info@rajratna.com
            </p>

            <p className="flex gap-3">
              <FiMapPin className="mt-1 shrink-0" />
              Surat, Gujarat, India
            </p>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-800 px-4 py-5 text-center text-sm text-gray-500">
        © 2026 Raj Ratna Button Center. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;