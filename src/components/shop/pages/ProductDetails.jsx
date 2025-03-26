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
            Ajouter au panier
          </button>
        </div>
      </div>
    </>
  );
}
