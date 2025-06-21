import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function HeroBanner() {
  const { token, user } = useContext(AuthContext);

  return (
    <div className="relative bg-gradient-to-br from-blue-700 to-sky-500 text-white min-h-screen overflow-y-auto flex flex-col justify-center items-center rounded-b-lg">
      {/* Decorative Background Circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-white opacity-10 rounded-full animate-pulse z-0" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 opacity-20 rounded-full blur-2xl z-0" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl w-full px-4 mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 py-12">
        {/* Left Content */}
        <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
          {token && user && (
            <p className="text-xl md:text-3xl font-medium text-yellow-100 animate-fade-in-down">
              Hey <span className="font-bold">{user?.name}</span>, ready to shop
              smart? 🛍️
            </p>
          )}

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight animate-fade-in-up">
            Unlock Big <span className="text-yellow-300">Savings</span>
            <br className="hidden md:block" />
            at <span className="text-yellow-300">K-Mall</span>
          </h1>

          <p className="text-lg md:text-xl max-w-md text-white/90">
            Your one-stop shop for <strong>trending tech</strong>,{" "}
            <strong>daily essentials</strong>, and <strong>beauty picks</strong>
            . Everything you need, all in one place.
          </p>

          <h2 className="text-sm md:text-lg font-semibold tracking-wide text-yellow-200 uppercase">
            Fast Delivery. Secure Payments. Happy Vibes.
          </h2>

          {/* Trust Features */}
          <div className="flex gap-4 mt-3 text-sm text-white/80 flex-wrap justify-center md:justify-start">
            <div className="flex items-center gap-2">
              <span>✅</span> Verified Products
            </div>
            <div className="flex items-center gap-2">
              <span>⚡</span> Fast Delivery
            </div>
            <div className="flex items-center gap-2">
              <span>🔒</span> Secure Checkout
            </div>
          </div>

          <a
            href="#latest"
            className="mt-6 inline-block bg-yellow-300 hover:bg-yellow-400 transition-all duration-300 text-black px-6 py-3 rounded-xl text-lg font-semibold shadow-md"
          >
            🚀 Start Shopping
          </a>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-[40%] ">
          <img
            src="/fun-cartoon.png"
            alt="shop illustration"
            className="w-full h-auto max-h-[300px] md:max-h-[500px] object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}
