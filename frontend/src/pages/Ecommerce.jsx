import React, { useState } from 'react';
import HeroBanner from '../components/HeroBanner.';
import ProductGrid from '../components/ProductGrid';
import CartSection from '../components/CartSection';
import productData from '../data/Productdata.json';

export default function Ecommerce() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if product already exists in cart
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? {...item, quantity: item.quantity + 1} 
            : item
        );
      }
      return [...prevCart, {...product, quantity: 1}];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) => 
      prevCart.map(item => 
        item.id === productId 
          ? {...item, quantity: newQuantity} 
          : item
      )
    );
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
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
      <CartSection 
        cart={cart} 
        getTotal={getTotal} 
        handleEsewaPayment={handleEsewaPayment}
            removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    </div>
  );
}