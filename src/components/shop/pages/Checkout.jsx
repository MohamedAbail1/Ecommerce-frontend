// src/components/shop/pages/Checkout.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [isPaid, setIsPaid] = useState(false); // Ajout d'un état pour suivre le paiement

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    alert("Your order has been placed!");  // Simuler la commande
    localStorage.removeItem("cart");  // Vider le panier
    setCart([]);
    setIsPaid(true);  // Modifier l'état pour signaler que le paiement est effectué
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
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
              </div>
            ))}
            <p className="text-lg font-bold text-right">Total: {total} DH</p>
          </div>
        )}

        {/* Si l'utilisateur a payé, afficher un message de succès */}
        {isPaid ? (
          <div className="text-center bg-green-200 text-green-800 p-4 rounded">
            <h3 className="font-semibold">Thank you for your purchase!</h3>
            <p>Your order has been successfully placed.</p>
          </div>
        ) : (
          // Formulaire de paiement
          <form onSubmit={handlePlaceOrder} className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded"
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded"
                placeholder="Your Email"
                required
              />
            </div>

            <div>
              <label htmlFor="cardNumber" className="block text-sm font-semibold">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className="w-full p-3 border rounded"
                placeholder="Card Number"
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="expiryDate" className="block text-sm font-semibold">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="w-full p-3 border rounded"
                  placeholder="MM/YY"
                  required
                />
              </div>

              <div className="w-1/2">
                <label htmlFor="cvv" className="block text-sm font-semibold">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  className="w-full p-3 border rounded"
                  placeholder="CVV"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded mt-4"
            >
              Place Order
            </button>
          </form>
        )}
      </div>
    </>
  );
}
