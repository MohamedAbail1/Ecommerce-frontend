import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FaPlus, FaEdit, FaTrash, FaBoxOpen, FaSearch } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editCategory, setEditCategory] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchCategories = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/categories", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) throw new Error("Erreur lors de la récupération des catégories");
        
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, [token, navigate]);

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addCategory = async () => {
    if (!newCategory) {
      toast.warning("Veuillez entrer un nom de catégorie", {
        className: "bg-yellow-50 text-yellow-800 border-l-4 border-yellow-500",
      });
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/admin/categories", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: newCategory })
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout de la catégorie");
      
      const data = await response.json();
      setCategories([...categories, data]);
      setNewCategory("");
      toast.success("Catégorie ajoutée avec succès !", {
        className: "bg-green-50 text-green-800 border-l-4 border-green-500",
      });
    } catch (error) {
      toast.error(error.message, {
        className: "bg-red-50 text-red-800 border-l-4 border-red-500",
      });
    }
  };

  const updateCategory = async (id) => {
    if (!editedName) {
      toast.warning("Veuillez entrer un nom de catégorie", {
        className: "bg-yellow-50 text-yellow-800 border-l-4 border-yellow-500",
      });
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/categories/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: editedName })
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour de la catégorie");
      
      const updatedCategory = await response.json();
      setCategories(categories.map(category => category.id === id ? updatedCategory : category));
      setEditCategory(null);
      setEditedName("");
      toast.success("Catégorie mise à jour avec succès !", {
        className: "bg-green-50 text-green-800 border-l-4 border-green-500",
      });
    } catch (error) {
      toast.error(error.message, {
        className: "bg-red-50 text-red-800 border-l-4 border-red-500",
      });
    }
  };

  const deleteCategory = async (id) => {
    toast.info(
      <div className="p-3">
        <p className="text-gray-700 mb-3">Voulez-vous vraiment supprimer cette catégorie ?</p>
        <div className="flex gap-3 justify-center">
          <button 
            onClick={async () => {
              try {
                const response = await fetch(`http://127.0.0.1:8000/api/admin/categories/${id}`, {
                  method: "DELETE",
                  headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                  }
                });

                if (!response.ok) throw new Error("Erreur lors de la suppression");
                
                setCategories(categories.filter(category => category.id !== id));
                toast.success("Catégorie supprimée avec succès !", {
                  className: "bg-green-50 text-green-800 border-l-4 border-green-500",
                });
              } catch (error) {
                toast.error(error.message, {
                  className: "bg-red-50 text-red-800 border-l-4 border-red-500",
                });
              }
              toast.dismiss();
            }} 
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
        <ToastContainer position="top-right" autoClose={5000} />
        
        {/* Header with Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
              <FaBoxOpen className="text-purple-600 text-2xl" />
              Gestion des Catégories
            </h1>
            <p className="text-sm text-gray-500 mt-1">Organisez vos produits par catégories</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher une catégorie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            />
          </div>
        </div>

        {/* Add Category Form */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Ajouter une nouvelle catégorie</h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Nom de la catégorie"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && addCategory()}
            />
            <button 
              onClick={addCategory}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <FaPlus />
              Ajouter
            </button>
          </div>
        </div>
        
        {/* Categories Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-purple-50 to-blue-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{category.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {editCategory === category.id ? (
                          <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            autoFocus
                            onKeyPress={(e) => e.key === 'Enter' && updateCategory(category.id)}
                          />
                        ) : (
                          <span className="font-medium text-gray-800">{category.name}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          {editCategory === category.id ? (
                            <>
                              <button
                                onClick={() => updateCategory(category.id)}
                                className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md"
                              >
                                <FaEdit />
                                Sauvegarder
                              </button>
                              <button
                                onClick={() => {
                                  setEditCategory(null);
                                  setEditedName("");
                                }}
                                className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                              >
                                Annuler
                              </button>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => {
                                    setEditCategory(category.id);
                                    setEditedName(category.name);
                                  }}
                                  className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                                  title="Modifier"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => deleteCategory(category.id)}
                                  className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                  title="Supprimer"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <FaBoxOpen className="h-12 w-12" />
                        <p className="mt-2 text-sm font-medium text-gray-500">
                          {searchTerm ? "Aucune catégorie trouvée" : "Aucune catégorie existante"}
                        </p>
                        {searchTerm ? (
                          <button
                            onClick={() => setSearchTerm("")}
                            className="mt-4 text-purple-600 hover:text-purple-800 text-sm font-medium"
                          >
                            Réinitialiser la recherche
                          </button>
                        ) : (
                          <p className="mt-1 text-sm text-gray-500">Commencez par ajouter une catégorie</p>
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
    </div>
  );
}