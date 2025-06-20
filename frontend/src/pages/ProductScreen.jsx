import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

const ProductScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Product not found');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCartHandler = async () => {
    try {
      await axios.post(
        '/api/cart',
        { productId: id, quantity },
        { withCredentials: true }
      );
      navigate('/cart');
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding to cart');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-2xl mb-4">${product.price}</p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          
          <div className="mb-4">
            <label htmlFor="quantity" className="mr-2">
              Quantity:
            </label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border p-2"
            >
              {[...Array(product.stock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={addToCartHandler}
            disabled={!user}
            className={`bg-blue-600 text-white px-4 py-2 rounded ${
              !user ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {user ? 'Add to Cart' : 'Login to Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;