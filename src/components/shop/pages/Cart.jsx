import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Charger les produits du panier depuis l'API
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Veuillez vous connecter pour voir votre panier.");
        navigate("/Login");
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/api/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des produits du panier.");
        }

        const data = await response.json();
        setCart(data); // Mise à jour du panier avec les données récupérées depuis l'API
      } catch (error) {
        console.error("Erreur lors de la récupération des produits du panier:", error);
        alert("Une erreur est survenue lors de la récupération du panier.");
      }
    };

    fetchCart();
  }, [navigate]);

  // Fonction pour supprimer un produit du panier (localStorage et API)
  const removeFromCart = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Veuillez vous connecter pour supprimer un produit.");
      navigate("/Login");
      return;
    }

    try {
      console.log("Suppression du produit avec l'ID:", id);

      // Suppression du produit du panier local
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);

      // Suppression du produit de la base de données via l'API
      const response = await fetch(`http://localhost:8000/api/cart/remove/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du produit");
      }

      // Mise à jour du localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      console.log("Produit supprimé avec succès depuis la BD et le panier local.");
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
      alert("Une erreur est survenue lors de la suppression du produit.");
    }
  };

  // Calcul du total du panier
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Fonction pour finaliser l'achat
  const handleBuyNow = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Veuillez vous connecter pour finaliser votre achat.");
      navigate("/Login");
      return;
    }

    // Ne rien envoyer à l'API ici car les produits sont déjà dans la BD (via "Add to Cart")
    // Juste nettoyer le panier local et naviguer vers la page de paiement
    localStorage.removeItem("cart");
    setCart([]);
    navigate("/shop/checkout");
  };
  const handleProducts = ()=>{
    navigate("/");
  }

  return (
    <>
  <Navbar />
  <div className="p-6 max-w-3xl mx-auto">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Votre Panier</h2>
    
    {cart.length === 0 ? (
      <div className="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p className="mt-4 text-gray-500 text-lg">Votre panier est vide</p>
        <button onClick={()=>handleProducts()} className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
          Découvrir nos produits
        </button>
      </div>
    ) : (
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                {/* Replace with actual product image if available */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600">
                  {item.quantity} × {item.price} DH
                </p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
        
        <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-800">{total} DH</p>
            </div>
            <button
              onClick={handleBuyNow}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center"
            >
              <span>Passer la commande</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Livraison gratuite pour les commandes supérieures à 200 DH
        </div>
      </div>
    )}
  </div>
</>
  );
}
