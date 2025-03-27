// src/components/shop/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div id="products"  className="bg-white mt-10 p-4 rounded-2xl shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
  {/* Image produit */}
  <div className="w-full h-48 overflow-hidden rounded-xl">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
    />
  </div>

  {/* Informations produit */}
  <div className="mt-4">
    <h2 className="text-lg font-bold text-gray-800 truncate">{product.name}</h2>
    <p className="text-blue-600 font-semibold mt-1">{product.price} DH</p>
  </div>

  {/* Bouton View Details */}
  <Link
    to={`/shop/product/${product.id}`}
    className="mt-4 inline-block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition"
  >
    Voir Détails
  </Link>
</div>

  );
}
