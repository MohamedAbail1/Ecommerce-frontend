// src/components/shop/pages/Cart.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();  // Utilisation de `useNavigate` pour la redirection

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Fonction pour naviguer vers la page de paiement (Checkout)
  const handleBuyNow = () => {
    navigate("/shop/checkout");  // Redirection vers Checkout.jsx
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border p-4 rounded"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>
                    {item.quantity} x {item.price} DH
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                  <button
                    onClick={handleBuyNow}  // Redirige vers Checkout
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
            <p className="text-lg font-bold text-right">Total: {total} DH</p>
          </div>
        )}
      </div>
    </>
  );
}
