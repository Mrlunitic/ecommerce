import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import data from "../components/Productdata";
import { CartContext } from "../context/CartContext";

const ProductScreen = () => {
  const { id } = useParams();
  const product = data.products.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  // const [error, setError] = useState(null);
  const { user, token } = useAuth();
  const { cartNum, setCartNum } = useContext(CartContext);
  const navigate = useNavigate();

  const addToCartHandler = async () => {
    if (!user || !token) {
      navigate("/login");
      return;
    }
    setCartNum(cartNum + quantity);
    try {
      await axios.post(
        "/api/cart",
        { productId: id, quantity },
        { withCredentials: true }
      );
      navigate("/cart");
    } catch (err) {
      setError(err.response?.data?.message || "Error adding to cart");
    }
  };

  if (!product)
    return <div className="text-center py-8">Product not found 😢</div>;

  return (
    <div className="container mx-auto py-8 pt-24 flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-5 justify-center items-center">
          <div className="border-2 border-yellow-50 shadow-xl rounded-lg">
            <img
              src={product.thumbnail}
              alt={product.title}
              className=" rounded-lg"
            />
          </div>
          <div
            className={`grid border-2 border-yellow-50 shadow-xl rounded-lg ${
              product.images.length === 1
                ? "grid-cols-1"
                : product.images.length === 2
                ? "grid-cols-2"
                : product.images.length === 3
                ? "grid-cols-3"
                : product.images.length === 4
                ? "grid-cols-4"
                : ""
            }`}
          >
            {product.images.map((image, i) => (
              <img key={i} src={image} className="w-40 h-40" />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-2xl mb-4 text-blue-700 font-semibold">
            ${product.price}
          </p>
          <p className="text-gray-600 mb-4">{product.description}</p>

          {/* Optional Additional Info */}
          {product.brand && (
            <p className="mb-1">
              <span className="font-medium">Brand:</span> {product.brand}
            </p>
          )}

          <p className="mb-1">
            <span className="font-medium">Category:</span> {product.category}
          </p>
          <p className="mb-1">
            <span className="font-medium">Rating:</span> {product.rating} ⭐
          </p>
          <p className="mb-4">
            <span className="font-medium">Stock:</span> {product.stock}
          </p>

          <div className="mb-4">
            <label htmlFor="quantity" className="mr-2 font-medium">
              Quantity:
            </label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border p-2 rounded"
            >
              {[...Array(product.stock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={addToCartHandler}
            // disabled={!user}
            className={`bg-blue-600 text-white px-4 py-2 rounded font-semibold  `}
          >
            {/* {user ? "Add to Cart" : "Login to Add to Cart"} */}
            Add to Cart
          </button>

          {/* {error && <p className="text-red-500 mt-4">{error}</p>} */}
        </div>
      </div>
      <hr className="w-full h-[2px] bg-gray-400" />
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold">Reviews</h1>
        <div className="flex flex-col justify-center items-center w-full border-2 border-yellow-50 shadow-xl rounded-lg p-4 gap-5">
          {product.reviews &&
            product.reviews.map((review, i) => (
              <div key={i} className="w-full flex flex-col gap-5">
                <div className="flex justify-between items-center w-full">
                  <div className="flex gap-3 items-center">
                    <img
                      src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"
                      alt="user"
                      className="w-14 h-14"
                    />
                    <h1 className="text-lg font-bold ">
                      {review.reviewerName}
                    </h1>
                  </div>
                  <p>{review.rating} ⭐</p>
                </div>
                <p className="pl-16">{review.comment}</p>
                <hr className="w-full h-[2px] bg-gray-200" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
