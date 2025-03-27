import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FaTrashAlt, FaEye, FaSearch, FaUser, FaUserPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:8000/api/admin/users", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) throw new Error("Erreur lors du chargement des utilisateurs");
        return response.json();
      })
      .then(data => {
        const filteredUsers = data.filter(user => user.role === 'user');
        setUsers(filteredUsers);
        setFilteredUsers(filteredUsers);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [navigate]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = users.filter((user) => {
      return user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value);
    });

    setFilteredUsers(filtered);
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
  
    toast.info(
      <div className="p-3">
        <p className="text-gray-700 mb-3">Voulez-vous vraiment supprimer cet utilisateur ?</p>
        <div className="flex gap-3 justify-center">
          <button 
            onClick={() => confirmDelete(id, token)} 
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md"
          >
            Oui, supprimer
          </button>
          <button 
            onClick={() => toast.dismiss()} 
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
          >
            Annuler
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false, className: "bg-white" }
    );
  };
  
  const confirmDelete = async (id, token) => {
    try {
      const response = await fetch(`http://localhost:8000/api/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        toast.success("Utilisateur supprimé avec succès !", {
          className: "bg-green-50 text-green-800 border-l-4 border-green-500",
        });
        setFilteredUsers(filteredUsers.filter((user) => user.id !== id));
      } else {
        toast.error("Échec de la suppression de l'utilisateur.", {
          className: "bg-red-50 text-red-800 border-l-4 border-red-500",
        });
      }
    } catch (error) {
      toast.error("Une erreur est survenue !", {
        className: "bg-red-50 text-red-800 border-l-4 border-red-500",
      });
      console.error(error);
    }
    toast.dismiss();
  };

  const handleView = (id) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8000/api/admin/users/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) throw new Error("Utilisateur introuvable");
        return response.json();
      })
      .then(user => {
        toast.info(
          <div className="p-4">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 p-3 rounded-full mr-3">
                <FaUser className="text-blue-500 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-500">ID: {user.id}</p>
              </div>
            </div>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Rôle:</span> {user.role}</p>
              <p><span className="font-medium">Date de création:</span> {new Date(user.created_at).toLocaleDateString()}</p>
            </div>
          </div>, 
          {
            position: "top-right",
            autoClose: 5000,
            className: "bg-white border-l-4 border-blue-500 rounded-lg shadow-lg",
          }
        );
      })
      .catch(error => {
        toast.error(`Erreur: ${error.message}`, {
          position: "top-right",
          autoClose: 3000,
          className: "bg-red-50 text-red-800 border-l-4 border-red-500",
        });
      });
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg max-w-md">
        <h3 className="font-bold text-lg mb-2">Erreur de chargement</h3>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
              <FaUser className="text-purple-600 text-2xl" />
              Gestion des Utilisateurs
            </h1>
            <p className="text-sm text-gray-500 mt-1">Gérez les utilisateurs de votre plateforme</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={handleSearch}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            />
          </div>
        </div>
  
        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-purple-50 to-blue-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Nom
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-2 rounded-full mr-3">
                            <FaUser className="text-blue-500" />
                          </div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleView(user.id)}
                            className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                            title="Voir détails"
                          >
                            <FaEye className="text-lg" />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                            title="Supprimer"
                          >
                            <FaTrashAlt className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <FaUser className="h-12 w-12" />
                        <p className="mt-2 text-sm font-medium text-gray-500">Aucun utilisateur trouvé</p>
                        {searchTerm && (
                          <button
                            onClick={() => setSearchTerm("")}
                            className="mt-4 text-purple-600 hover:text-purple-800 text-sm font-medium"
                          >
                            Réinitialiser la recherche
                          </button>
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
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}