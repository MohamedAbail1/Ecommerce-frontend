import React, { useEffect, useState } from "react";
import Header from "../components/Header";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState(""); // Pour l'ajout de catégorie
  const [editCategory, setEditCategory] = useState(null); // Pour l'édition de catégorie
  const [editedName, setEditedName] = useState(""); // Pour le nom modifié de la catégorie

  // Récupérer le token depuis localStorage
  const token = localStorage.getItem("token"); // Récupération du token depuis localStorage

  // Vérifier si le token existe
  if (!token) {
    // Si le token n'existe pas, rediriger l'utilisateur vers la page de login
    window.location.href = "/login"; // Change cela en fonction de ta logique de redirection
  }

  // Récupération des catégories depuis l'API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/categories", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error("Erreur lors de la récupération des catégories");
        }
      } catch (error) {
        console.error("Erreur réseau : ", error);
      }
    };

    fetchCategories();
  }, [token]);

  // Ajouter une nouvelle catégorie
  const addCategory = async () => {
    if (!newCategory) return;
    const response = await fetch("http://127.0.0.1:8000/api/admin/categories", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: newCategory })
    });
    if (response.ok) {
      const data = await response.json();
      setCategories([...categories, data]); // Ajout de la nouvelle catégorie dans la liste
      setNewCategory(""); // Réinitialiser l'input
    } else {
      console.error("Erreur lors de l'ajout de la catégorie");
    }
  };

  // Mettre à jour une catégorie
  const updateCategory = async (id) => {
    if (!editedName) return;
    const response = await fetch(`http://127.0.0.1:8000/api/admin/categories/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: editedName })
    });
    if (response.ok) {
      const updatedCategory = await response.json();
      setCategories(categories.map(category => category.id === id ? updatedCategory : category));
      setEditCategory(null);
      setEditedName(""); // Réinitialiser l'input de l'édition
    } else {
      console.error("Erreur lors de la mise à jour de la catégorie");
    }
  };

  // Supprimer une catégorie
  const deleteCategory = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/admin/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      setCategories(categories.filter(category => category.id !== id)); // Supprimer la catégorie de la liste
    } else {
      console.error("Erreur lors de la suppression de la catégorie");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Header title="Categories" className="mb-8" />
      
      {/* Category Add Form */}
      <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Category</h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter category name"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && addCategory()}
          />
          <button 
            onClick={addCategory} 
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add
          </button>
        </div>
      </div>
      
      {/* Categories List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {category.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editCategory === category.id ? (
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    ) : (
                      <span className="font-medium text-gray-800">{category.name}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {editCategory === category.id ? (
                        <button
                          onClick={() => updateCategory(category.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditCategory(category.id);
                            setEditedName(category.name);
                          }}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => deleteCategory(category.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  
      {/* Empty state */}
      {categories.length === 0 && (
        <div className="mt-8 text-center py-12 bg-gray-50 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No categories</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding a new category.</p>
        </div>
      )}
    </div>
  );
}
