import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover rounded-t-2xl"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-lg font-bold mb-1 hover:text-blue-600">
            {product.title}
          </h2>
        </Link>
        <p className="text-gray-700 text-sm mb-2">
          {product.description?.slice(0, 50)}...
        </p>
        <p className="text-blue-600 font-semibold text-lg mb-4">
          ${product.price.toFixed(2)}
        </p>
        <button
          onClick={() => addToCart(product._id, 1)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl flex items-center justify-center gap-2"
        >
          <FaShoppingCart className="text-red-700" /> Add to Cart
        </button>
      </div>
    </div>
  );
}
