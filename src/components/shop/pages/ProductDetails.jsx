import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../../Acceuil/NavBar";
import Foot from "../../Acceuil/Footer";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [cart, setCart] = useState([]);

  // Charger les données initiales
  useEffect(() => {
    // Charger le produit
    fetch(`http://localhost:8000/api/shop/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Erreur lors du chargement du produit:", err));

    // Charger le panier depuis localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, [id]);

  // Fonction pour déclencher la mise à jour du panier
  const triggerCartUpdate = () => {
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  // Ajouter au panier sans authentification
  const addToCart = () => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingProductIndex = storedCart.findIndex((item) => item.id === product.id);

      if (existingProductIndex >= 0) {
        storedCart[existingProductIndex].quantity += 1;
      } else {
        storedCart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(storedCart));
      setCart(storedCart);
      triggerCartUpdate();

      setSuccessMessage("Produit ajouté au panier avec succès !");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  // Supprimer du panier (modifié pour ne pas nécessiter d'authentification)
  const removeFromCart = (productId) => {
    try {
      const updatedCart = cart.filter(item => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
      triggerCartUpdate();

      // Si l'utilisateur est connecté, synchroniser avec le backend
      const token = localStorage.getItem("token");
      if (token) {
        fetch(`http://localhost:8000/api/cart/remove/${productId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
    }
  };

  // Mettre à jour la quantité
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const updatedCart = cart.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
      triggerCartUpdate();

      // Si l'utilisateur est connecté, synchroniser avec le backend
      const token = localStorage.getItem("token");
      if (token) {
        fetch("http://localhost:8000/api/cart/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            product_id: productId,
            quantity: newQuantity,
          }),
        });
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la quantité:", error);
    }
  };

  // Passer la commande (modifié pour rediriger directement)
  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirection directe sans alert
    } else {
      navigate("/shop/checkout"); // Redirection directe vers le paiement
    }
  };

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-center text-lg">Chargement du produit...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      {successMessage && (
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-3 px-4 shadow-md">
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
            <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
            
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
                  <span className="text-gray-500 text-sm ml-2">(24 avis)</span>
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

        <div className="mt-12"></div>

        {cart.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Votre Panier
            </h3>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded-lg" />
                      <div>
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-gray-600">{item.price} DH</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 bg-gray-50">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                        >
                          +
                        </button>
                      </div>
                      
                      <span className="font-medium w-20 text-right">
                        {(item.price * item.quantity).toFixed(2)} DH
                      </span>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xl font-bold text-gray-900">Total:</span>
                    <span className="text-xl font-bold text-indigo-600">
                      {cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)} DH
                    </span>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Passer la commande
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Foot />
    </>
  );
}