import React from "react";
import { Link } from "react-router-dom";

export default function ProfessionalProductCard({ product }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group">
  <div className="bg-white border border-gray-300 rounded-3xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-blue-600 h-full flex flex-col">

    {/* Image Section */}
    <div className="relative w-full h-64 overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {product.isNew && (
        <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
          New
        </span>
      )}
    </div>

    {/* Product Info */}
    <div className="p-6 flex-1 flex flex-col">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-grow pr-4">
          <h3 className="text-lg font-bold text-gray-800 truncate">
            {product.name}
          </h3>
          <div className="text-gray-500 text-sm max-h-20 overflow-y-auto mt-1 leading-relaxed">
            <p>{product.description || 'Product Category'}</p>
          </div>
        </div>

        
      </div>
      {/* CLEAR & BIG Price */}
      <div className="">
          <p className="text-xl font-extrabold text-blue-600">{product.price} DH</p>
          {product.originalPrice && (
            <p className="text-sm text-gray-400 line-through">{product.originalPrice} DH</p>
          )}
        </div>

      {/* Features */}
      {product.features && (
        <ul className="text-sm text-gray-600 space-y-1 border-t border-gray-100 pt-3">
          {product.features.slice(0, 2).map((feature, idx) => (
            <li key={idx} className="flex items-center">
              <svg
                className="w-4 h-4 text-blue-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      )}

      {/* Buttons */}
      <div className="flex space-x-4 mt-auto pt-5">
        <Link
          to={`/shop/product/${product.id}`}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-center py-2.5 rounded-xl font-semibold transition duration-300"
        >
          View
        </Link>
        <button
          aria-label="Add to Cart"
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-xl transition duration-300"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>

  );
}
