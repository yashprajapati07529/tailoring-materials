import {
  useNavigate,
} from "react-router-dom";

import {
  FiUser,
  FiMail,
  FiPhone,
  FiShield,
} from "react-icons/fi";

import {
  useAuth,
} from "../context/AuthContext";

const Profile = () => {
  const {
    user,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <section className="py-12">

      <div className="mx-auto max-w-3xl px-4">

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

          <div className="bg-gray-950 px-6 py-10 text-white sm:px-10">

            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-600 text-2xl font-black">
              {user?.name
                ?.charAt(0)
                .toUpperCase()}
            </div>

            <h1 className="mt-5 text-3xl font-black">
              {user?.name}
            </h1>

            <p className="mt-1 text-gray-400">
              {user?.role === "admin"
                ? "Administrator"
                : "Customer"}
            </p>

          </div>

          <div className="space-y-4 p-6 sm:p-10">

            <div className="flex gap-4 rounded-xl bg-gray-50 p-4">
              <FiMail className="mt-1 text-red-600" />

              <div>
                <p className="text-xs text-gray-500">
                  Email
                </p>

                <p className="font-bold">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl bg-gray-50 p-4">
              <FiPhone className="mt-1 text-red-600" />

              <div>
                <p className="text-xs text-gray-500">
                  Phone
                </p>

                <p className="font-bold">
                  {user?.phone}
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl bg-gray-50 p-4">
              <FiShield className="mt-1 text-red-600" />

              <div>
                <p className="text-xs text-gray-500">
                  Account Type
                </p>

                <p className="font-bold capitalize">
                  {user?.role}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full rounded-xl bg-gray-900 py-3.5 font-bold text-white hover:bg-red-600"
            >
              Logout
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Profile;