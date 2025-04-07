import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCog, faUsers, faShoppingBag, faBoxOpen, faClipboardList, faUser, faSignOutAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Logout from './Logout';

import { faStore, faWarehouse, faCrown } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleProfile = () => {
    // Logique pour afficher la page de profil
    console.log('Naviguer vers le profil...');
  };

  return (
    <div className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-4 h-screen sticky top-0">
      {/* Section Logo/Marque */}
      <div className="mb-8 p-2 flex items-center justify-center border-b border-gray-700 pb-4">
        <FontAwesomeIcon icon={faStore} className="h-6 w-6 mr-2 text-blue-400" />
        <span className="text-xl font-bold">ShopSphere</span>
      </div>

      <nav className="space-y-1">
        {/* Navigation principale */}
        <Link 
          to="/Dashboard" 
          className="flex items-center hover:bg-gray-700 p-3 rounded-lg transition-all duration-200 group"
        >
          <FontAwesomeIcon 
            icon={faHome} 
            className="h-5 w-5 mr-3 text-gray-400 group-hover:text-blue-300" 
          />
          <span className="group-hover:text-white">Tableau de bord</span>
        </Link>
        
        <Link 
          to="/users" 
          className="flex items-center hover:bg-gray-700 p-3 rounded-lg transition-all duration-200 group"
        >
          <FontAwesomeIcon 
            icon={faUsers} 
            className="h-5 w-5 mr-3 text-gray-400 group-hover:text-blue-300" 
          />
          <span className="group-hover:text-white">Clients</span>
        </Link>
        
        <Link 
          to="/products" 
          className="flex items-center hover:bg-gray-700 p-3 rounded-lg transition-all duration-200 group"
        >
          <FontAwesomeIcon 
            icon={faShoppingBag} 
            className="h-5 w-5 mr-3 text-gray-400 group-hover:text-blue-300" 
          />
          <span className="group-hover:text-white">Produits</span>
        </Link>
        
        <Link 
          to="/categories" 
          className="flex items-center hover:bg-gray-700 p-3 rounded-lg transition-all duration-200 group"
        >
          <FontAwesomeIcon 
            icon={faBoxOpen} 
            className="h-5 w-5 mr-3 text-gray-400 group-hover:text-blue-300" 
          />
          <span className="group-hover:text-white">Catégories</span>
        </Link>
        
        <Link 
          to="/orders" 
          className="flex items-center hover:bg-gray-700 p-3 rounded-lg transition-all duration-200 group"
        >
          <FontAwesomeIcon 
            icon={faClipboardList} 
            className="h-5 w-5 mr-3 text-gray-400 group-hover:text-blue-300" 
          />
          <span className="group-hover:text-white">Commandes</span>
        </Link>

        {/* Lien pour les messages */}
        <Link 
          to="/messages" 
          className="flex items-center hover:bg-gray-700 p-3 rounded-lg transition-all duration-200 group"
        >
          <FontAwesomeIcon 
            icon={faEnvelope} 
            className="h-5 w-5 mr-3 text-gray-400 group-hover:text-blue-300" 
          />
          <span className="group-hover:text-white">Messages</span>
        </Link>

        {/* Section Compte */}
        <div className="pt-4 mt-4 border-t border-gray-700">
          <p className="text-xs uppercase text-gray-500 px-3 mb-2">Compte</p>
          
          <div 
            className="flex items-center hover:bg-gray-700 p-3 rounded-lg transition-all duration-200 group cursor-pointer" 
            onClick={handleProfile}
          >
            <FontAwesomeIcon 
              icon={faUser} 
              className="h-5 w-5 mr-3 text-gray-400 group-hover:text-blue-300" 
            />
            <span className="group-hover:text-white">{user.name}</span>
          </div>
          
          <div 
            className="flex items-center hover:bg-gray-700 p-3 rounded-lg transition-all duration-200 group cursor-pointer" 
            onClick={handleProfile}
          >
            <FontAwesomeIcon 
              icon={faCog} 
              className="h-5 w-5 mr-3 text-gray-400 group-hover:text-blue-300" 
            />
            <span className="group-hover:text-white">Paramètres</span>
          </div>
          
          <div 
            className="flex items-center hover:bg-gray-700 p-3 rounded-lg transition-all duration-200 group cursor-pointer text-red-400 hover:text-red-300" 
          >
            <FontAwesomeIcon 
              icon={faSignOutAlt} 
              className="h-5 w-5 mr-3" 
            />
            <Logout />
          </div>
        </div>
      </nav>
    </div>
  );
}
