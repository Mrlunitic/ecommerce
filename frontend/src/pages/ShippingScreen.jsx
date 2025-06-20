import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!address || !city || !postalCode || !country) {
      setError('Please fill all fields');
      return;
    }

    localStorage.setItem('shippingAddress', JSON.stringify({
      address,
      city,
      postalCode,
      country,
    }));
    navigate('/payment');
  };

  return (
    <div className="container mx-auto py-8 max-w-md">
      <CheckoutSteps step1 step2 />
      <h1 className="text-2xl font-bold mb-6">Shipping</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label htmlFor="address" className="block mb-1">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="city" className="block mb-1">
            City
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="postalCode" className="block mb-1">
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="country" className="block mb-1">
            Country
          </label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border p-2 rounded"
          />
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

export default ShippingScreen;