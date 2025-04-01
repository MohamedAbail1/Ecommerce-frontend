import React from "react";
import { Link } from "react-router-dom";

export default function Cart({ cart, removeFromCart, updateQuantity }) {
  if (!cart || cart.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-contain mr-4" />
                <div>
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <p className="text-gray-600">{item.price} DH</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex items-center border rounded-md mr-4">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-3 py-1">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                
                <span className="font-medium mr-4 w-20 text-right">
                  {(item.price * item.quantity).toFixed(2)} DH
                </span>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Sous-total:</span>
            <span className="font-medium">
              {cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)} DH
            </span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-medium">Livraison:</span>
            <span className="font-medium">Gratuite</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>
              {cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)} DH
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}