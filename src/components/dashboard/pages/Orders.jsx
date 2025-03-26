import { useEffect, useState } from "react";
import { FaEye, FaSearch, FaTimes } from "react-icons/fa";
import Header from "../components/Header";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/admin/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data);
        setFilteredOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = orders.filter((order) => {
      return (
        order.id.toString().includes(value) ||
        order.user?.name.toLowerCase().includes(value)
      );
    });

    setFilteredOrders(filtered);
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Orders" />
      <div className="container mx-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow">
          {/* Barre de recherche */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Rechercher une commande..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
          </div>

          {/* Tableau des commandes */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 font-medium">Order ID</th>
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">{order.id}</td>
                    <td className="px-4 py-3">{order.user?.name || "Unknown"}</td>
                    <td className="px-4 py-3">${order.total_amount}</td>
                    <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'validated' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleView(order)}
                        className="text-blue-600 hover:text-blue-800 transition p-2 rounded-full hover:bg-blue-50"
                        title="View details"
                      >
                        <FaEye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal pour afficher les détails de la commande */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-gray-100/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          {/* Effet de bruit simple */}
          <div className="absolute inset-0 bg-[radial-gradient(#00000010_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>
          
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-200">
            <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
              <h3 className="font-semibold text-xl">Order Details</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order ID</p>
                  <p className="font-medium">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">User</p>
                  <p className="font-medium">
                    {selectedOrder.user?.name || "Unknown"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <p className="font-medium capitalize">{selectedOrder.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                  <p className="font-medium">${selectedOrder.total_amount}</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-lg mb-4 pb-2 border-b">Products</h4>
                <div className="space-y-4">
                  {selectedOrder.products.length > 0 ? (
                    selectedOrder.products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-start pb-4 border-b border-gray-100"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded mr-4 border border-gray-200"
                        />
                        <div className="flex-1">
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <span className="text-gray-500">Price:</span>
                            <span className="text-gray-500">Quantity:</span>
                            <span className="text-gray-500">Subtotal:</span>
                            <span>${product.price}</span>
                            <span>{product.pivot.quantity}</span>
                            <span>${(product.price * product.pivot.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 py-4 text-center">No products in this order.</p>
                  )}
                </div>
              </div>
            </div>
            <div className="border-t p-4 flex justify-end sticky bottom-0 bg-white">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition text-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}