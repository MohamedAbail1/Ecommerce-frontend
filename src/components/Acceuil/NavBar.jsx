import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, LogIn, User, ShoppingCart, UserCircle, Search } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Synchroniser la recherche avec l'URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('q') || '';
    setSearchQuery(search);
  }, [location.search]);

  // Mettre à jour le compteur du panier
  const updateCartCount = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = storedCart.reduce((total, item) => total + (item.quantity || 1), 0);
    setCartItemsCount(count);
  };

  useEffect(() => {
    // Charger l'utilisateur
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.role === "user") {
          setUser(parsedUser);
        }
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }

    updateCartCount();

    const handleCartUpdate = () => updateCartCount();
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const toggleSearch = () => setShowSearch(!showSearch);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsProfileOpen(false);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
      navigate({
        pathname: '/catalog',
        search: params.toString()
      });
    } else {
      navigate('/catalog');
    }
    
    setShowSearch(false);
    setIsMenuOpen(false);
  };

  // Fermer le menu profil quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest('.profile-menu')) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center text-2xl font-bold text-blue-600 hover:text-blue-700 transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            🛍️ ShopFlex
          </Link>

          {/* Barre de recherche - Desktop */}
          {/* <div className="hidden md:flex flex-1 mx-6 max-w-md">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div> */}

          {/* Navigation links - Desktop */}
          <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600 transition duration-200">Accueil</Link>
            <Link to="/shop/contact" className="hover:text-blue-600 transition duration-200">Contact</Link>
            <Link to="/shop/about" className="hover:text-blue-600 transition duration-200">À propos</Link>
            <Link to="/catalog" className="hover:text-blue-600 transition duration-200">Catalogue</Link>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Bouton recherche mobile */}
            <button 
              onClick={toggleSearch}
              className="md:hidden p-1 text-gray-700 hover:text-blue-600 transition"
              aria-label="Rechercher"
            >
              <Search className="h-6 w-6" />
            </button>

            {/* Panier avec badge */}
            <Link 
              to="/shop/cart" 
              className="relative flex items-center text-gray-700 hover:text-blue-600 transition duration-200 group"
              aria-label="Panier"
            >
              <div className="flex items-center">
                <ShoppingCart className="h-6 w-6 mr-1" />
              </div>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount > 9 ? '9+' : cartItemsCount}
                </span>
              )}
            </Link>

            {/* Utilisateur connecté */}
            {user ? (
              <div className="hidden md:flex items-center space-x-3 relative profile-menu">
                <div 
                  className="flex items-center gap-1 text-gray-700 cursor-pointer hover:text-blue-600 transition duration-200"
                  onClick={toggleProfile}
                >
                  <UserCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{user.name || user.email.split('@')[0]}</span>
                </div>
                
                {/* Menu déroulant profil */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Mon profil
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center gap-1 text-gray-700 hover:text-blue-600 transition duration-200"
              >
                <UserCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Se connecter</span>
              </Link>
            )}

            {/* Menu hamburger mobile */}
            <button 
              onClick={toggleMenu}
              className="md:hidden p-1 text-gray-700 hover:text-blue-600 transition"
              aria-label="Menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Barre de recherche mobile */}
        {showSearch && (
          <div className="md:hidden mt-2 pb-2">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium"
              onClick={toggleMenu}
            >
              Accueil
            </Link>
            <Link 
              to="/shop/about" 
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium"
              onClick={toggleMenu}
            >
              À propos
            </Link>
            <Link 
              to="/shop/contact" 
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Link 
              to="/catalog" 
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium"
              onClick={toggleMenu}
            >
              Catalogue
            </Link>
            
            {/* Section compte mobile */}
            <div className="border-t pt-2 mt-2">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-blue-600 hover:text-blue-800 hover:bg-gray-50 font-medium flex items-center"
                    onClick={toggleMenu}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Mon profil
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-red-600 hover:text-red-800 hover:bg-gray-50 font-medium flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-blue-600 hover:text-blue-800 hover:bg-gray-50 font-medium flex items-center"
                  onClick={toggleMenu}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Se connecter
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;