import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { CartContext } from "../context/CartContext";

const Header = () => {
  const { token, logOut, user } = useContext(AuthContext);
  const { cartNum } = useContext(CartContext);
  const navigate = useNavigate();

  const scrollTOTop = () => {
    window.scrollTo(0, 0);
  };

  const handleLogout = async () => {
    const response = await Swal.fire({
      title: "Are you sure, you want to log out?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1864de",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      background: "#E2E8F0",
      scrollbarPadding: false,
    });

    if (!response.isConfirmed) return;
    logOut();
  };

  return (
    <header className="bg-blue-700 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="  mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            onClick={scrollTOTop}
            className="md:text-2xl font-extrabold tracking-wide"
          >
            <span className="text-white">E-</span>
            <span className="text-yellow-300">Commerce</span>
          </Link>

          {/* Nav Links */}
          <nav>
            <ul className="flex items-center gap-3 md:gap-6 text-sm md:text-lg font-medium">
              {/* Cart Icon */}
              <li>
                <Link
                  to="/cart"
                  className="relative group text-lg md:text-xl flex items-center gap-1 hover:text-yellow-300 transition"
                >
                  {cartNum > 0 && (
                    <span className="absolute w-6 h-6 -top-3 -right-4 flex items-center justify-center text-sm text-white bg-red-600 rounded-full font-bold">
                      {cartNum}
                    </span>
                  )}

                  <FaShoppingCart />
                </Link>
              </li>

              {/* Authenticated User */}
              {user && token ? (
                <>
                  <div className="text-white font-semibold flex flex-col justify-center items-center">
                    <img
                      src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"
                      alt="user"
                      className="w-8 h-8 rounded-full"
                    />{" "}
                    <span className="text-yellow-300">{user.name}</span>
                  </div>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-1 px-2 md:px-4 rounded-lg transition"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                // Guest
                <>
                  <li>
                    <Link
                      to="/login"
                      className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-1 px-2 md:px-4 rounded transition"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-1 px-2 md:px-4 rounded transition"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
