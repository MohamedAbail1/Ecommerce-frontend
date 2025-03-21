import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faShoppingBag, faBoxOpen, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Sidebar() {
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
      </nav>
    </div>
  );
}
