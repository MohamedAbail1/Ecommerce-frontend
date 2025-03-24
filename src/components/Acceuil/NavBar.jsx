import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

 

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo et navigation principale */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-blue-600 font-bold text-2xl">ShopFlex</Link>
            </div>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/shop" className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">Accueil</Link>
              {/* <Link to="/products" className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">Produits</Link> */}
              {/* <Link to="/categories" className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">Catégories</Link> */}
              <Link to="/shop/about" className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">À propos</Link>
              <Link to="/shop/Contact"  className="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">Contact</Link>
            </div>
          </div>
          
          {/* Côté droit: recherche, compte, panier */}
          <div className="flex items-center">
            {/* Bouton recherche */}
            {/* <button 
              onClick={toggleSearch}
              className="p-2 text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button> */}
            
            {/* Compte utilisateur */}
            <Link to="/login" className="flex items-center p-2 ml-2 text-gray-600 hover:text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Login</span>
            </Link>

            
            {/* Panier */}
            {/* <Link to="/cart" className="p-2 ml-2 text-gray-600 hover:text-blue-600 relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute top-0 right-0 bg-blue-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">3</span>
            </Link> */}
            
            {/* Bouton menu mobile */}
            <div className="ml-2 flex md:hidden">
              <button 
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isMenuOpen ? 'hidden' : 'block'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isMenuOpen ? 'block' : 'hidden'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
     
      
      {/* Menu mobile */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-200`}>
        <div className="px-2 py-3 space-y-1">
          <Link to="/" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600 font-medium">Accueil</Link>
          <Link to="/products" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600 font-medium">Produits</Link>
          <Link to="/categories" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600 font-medium">Catégories</Link>
          <Link to="/about" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600 font-medium">À propos</Link>
          <Link to="/contact" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600 font-medium">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;