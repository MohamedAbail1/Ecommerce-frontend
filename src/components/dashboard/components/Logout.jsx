import React from "react";
import { useNavigate } from "react-router-dom"; // Si tu utilises react-router-dom pour la navigation

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimer le token du localStorage
    localStorage.removeItem("token");

    // Rediriger vers la page de connexion
    navigate("/login"); // Utilise navigate si tu utilises react-router-dom
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}
