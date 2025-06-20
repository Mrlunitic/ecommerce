import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchCart = async () => {
      try {
        const { data } = await axios.get('/api/cart', { withCredentials: true });
        setCart(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching cart');
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, navigate]);

  const placeOrderHandler = async () => {
    try {
      setLoadingSubmit(true);
      const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
      const paymentMethod = localStorage.getItem('paymentMethod');

      const orderItems = cart.items.map((item) => ({
        title: item.product.title,
        quantity: item.quantity,
        image: item.product.thumbnail,
        price: item.product.price,
        product: item.product._id,
      }));

      const itemsPrice = cart.items.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0
      );
      const shippingPrice = itemsPrice > 100 ? 0 : 10;
      const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
      const totalPrice = itemsPrice + shippingPrice + taxPrice;

      const { data } = await axios.post(
        '/api/payment/orders',
        {
          orderItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        { withCredentials: true }
      );

      if (paymentMethod === 'esewa') {
        const paymentResponse = await axios.post(
          '/api/payment/esewa',
          { amount: totalPrice, orderId: data._id },
          { withCredentials: true }
        );
        window.location.href = `${paymentResponse.data.url}?${new URLSearchParams(
          paymentResponse.data.params
        ).toString()}`;
      } else {
        navigate(`/order/${data._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error placing order');
      setLoadingSubmit(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto py-8">
      <CheckoutSteps step1 step2 step3 step4 />
      <h1 className="text-2xl font-bold mb-6">Place Order</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Shipping</h2>
            <p>
              Address:{' '}
              {JSON.parse(localStorage.getItem('shippingAddress'))?.address}
            </p>
          </div>
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
            <p>{localStorage.getItem('paymentMethod')}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Order Items</h2>
            {cart.items.map((item) => (
              <div key={item.product._id} className="flex items-center mb-4">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div>
                  <p>{item.product.title}</p>
                  <p>
                    {item.quantity} x ${item.product.price} = $
                    {(item.quantity * item.product.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Items</span>
              <span>
                $
                {cart.items
                  .reduce(
                    (acc, item) => acc + item.quantity * item.product.price,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                $
                {cart.items.reduce(
                  (acc, item) => acc + item.quantity * item.product.price,
                  0
                ) > 100
                  ? '0.00'
                  : '10.00'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>
                $
                {(
                  0.15 *
                  cart.items.reduce(
                    (acc, item) => acc + item.quantity * item.product.price,
                    0
                  )
                ).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2">
              <span>Total</span>
              <span>
                $
                {(
                  cart.items.reduce(
                    (acc, item) => acc + item.quantity * item.product.price,
                    0
                  ) +
                  (cart.items.reduce(
                      (acc, item) => acc + item.quantity * item.product.price,
                      0
                    ) > 100
                    ? 0
                    : 10) +
                  0.15 *
                    cart.items.reduce(
                      (acc, item) => acc + item.quantity * item.product.price,
                      0
                    )
                ).toFixed(2)}
              </span>
            </div>
          </div>
          <button
            onClick={placeOrderHandler}
            disabled={loadingSubmit}
            className={`w-full bg-blue-600 text-white py-2 rounded ${
              loadingSubmit ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {loadingSubmit ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;