import React from "react";
import { Link } from "react-router-dom";

export default function ProfessionalProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg group hover:border-blue-500 h-full flex flex-col">
      {/* Image Section */}
      <div className="relative w-full h-60 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow">
            New
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Title + Category */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
          <p className="text-sm text-gray-500 truncate">{product.category || "Product Category"}</p>
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

        {/* Price Section */}
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-blue-600">{product.price} DH</p>
          {product.originalPrice && (
            <p className="text-sm text-gray-400 line-through">{product.originalPrice} DH</p>
          )}
        </div>

        {/* Features (first two) */}
        {product.features && (
          <ul className="text-sm text-gray-600 space-y-1 border-t border-gray-100 pt-2">
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
        <div className="flex space-x-3 pt-3">
        {/* Action Buttons - Placé en bas avec mt-auto */}
        <div className="flex space-x-3 mt-auto">
          <Link
            to={`/shop/product/${product.id}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg font-medium transition"
          >
            View
          </Link>
          <button
            aria-label="Add to Cart"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition"
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
  );
}