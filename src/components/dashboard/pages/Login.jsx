import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // État pour gérer l'affichage/masquage du mot de passe
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
  
      const user = res.data.user;
      const token = res.data.token;
  
      if (user && token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
  
        // Redirection selon le rôle
        if (user.role === 'admin') {
          navigate("/Dashboard");
        } else if (user.role === 'user') {
          navigate("/");
        } else {
          setError("Rôle non reconnu.");
        }
      } else {
        setError("Informations de connexion invalides.");
      }
    } catch (err) {
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl mb-6 text-center font-bold">Connexion</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border mb-4 rounded"
          required
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}  // Afficher ou masquer le mot de passe
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="button"
            className="absolute top-2 right-2"
            onClick={() => setShowPassword(!showPassword)} // Toggle visibility
          >
            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-500`} />
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Connexion
        </button>
  
        {/* Lien vers la page d'inscription */}
        <p className="mt-4 text-center">
          Pas encore inscrit ?{' '}
          <Link to="/SignUp" className="text-blue-500 hover:text-blue-600">
            Créez un compte
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
