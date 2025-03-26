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

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Votre Panier</h2>
        {cart.length === 0 ? (
          <p>Votre panier est vide.</p>
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
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4">
              <p className="text-lg font-bold">Total: {total} DH</p>
              <button
                onClick={handleBuyNow}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
              >
                Acheter maintenant
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
