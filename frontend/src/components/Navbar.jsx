import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "../helpers/axios";

export default function Navbar() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/user/logout");
      if (res.status === 200) {
        dispatch({ type: "LOGOUT" });
        navigate("/sign-in");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="flex justify-between items-center px-5 py-5 bg-white h-30 shadow-md">
      <h1 className="text-blue-500 text-4xl font-bold">Talent Bridge</h1>
      <nav>
        <ul className="flex space-x-5 items-center">
          {!!user && (
            <li>
              <Link
                className="hover:text-teal-600 px-4 text-xl font-semibold"
                to="/"
              >
                {user.name}
              </Link>
            </li>
          )}
          <li>
            <Link className="hover:text-blue-500 px-4 text-xl" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:text-blue-500 px-4 text-xl" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="hover:text-blue-500 px-4 text-xl" to="/contact">
              Contact
            </Link>
          </li>

          {!user && (
            <>
              <li>
                <Link
                  className="hover:text-blue-500 px-4 text-xl"
                  to="/sign-in"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-500 px-4 text-xl"
                  to="/sign-up"
                >
                  Register
                </Link>
              </li>
            </>
          )}

          {!!user && (
            <li>
              <button
                onClick={() => setShowConfirm(true)}
                className="hover:text-red-500 px-4 text-xl font-semibold"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* ✅ Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Confirm Logout
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out of your account?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium flex items-center justify-center"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 
                      0 5.373 0 12h4zm2 5.291A7.962 
                      7.962 0 014 12H0c0 3.042 1.135 
                      5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Logout"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
