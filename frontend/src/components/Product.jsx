import React, { useContext } from "react";
import { FaCartPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Product = ({ product }) => {
  const { cartNum, setCartNum } = useContext(CartContext);
  const { token, user } = useContext(AuthContext);
  const scrollTOTop = () => {
    window.scrollTo(0, 0);
  };

  const navigate = useNavigate();
  const handleAddToCart = () => {
    if (!user || !token) {
      navigate("/login");
      return;
    }

    setCartNum(cartNum + 1);
  };

  return (
    <div className="group border rounded-lg p-4 w-full shadow-lg transition-transform duration-500 hover:-translate-y-4 flex flex-col justify-between h-full">
      <Link
        to={`/product/${product.id}`}
        onClick={scrollTOTop}
        className="flex flex-col gap-3 flex-1"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="aspect-square object-cover w-full rounded group-hover:scale-110 transition-transform duration-500"
        />
        <h2 className="text-lg font-semibold line-clamp-2">{product.title}</h2>
        <p className="text-blue-700 font-bold text-base">${product.price}</p>
      </Link>
      <button
        onClick={handleAddToCart}
        className="mt-4 flex justify-center items-center gap-2 bg-blue-700 text-white w-full py-2 hover:text-black font-bold rounded-lg hover:bg-yellow-300 transition duration-500"
      >
        <FaCartPlus />
        <span>Add to Cart</span>
      </button>
    </div>
  );
};

export default Product;
