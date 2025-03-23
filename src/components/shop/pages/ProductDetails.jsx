import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // État pour le message de succès

  useEffect(() => {
    fetch(`http://localhost:8000/api/shop/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error:", err));
  }, [id]);

  // Fonction pour ajouter un produit au panier
  const addToCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Vérifie si le produit est déjà dans le panier
    const existingProductIndex = storedCart.findIndex((item) => item.id === product.id);
    
    if (existingProductIndex >= 0) {
      // Si le produit est déjà dans le panier, on augmente la quantité
      storedCart[existingProductIndex].quantity += 1;
    } else {
      // Sinon, on l'ajoute au panier avec une quantité de 1
      storedCart.push({ ...product, quantity: 1 });
    }
    
    // Met à jour le localStorage et l'état du panier
    localStorage.setItem("cart", JSON.stringify(storedCart));

    // Afficher le message de succès
    setSuccessMessage("Product added to cart!");
    
    // Masquer le message après 3 secondes
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  if (!product) {
    return (
      <>
        <Navbar />
        <p className="text-center mt-10">Loading product...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      {/* Affichage du message de succès */}
      {successMessage && (
        <div className="bg-green-500 text-white text-center py-2 mb-4">
          {successMessage}
        </div>
      )}
      <div className="p-6 max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-80 object-cover rounded"
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-blue-600 mb-4">
            {product.price} DH
          </p>
          <button
            onClick={addToCart}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
