import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('esewa');
  const { user } = useAuth();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem('paymentMethod', paymentMethod);
    navigate('/placeorder');
  };

  return (
    <div className="container mx-auto py-8 max-w-md">
      <CheckoutSteps step1 step2 step3 />
      <h1 className="text-2xl font-bold mb-6">Payment Method</h1>
      <form onSubmit={submitHandler} className="space-y-4">
        <div className="flex items-center">
          <input
            type="radio"
            id="esewa"
            name="paymentMethod"
            value="esewa"
            checked={paymentMethod === 'esewa'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-2"
          />
          <label htmlFor="esewa">eSewa</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="cod"
            name="paymentMethod"
            value="cod"
            checked={paymentMethod === 'cod'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-2"
          />
          <label htmlFor="cod">Cash on Delivery</label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default PaymentScreen;