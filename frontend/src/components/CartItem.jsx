import React from 'react';
import { Link } from 'react-router-dom';

const CartItem = ({ item, updateCartItem, removeFromCart }) => {
  return (
    <div className="border-b pb-4 mb-4 flex flex-col md:flex-row">
      <div className="flex-shrink-0">
        <img
          src={item.product.thumbnail}
          alt={item.product.title}
          className="w-20 h-20 object-cover rounded"
        />
      </div>
      <div className="ml-4 flex-grow">
        <Link to={`/product/${item.product._id}`} className="text-lg font-semibold hover:underline">
          {item.product.title}
        </Link>
        <p className="text-gray-600">${item.product.price}</p>
      </div>
      <div className="mt-4 md:mt-0">
        <select
          value={item.quantity}
          onChange={(e) => updateCartItem(item.product._id, e.target.value)}
          className="border p-1"
        >
          {[...Array(10).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </select>
        <button
          onClick={() => removeFromCart(item.product._id)}
          className="ml-2 text-red-600 hover:text-red-800"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;