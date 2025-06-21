import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Product from "../components/Product"; // Make sure this path is correct
import Productdata from "../data/Productdata.json";
import HeroBanner from "../components/HeroBanner.";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProducts(Productdata.products || []);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Error loading products");
        setLoading(false);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!products || products.length === 0)
    return <div className="text-center py-8">No products available</div>;

  return (
    <div className="flex flex-col gap-10 container mx-auto py-20 scroll-mt-20">
      <HeroBanner />
      <div id="latest" className="flex flex-col gap-5 scroll-mt-20">
        <h1 className="text-3xl font-bold mb-8">Latest Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
