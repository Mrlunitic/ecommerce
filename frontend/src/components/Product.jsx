import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div className="border rounded-lg p-4">
      <Link to={`/product/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover mb-4" />
        <h2 className="text-xl font-semibold">{product.title}</h2>
        <p className="text-gray-600">${product.price}</p>
      </Link>
    </div>
  );
};

export default Product;