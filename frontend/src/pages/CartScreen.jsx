import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import CartItem from "../components/CartItem";

const CartScreen = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const { data } = await axios.get("/api/cart", {
          withCredentials: true,
        });
        setCart(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching cart");
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, navigate]);

  const updateCartItem = async (productId, quantity) => {
    try {
      const { data } = await axios.put(
        `/api/cart/${productId}`,
        { quantity },
        { withCredentials: true }
      );
      setCart(data);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating cart");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const { data } = await axios.delete(`/api/cart/${productId}`, {
        withCredentials: true,
      });
      setCart(data);
    } catch (err) {
      setError(err.response?.data?.message || "Error removing from cart");
    }
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {cart?.items?.length === 0 ? (
        <div>
          <p>Your cart is empty</p>
          <Link to="/" className="text-blue-600 hover:underline">
            Go Back
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cart?.items?.map((item) => (
              <CartItem
                key={item.product._id}
                item={item}
                updateCartItem={updateCartItem}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Subtotal (
              {cart?.items?.reduce((acc, item) => acc + item.quantity, 0)})
              items
            </h2>
            <p className="text-2xl mb-4">
              $
              {cart?.items
                ?.reduce(
                  (acc, item) => acc + item.quantity * item.product.price,
                  0
                )
                .toFixed(2)}
            </p>
            <button
              onClick={checkoutHandler}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
