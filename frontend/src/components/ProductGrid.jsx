import React, { useEffect, useState } from "react";
import ProductCard from "./Productcard";
import axios from "axios";
// import { Spinner } from './Spinner';

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data.products);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId, qty) => {
    try {
      await axios.post("/api/cart", { productId, quantity: qty });
      // Optionally show success message
    } catch (err) {
      // Handle error
    }
  };

  // if (loading) return <Spinner />;
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
}
