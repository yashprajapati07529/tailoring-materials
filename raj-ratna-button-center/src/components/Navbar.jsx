import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FiMenu,
  FiX,
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiLayout,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";
import {
  useWishlist,
} from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const navigate = useNavigate();

  const { totalItems } = useCart();

  const { wishlist } =
    useWishlist();

  const {
    user,
    logout,
    isLoggedIn,
  } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(
      `/products?search=${encodeURIComponent(
        search
      )}`
    );

    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex h-20 items-center justify-between gap-4">

          {/* Logo */}
          <Link
            to="/"
            className="flex shrink-0 items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 font-black text-white shadow-lg shadow-red-200">
              RR
            </div>

            <div className="hidden sm:block">
              <h1 className="font-black leading-none text-gray-900">
                Raj Ratna
              </h1>

              <p className="mt-1 text-xs font-medium text-gray-500">
                Button Center
              </p>
            </div>
          </Link>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="hidden flex-1 lg:flex lg:max-w-xl"
          >
            <div className="flex w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50 focus-within:border-red-500 focus-within:bg-white">
              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search buttons, laces, zippers..."
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none"
              />

              <button
                type="submit"
                className="bg-red-600 px-5 text-white transition hover:bg-red-700"
              >
                <FiSearch size={20} />
              </button>
            </div>
          </form>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-5 md:flex">

            <Link
              to="/products"
              className="text-sm font-semibold text-gray-700 hover:text-red-600"
            >
              Products
            </Link>

            <Link
              to="/categories"
              className="text-sm font-semibold text-gray-700 hover:text-red-600"
            >
              Categories
            </Link>

            <Link
              to="/wishlist"
              className="relative text-gray-700 hover:text-red-600"
            >
              <FiHeart size={21} />

              {wishlist.length > 0 && (
                <span className="absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-red-600"
            >
              <FiShoppingCart size={21} />

              {totalItems > 0 && (
                <span className="absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <div className="group relative">
                <button className="flex items-center gap-2 rounded-lg px-2 py-2 text-gray-700 hover:bg-gray-100">
                  <FiUser />
                  <span className="max-w-24 truncate text-sm font-semibold">
                    {user?.name}
                  </span>
                </button>

                <div className="invisible absolute right-0 top-full mt-2 w-48 rounded-xl border border-gray-200 bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">

                  <Link
                    to="/profile"
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    Profile
                  </Link>

                  {user?.role === "admin" && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-red-50 hover:text-red-600"
                    >
                      <FiLayout />
                      Admin Dashboard
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-red-50 hover:text-red-600"
                  >
                    <FiLogOut />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-600"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          >
            {menuOpen ? (
              <FiX size={25} />
            ) : (
              <FiMenu size={25} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-gray-100 py-4 md:hidden">

            <form
              onSubmit={handleSearch}
              className="mb-4 flex overflow-hidden rounded-xl border border-gray-200"
            >
              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search products..."
                className="min-w-0 flex-1 px-3 py-3 text-sm outline-none"
              />

              <button
                type="submit"
                className="bg-red-600 px-4 text-white"
              >
                <FiSearch />
              </button>
            </form>

            <div className="flex flex-col gap-1">

              <Link
                to="/"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="rounded-lg px-3 py-3 hover:bg-gray-100"
              >
                Home
              </Link>

              <Link
                to="/products"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="rounded-lg px-3 py-3 hover:bg-gray-100"
              >
                Products
              </Link>

              <Link
                to="/categories"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="rounded-lg px-3 py-3 hover:bg-gray-100"
              >
                Categories
              </Link>

              <Link
                to="/wishlist"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="rounded-lg px-3 py-3 hover:bg-gray-100"
              >
                Wishlist ({wishlist.length})
              </Link>

              <Link
                to="/cart"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="rounded-lg px-3 py-3 hover:bg-gray-100"
              >
                Cart ({totalItems})
              </Link>

              <Link
                to="/about"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="rounded-lg px-3 py-3 hover:bg-gray-100"
              >
                About
              </Link>

              <Link
                to="/contact"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="rounded-lg px-3 py-3 hover:bg-gray-100"
              >
                Contact
              </Link>

              {isLoggedIn && (
                <Link
                  to="/profile"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="rounded-lg px-3 py-3 hover:bg-gray-100"
                >
                  Profile
                </Link>
              )}

              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="rounded-lg px-3 py-3 font-semibold text-red-600 hover:bg-red-50"
                >
                  Admin Dashboard
                </Link>
              )}

              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="mt-2 rounded-lg bg-gray-900 px-3 py-3 text-left font-semibold text-white"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="mt-2 rounded-lg bg-red-600 px-3 py-3 font-semibold text-white"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;