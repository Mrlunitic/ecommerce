import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CartSection() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get('/api/cart');
        setCart(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`/api/cart/${productId}`);
      setCart(prev => ({
        ...prev,
        items: prev.items.filter(item => item.product._id !== productId)
      }));
    } catch (err) {
      // Handle error
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    
    try {
      await axios.put(`/api/cart/${productId}`, { quantity });
      setCart(prev => ({
        ...prev,
        items: prev.items.map(item => 
          item.product._id === productId ? { ...item, quantity } : item
        )
      }));
    } catch (err) {
      // Handle error
    }
  };

  const getTotal = () => {
    if (!cart) return 0;
    return cart.items.reduce(
      (total, item) => total + (item.product.price * item.quantity), 0
    ).toFixed(2);
  };

  const handleEsewaPayment = async () => {
    try {
      const { data } = await axios.post('/api/payment/esewa', {
        amount: getTotal(),
        orderId: `ORDER-${Date.now()}`
      });
      
      // Submit form to eSewa
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = data.url;
      
      Object.entries(data.params).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });
      
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      // Handle error
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!cart) return <div>Your cart is empty</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg mb-10">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y mb-4">
            {cart.items.map((item) => (
              <li key={item.product._id} className="flex justify-between items-center py-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={item.product.image} 
                    alt={item.product.title} 
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <span className="font-medium">{item.product.title}</span>
                    <p className="text-gray-600 text-sm">${item.product.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded">
                    <button 
                      onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                      className="px-2 py-1 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                      className="px-2 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  <button 
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total:</span>
            <span>${getTotal()}</span>
          </div>
          <button
            onClick={handleEsewaPayment}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl"
            disabled={cart.items.length === 0}
          >
            Pay with eSewa
          </button>
        </>
      )}
    </div>
  );
}