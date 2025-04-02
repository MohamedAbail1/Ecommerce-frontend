import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FaEye, FaSearch, FaTimes, FaCheck, FaBan, FaBox, FaSpinner } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchOrders();
  }, [token, navigate]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch orders");
      
      const data = await response.json();
      // Trier les commandes pour mettre "pending" en premier
      const sortedOrders = [...data].sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        return 0;
      });
      
      setOrders(sortedOrders);
      setFilteredOrders(sortedOrders);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = orders.filter((order) => {
      return (
        order.id.toString().includes(value) ||
        order.user?.name.toLowerCase().includes(value)
      );
    });

    // Trier les résultats filtrés pour mettre "pending" en premier
    const sortedFiltered = [...filtered].sort((a, b) => {
      if (a.status === 'pending' && b.status !== 'pending') return -1;
      if (a.status !== 'pending' && b.status === 'pending') return 1;
      return 0;
    });

    setFilteredOrders(sortedFiltered);
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const updateOrderStatus = async (id, newStatus) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`http://localhost:8000/api/admin/orders/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update order status");
      
      fetchOrders();
      if (selectedOrder?.id === id) {
        closeModal();
      }
      toast.success(`Order ${newStatus} successfully!`, {
        className: "bg-green-50 text-green-800 border-l-4 border-green-500",
      });
    } catch (error) {
      toast.error(error.message, {
        className: "bg-red-50 text-red-800 border-l-4 border-red-500",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const confirmUpdateStatus = (id, newStatus) => {
    toast.info(
      <div className="p-3">
        <p className="text-gray-700 mb-3">Are you sure you want to {newStatus} this order?</p>
        <div className="flex gap-3 justify-center">
          <button 
            onClick={async () => {
              await updateOrderStatus(id, newStatus);
              toast.dismiss();
            }} 
            className={`px-4 py-2 bg-gradient-to-r ${
              newStatus === 'validated' ? 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' 
              : 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
            } text-white rounded-lg transition-all shadow-md`}
          >
            Confirm
          </button>
          <button 
            onClick={() => toast.dismiss()} 
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false, className: "bg-white" }
    );
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg max-w-md">
        <h3 className="font-bold text-lg mb-2">Loading Error</h3>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <ToastContainer position="top-right" autoClose={5000} />
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
              <FaBox className="text-purple-600 text-2xl" />
              Orders Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">View and manage customer orders</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={handleSearch}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-purple-50 to-blue-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="font-medium text-gray-800">{order.user?.name || "Unknown"}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${order.total_amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleView(order)}
                            className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                            title="View details"
                          >
                            <FaEye className="h-5 w-5" />
                          </button>
                          {order.status === 'pending' && (
                            <>
                              <button
                                onClick={() => confirmUpdateStatus(order.id, "validated")}
                                className="text-green-600 hover:text-green-900 p-2 rounded-lg hover:bg-green-50 transition-colors"
                                title="Validate order"
                                disabled={isUpdating}
                              >
                                <FaCheck className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => confirmUpdateStatus(order.id, "cancelled")}
                                className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                title="Cancel order"
                                disabled={isUpdating}
                              >
                                <FaBan className="h-5 w-5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <FaBox className="h-12 w-12" />
                        <p className="mt-2 text-sm font-medium text-gray-500">
                          {searchTerm ? "No orders found" : "No orders exist"}
                        </p>
                        {searchTerm ? (
                          <button
                            onClick={() => setSearchTerm("")}
                            className="mt-4 text-purple-600 hover:text-purple-800 text-sm font-medium"
                          >
                            Reset search
                          </button>
                        ) : (
                          <p className="mt-1 text-sm text-gray-500">When orders are placed, they will appear here</p>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-gray-100/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-200">
            <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
              <h3 className="font-semibold text-xl text-gray-800">Order Details</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition p-2 rounded-full hover:bg-gray-100"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order ID</p>
                  <p className="font-medium">#{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Customer</p>
                  <p className="font-medium">{selectedOrder.user?.name || "Unknown"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <p className={`font-medium capitalize ${
                    selectedOrder.status === 'completed' ? 'text-green-600' :
                    selectedOrder.status === 'validated' ? 'text-blue-600' :
                    selectedOrder.status === 'pending' ? 'text-yellow-600' :
                    selectedOrder.status === 'cancelled' ? 'text-red-600' :
                    'text-gray-600'
                  }`}>
                    {selectedOrder.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                  <p className="font-medium">${selectedOrder.total_amount}</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-lg mb-4 pb-2 border-b text-gray-800">Products</h4>
                <div className="space-y-4">
                  {selectedOrder.products.length > 0 ? (
                    selectedOrder.products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-start pb-4 border-b border-gray-100"
                      >
                        <img
                          src={product.image || "https://via.placeholder.com/80"}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded mr-4 border border-gray-200"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{product.name}</p>
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
            <div className="border-t p-4 flex justify-between sticky bottom-0 bg-white">
              {selectedOrder.status === 'pending' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => confirmUpdateStatus(selectedOrder.id, "validated")}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md"
                    disabled={isUpdating}
                  >
                    {isUpdating ? <FaSpinner className="animate-spin" /> : <FaCheck />}
                    <span>Validate Order</span>
                  </button>
                  <button
                    onClick={() => confirmUpdateStatus(selectedOrder.id, "cancelled")}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md"
                    disabled={isUpdating}
                  >
                    {isUpdating ? <FaSpinner className="animate-spin" /> : <FaBan />}
                    <span>Cancel Order</span>
                  </button>
                </div>
              )}
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
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