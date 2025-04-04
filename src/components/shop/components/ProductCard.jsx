import React from "react";
import { Link } from "react-router-dom";

export default function ProfessionalProductCard({ product }) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg group hover:border-blue-500 h-full flex flex-col">
      {/* Image Section */}
      <div className="relative w-full h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.isNew && (
          <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium">
            New Arrival
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Product Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-grow pr-4">
            <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">
              {product.name}
            </h3>
            {/* Description complète avec défilement si nécessaire */}
            <div className="text-gray-500 text-sm max-h-20 overflow-y-auto">
              <p>{product.description || 'Product Category'}</p>
            </div>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-xl font-bold text-blue-700">
              {product.price} DH
            </p>
            {product.originalPrice && (
              <p className="text-gray-400 text-sm line-through">
                {product.originalPrice} DH
              </p>
            )}
          </div>
        </div>

        {/* Product Features */}
        {product.features && (
          <div className="mb-4 border-t border-gray-200 pt-3">
            <ul className="space-y-1">
              {product.features.slice(0, 2).map((feature, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-600 flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons - Placé en bas avec mt-auto */}
        <div className="flex space-x-3 mt-auto">
          <Link
            to={`/shop/product/${product.id}`}
            className="flex-grow text-center bg-blue-600 text-white py-2 rounded-md 
              transition-all duration-300 
              hover:bg-blue-700 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Voir plus
          </Link>
          <Link to="/shop/cart"> 
          <button
            className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md 
              transition-all duration-300 
              hover:bg-gray-200 
              focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Add to Cart"
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
          </Link>
        </div>
      </div>
    </div>
  );
}