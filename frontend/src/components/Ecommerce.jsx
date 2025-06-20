import React, { useState } from 'react';
import HeroBanner from './HeroBanner..jsx';
import ProductGrid from '../components/ProductGrid';
import CartSection from './CartSection.jsx';
import productData from '../data/Productdata.json';

export default function Ecommerce() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleEsewaPayment = () => {
    const totalAmount = getTotal();
    const params = {
      amt: totalAmount,
      psc: 0,
      pdc: 0,
      txAmt: 0,
      tAmt: totalAmount,
      pid: '1234567890',
      scd: 'EPAYTEST',
      su: 'http://merchant.com.np/page/esewa_payment_success?q=su',
      fu: 'http://merchant.com.np/page/esewa_payment_failed?q=fu',
    };

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://rc-epay.esewa.com.np/api/epay/main';

    for (const key in params) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = params[key];
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <HeroBanner />
      <ProductGrid products={productData.products} addToCart={addToCart} />
      <CartSection cart={cart} getTotal={getTotal} handleEsewaPayment={handleEsewaPayment} />
    </div>
  );
}
