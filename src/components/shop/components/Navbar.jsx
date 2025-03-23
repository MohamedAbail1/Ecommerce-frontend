// src/components/shop/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/shop" className="text-xl font-bold text-blue-600">
        MyShop
      </Link>
      <div className="space-x-4">
        <Link to="/shop" className="text-gray-700 hover:text-blue-500">
          Home
        </Link>
        <Link to="/shop/cart" className="text-gray-700 hover:text-blue-500">
          Cart
        </Link>
      </div>
    </nav>
  );
}
