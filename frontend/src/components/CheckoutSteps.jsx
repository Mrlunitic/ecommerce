import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex justify-between mb-8">
      <div className={`flex-1 text-center ${step1 ? 'font-bold' : ''}`}>
        {step1 ? (
          <Link to="/login" className="text-blue-600">
            Sign In
          </Link>
        ) : (
          <span className="text-gray-400">Sign In</span>
        )}
      </div>
      <div className={`flex-1 text-center ${step2 ? 'font-bold' : ''}`}>
        {step2 ? (
          <Link to="/shipping" className="text-blue-600">
            Shipping
          </Link>
        ) : (
          <span className="text-gray-400">Shipping</span>
        )}
      </div>
      <div className={`flex-1 text-center ${step3 ? 'font-bold' : ''}`}>
        {step3 ? (
          <Link to="/payment" className="text-blue-600">
            Payment
          </Link>
        ) : (
          <span className="text-gray-400">Payment</span>
        )}
      </div>
      <div className={`flex-1 text-center ${step4 ? 'font-bold' : ''}`}>
        {step4 ? (
          <Link to="/placeorder" className="text-blue-600">
            Place Order
          </Link>
        ) : (
          <span className="text-gray-400">Place Order</span>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;