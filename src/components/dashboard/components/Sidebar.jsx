import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faCog, faUsers, faShoppingBag, faBoxOpen, faClipboardList, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const handleLogout = () => {
    // Logique de déconnexion (par exemple, supprimer le token, rediriger vers la page de login, etc.)
    console.log('Logging out...');
  };

  const handleProfile = () => {
    // Logique pour afficher la page de profil
    console.log('Navigating to profile...');
  };

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <nav className="space-y-4">
        <Link to="/" className="flex items-center hover:bg-gray-700 p-2 rounded">
          <FontAwesomeIcon icon={faHome} className="h-5 w-5 mr-3" />
          Dashboard
        </Link>
        <Link to="/users" className="flex items-center hover:bg-gray-700 p-2 rounded">
          <FontAwesomeIcon icon={faUsers} className="h-5 w-5 mr-3" />
          Users
        </Link>
        <Link to="/products" className="flex items-center hover:bg-gray-700 p-2 rounded">
          <FontAwesomeIcon icon={faShoppingBag} className="h-5 w-5 mr-3" />
          Products
        </Link>
        <Link to="/categories" className="flex items-center hover:bg-gray-700 p-2 rounded">
          <FontAwesomeIcon icon={faBoxOpen} className="h-5 w-5 mr-3" />
          Categories
        </Link>
        <Link to="/orders" className="flex items-center hover:bg-gray-700 p-2 rounded">
          <FontAwesomeIcon icon={faClipboardList} className="h-5 w-5 mr-3" />
          Orders
        </Link>

        <p className='flex items-center'>ACCOUNT PAGES</p>
        {/* Section Profil */}
        <div className="flex items-center hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={handleProfile}>
          <FontAwesomeIcon icon={faUser} className="h-5 w-5 mr-3" />
          Profile
        </div>
        {/* Section Profil */}
        <div className="flex items-center hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={handleProfile}>
          <FontAwesomeIcon icon={faCog} className="h-5 w-5 mr-3" />
          Profile
        </div>
        {/* Section Log Out */}
        <div className="flex items-center hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5 mr-3" />
          Log Out
        </div>
      </nav>
    </div>
  );
}
