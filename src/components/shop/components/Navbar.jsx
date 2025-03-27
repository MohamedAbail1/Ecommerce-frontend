// src/components/shop/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
  {/* Logo */}
  <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">
    E-Shop
  </Link>

  {/* Navigation */}
  <div className="flex items-center space-x-6 text-gray-700 font-medium">
    <Link to="/" className="hover:text-blue-500 transition">Accueil</Link>
    <Link to="/" className="hover:text-blue-500 transition">Produits</Link>
    <Link to="/shop/contact" className="hover:text-blue-500 transition">Contact</Link>
    <Link to="/shop/cart" className="relative hover:text-blue-500 transition">
      Panier
      {/* Badge exemple pour items */}
      <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">2</span>
    </Link>
  </div>
</nav>

  );
}
