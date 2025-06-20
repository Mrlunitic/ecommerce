import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

const OrderScreen = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`/api/payment/orders/${id}`, {
          withCredentials: true,
        });
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Order not found');
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, user, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Order {order._id}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Shipping</h2>
            <p>
              <strong>Name:</strong> {order.user.name}
            </p>
            <p>
              <strong>Email:</strong> {order.user.email}
            </p>
            <p>
              <strong>Address:</strong> {order.shippingAddress.address},{' '}
              {order.shippingAddress.city}, {order.shippingAddress.postalCode},{' '}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <p className="text-green-600">
                Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
              </p>
            ) : (
              <p className="text-red-600">Not Delivered</p>
            )}
          </div>
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
            <p>
              <strong>Method:</strong> {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <p className="text-green-600">
                Paid on {new Date(order.paidAt).toLocaleDateString()}
              </p>
            ) : (
              <p className="text-red-600">Not Paid</p>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Order Items</h2>
            {order.orderItems.map((item) => (
              <div key={item._id} className="flex items-center mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div>
                  <p>{item.title}</p>
                  <p>
                    {item.quantity} x ${item.price} = $
                    {(item.quantity * item.price).toFixed(2)}
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
              <span>${order.itemsPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${order.shippingPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${order.taxPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2">
              <span>Total</span>
              <span>${order.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;