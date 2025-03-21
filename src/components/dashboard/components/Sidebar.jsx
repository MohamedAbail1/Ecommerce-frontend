import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed top-0 left-0">
      <div className="p-6 font-bold text-2xl border-b border-gray-700">Admin</div>
      <nav className="p-4 space-y-4">
        <Link to="/" className="block hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link to="/users" className="block hover:bg-gray-700 p-2 rounded">Users</Link>
        <Link to="/products" className="block hover:bg-gray-700 p-2 rounded">Products</Link>
        <Link to="/categories" className="block hover:bg-gray-700 p-2 rounded">Categories</Link>
        <Link to="/orders" className="block hover:bg-gray-700 p-2 rounded">Orders</Link>
      </nav>
    </div>
  );
}
