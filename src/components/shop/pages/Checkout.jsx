import React, { useEffect, useState } from "react";
import Navbar from "../../Acceuil/NavBar";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [isPaid, setIsPaid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Réinitialiser les erreurs

    const token = localStorage.getItem("token"); // Récupérer le token stocké
    if (!token) {
      setErrorMessage("Vous devez être connecté pour passer une commande.");
      return;
    }

    const orderData = {
      products: cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      total_amount: total,
    };

    try {
      console.log("📡 Envoi de la commande:", JSON.stringify(orderData));

      const response = await fetch("http://127.0.0.1:8000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ajout du token
        },
        body: JSON.stringify(orderData),
      });

      const responseData = await response.text();
      console.log("📝 Réponse brute:", responseData);

      const data = JSON.parse(responseData);

      if (response.ok) {
        
        localStorage.removeItem("cart");
        setCart([]);
        setIsPaid(true);
      } else {
        setErrorMessage(data.error || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error("❌ Erreur lors de la commande:", error);
      setErrorMessage("Erreur de connexion au serveur.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <div className="mt-2 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            </div>
          </div>

          {errorMessage && (
            <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
              {errorMessage}
            </div>
          )}

          {isPaid ? (
            <div className="text-center bg-white p-8 rounded-xl shadow-sm border border-green-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Merci pour votre achat !
              </h3>
              <p className="text-gray-600 mb-6">
                Votre commande a été placée avec succès.
              </p>
              <button
                onClick={() => window.location.href = "/"}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-md transition-all"
              >
                Continuer vos achats
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Résumé de la commande
                </h2>
                {cart.length === 0 ? (
                  <p className="text-center text-gray-500">
                    Votre panier est vide
                  </p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-md overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.quantity} × {item.price} DH</p>
                          </div>
                        </div>
                        <p className="font-medium text-gray-900">{item.price * item.quantity} DH</p>
                      </div>
                    ))}
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between text-lg font-semibold text-gray-900">
                        <span>Total</span>
                        <span>{total} DH</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <form onSubmit={handlePlaceOrder} className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Informations de paiement
                </h2>
                <div className="space-y-5">
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nom complet" className="w-full p-3 border border-gray-300 rounded-lg" required />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-3 border border-gray-300 rounded-lg" required />
                  <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="Numéro de carte" className="w-full p-3 border border-gray-300 rounded-lg" required />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleChange} placeholder="MM/AA" className="w-full p-3 border border-gray-300 rounded-lg" required />
                    <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="CVV" className="w-full p-3 border border-gray-300 rounded-lg" required />
                  </div>
                  <button type="submit" disabled={cart.length === 0} className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-md transition-all ${cart.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
                    Confirmer le paiement
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
