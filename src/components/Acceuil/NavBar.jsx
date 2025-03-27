import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, LogIn, User } from "lucide-react"; 
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // 👈 Pour rediriger après logout

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role === "user") {
        setUser(parsedUser);
      }
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16 items-center">
      {/* Logo */}
      <Link to="/" className="flex items-center text-2xl font-bold text-blue-600 hover:text-blue-700 transition duration-200">
        🛍️ ShopFlex
      </Link>

      {/* Navigation links */}
      <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <Link to="/" className="hover:text-blue-600 transition duration-200">Accueil</Link>
        <Link to="/shop/about" className="hover:text-blue-600 transition duration-200">À propos</Link>
        <Link to="/shop/Contact" className="hover:text-blue-600 transition duration-200">Contact</Link>
        <a href="#products" className="hover:text-blue-500 transition">Produits</a>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Panier */}
        <Link to="/shop/cart" className="relative text-gray-700 hover:text-blue-600 transition duration-200">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.293 2.707A1 1 0 007.618 17h8.764a1 1 0 00.911-1.293L17 13M9 21h.01M15 21h.01" />
          </svg>
          {/* Badge panier (optionnel) */}
          {/* <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">3</span> */}
        </Link>

        {/* Utilisateur connecté */}
        {user ? (
  <>
    <span className="flex items-center gap-1 text-blue-600 font-semibold">
      <User className="w-4 h-4" />
      {user.name}
    </span>
    <button
      onClick={handleLogout}
      className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-semibold transition"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  </>
) : (
  <Link
    to="/login"
    className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-semibold transition"
  >
    <LogIn className="w-4 h-4" />
    Login
  </Link>
)}

        {/* Menu hamburger mobile */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700 hover:text-blue-600 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
    </div>
  </div>

  {/* Mobile Menu */}
  {isMenuOpen && (
    <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white border-t">
      <Link to="/" className="block text-gray-700 hover:text-blue-600 font-medium">Accueil</Link>
      <Link to="/shop/about" className="block text-gray-700 hover:text-blue-600 font-medium">À propos</Link>
      <Link to="/shop/Contact" className="block text-gray-700 hover:text-blue-600 font-medium">Contact</Link>
      <Link to="/shop/products" className="block text-gray-700 hover:text-blue-600 font-medium">Produits</Link>
      {user ? (
        <button
          onClick={handleLogout}
          className="w-full text-left text-red-600 font-medium hover:text-red-800"
        >
          Logout
        </button>
      ) : (
        <Link to="/login" className="block text-blue-600 font-medium hover:text-blue-800">Login</Link>
      )}
    </div>
  )}
</nav>

  );
};

export default Navbar;
