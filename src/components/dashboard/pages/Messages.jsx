import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FaEye, FaSearch, FaTimes, FaReply, FaEnvelope, FaSpinner } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchMessages();
  }, [token, navigate]);

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/admin/contact", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch messages");
      
      const data = await response.json();
      // Trier les messages pour mettre "unread" en premier
      const sortedMessages = [...data].sort((a, b) => {
        if (a.status === 'unread' && b.status !== 'unread') return -1;
        if (a.status !== 'unread' && b.status === 'unread') return 1;
        return new Date(b.created_at) - new Date(a.created_at);
      });
      
      setMessages(sortedMessages);
      setFilteredMessages(sortedMessages);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
  
    const filtered = messages.filter((message) => {
      return (
        message.id.toString().includes(value) ||
        message.name.toLowerCase().includes(value) ||
        message.email.toLowerCase().includes(value) ||
        message.subject.toLowerCase().includes(value)
      );
    });
  
    // Trier les résultats filtrés pour mettre "unread" en premier
    const sortedFiltered = [...filtered].sort((a, b) => {
      if (a.status === 'unread' && b.status !== 'unread') return -1;
      if (a.status !== 'unread' && b.status === 'unread') return 1;
      return new Date(b.created_at) - new Date(a.created_at);
    });
  
    setFilteredMessages(sortedFiltered);
  };

  const handleView = (message) => {
    setSelectedMessage(message);
    setShowModal(true);
    // Mark as read when viewing
    if (message.status === 'unread') {
      updateMessageStatus(message.id, 'read');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMessage(null);
    setReplyContent("");
  };

  const updateMessageStatus = async (id, newStatus) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`http://localhost:8000/api/admin/contact/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update message status");
      
      fetchMessages();
      if (selectedMessage?.id === id) {
        setSelectedMessage({...selectedMessage, status: newStatus});
      }
    } catch (error) {
      toast.error(error.message, {
        className: "bg-red-50 text-red-800 border-l-4 border-red-500",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const sendReply = async () => {
    if (!replyContent.trim()) {
      toast.error("Reply content cannot be empty", {
        className: "bg-red-50 text-red-800 border-l-4 border-red-500",
      });
      return;
    }

    setIsUpdating(true);
    try {
      const response = await fetch(`http://localhost:8000/api/admin/contact/${selectedMessage.id}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reply: replyContent }),
      });

      if (!response.ok) throw new Error("Failed to send reply");
      
      toast.success("Reply sent successfully!", {
        className: "bg-green-50 text-green-800 border-l-4 border-green-500",
      });
      setReplyContent("");
      fetchMessages();
    } catch (error) {
      toast.error(error.message, {
        className: "bg-red-50 text-red-800 border-l-4 border-red-500",
      });
    } finally {
      setIsUpdating(false);
    }
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
              <FaEnvelope className="text-purple-600 text-2xl" />
              Messages Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">View and manage customer messages</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={handleSearch}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            />
          </div>
        </div>

        {/* Messages Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-purple-50 to-blue-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    From
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Subject
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((message) => (
                    <tr 
                      key={message.id} 
                      className={`hover:bg-gray-50 transition-colors ${message.status === 'unread' ? 'bg-blue-50' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{message.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">{message.name}</div>
                        <div className="text-sm text-gray-500">{message.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                        {message.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(message.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleView(message)}
                            className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                            title="View message"
                          >
                            <FaEye className="h-5 w-5" />
                          </button>
                          {message.status !== 'replied' && (
                            <button
                              onClick={() => {
                                handleView(message);
                                document.getElementById('reply-textarea')?.focus();
                              }}
                              className="text-purple-600 hover:text-purple-900 p-2 rounded-lg hover:bg-purple-50 transition-colors"
                              title="Reply to message"
                            >
                              <FaReply className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <FaEnvelope className="h-12 w-12" />
                        <p className="mt-2 text-sm font-medium text-gray-500">
                          {searchTerm ? "No messages found" : "No messages exist"}
                        </p>
                        {searchTerm ? (
                          <button
                            onClick={() => setSearchTerm("")}
                            className="mt-4 text-purple-600 hover:text-purple-800 text-sm font-medium"
                          >
                            Reset search
                          </button>
                        ) : (
                          <p className="mt-1 text-sm text-gray-500">When messages are received, they will appear here</p>
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

      {/* Message Details Modal */}
      {showModal && selectedMessage && (
        <div className="fixed inset-0 bg-gray-100/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-200">
            <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
              <h3 className="font-semibold text-xl text-gray-800">Message Details</h3>
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
                  <p className="text-sm text-gray-500 mb-1">Message ID</p>
                  <p className="font-medium">#{selectedMessage.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <p className={`font-medium capitalize ${
                    selectedMessage.status === 'read' ? 'text-green-600' :
                    selectedMessage.status === 'unread' ? 'text-blue-600' :
                    selectedMessage.status === 'replied' ? 'text-purple-600' :
                    'text-gray-600'
                  }`}>
                    {selectedMessage.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">From</p>
                  <p className="font-medium">{selectedMessage.name}</p>
                  <p className="text-sm text-gray-600">{selectedMessage.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date</p>
                  <p className="font-medium">{new Date(selectedMessage.created_at).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Subject</p>
                <p className="font-medium text-lg mb-4">{selectedMessage.subject}</p>
                
                <p className="text-sm text-gray-500 mb-1">Message</p>
                <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-line">
                  {selectedMessage.message}
                </div>
              </div>

              {selectedMessage.status === 'replied' && selectedMessage.reply && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Your Reply</p>
                  <div className="bg-purple-50 p-4 rounded-lg whitespace-pre-line">
                    {selectedMessage.reply}
                  </div>
                </div>
              )}

              {selectedMessage.status !== 'replied' && (
                <div>
                  <label htmlFor="reply-textarea" className="block text-sm font-medium text-gray-700 mb-2">
                    Reply to this message
                  </label>
                  <textarea
                    id="reply-textarea"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Type your reply here..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                  />
                </div>
              )}
            </div>
            <div className="border-t p-4 flex justify-between sticky bottom-0 bg-white">
              {selectedMessage.status !== 'replied' && (
                <button
                  onClick={sendReply}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-md"
                  disabled={isUpdating || !replyContent.trim()}
                >
                  {isUpdating ? <FaSpinner className="animate-spin" /> : <FaReply />}
                  <span>Send Reply</span>
                </button>
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