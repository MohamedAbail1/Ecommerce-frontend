import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Charger le produit depuis l'API
  useEffect(() => {
    fetch(`http://localhost:8000/api/shop/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Erreur lors du chargement du produit:", err));
  }, [id]);

  // Ajouter le produit au panier (localStorage et BD)
  const addToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Veuillez vous connecter pour ajouter au panier.");
      navigate("/Login");
      return;
    }

    try {
      // Ajouter dans le panier local
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingProductIndex = storedCart.findIndex((item) => item.id === product.id);

      if (existingProductIndex >= 0) {
        storedCart[existingProductIndex].quantity += 1;
      } else {
        storedCart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(storedCart));

      // Ajouter dans la BD (API NestJS)
      await fetch("http://localhost:8000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1,
        }),
      });

      // Afficher un message de succès
      setSuccessMessage("Produit ajouté au panier avec succès !");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  if (!product) {
    return (
      <>
        <Navbar />
        <p className="text-center mt-10">Chargement du produit...</p>
      </>
    );
  }

  return (
    <>
  <Navbar />
  {successMessage && (
    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-3 px-4 mb-6 shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        {successMessage}
      </div>
    </div>
  )}
  
  <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
        
        {/* Product Details */}
        <div className="md:w-1/2 p-8 flex flex-col">
          <div className="flex-grow">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h2>
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-500 text-sm ml-2">(24 reviews)</span>
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
            
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-gray-900">{product.price} DH</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through ml-3">{product.originalPrice} DH</span>
              )}
            </div>
          </div>
          
          <div className="mt-auto">
            <button
              onClick={addToCart}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</>
  );
}
