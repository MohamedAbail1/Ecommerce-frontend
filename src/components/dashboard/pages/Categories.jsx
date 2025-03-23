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
        const response = await fetch("http://127.0.0.1:8000/api/admin/categories", {
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
    <div>
      <Header title="Categories" />
      
      {/* Formulaire d'ajout de catégorie */}
      <div className="mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New Category Name"
          className="p-2 border rounded"
        />
        <button onClick={addCategory} className="ml-2 p-2 bg-blue-500 text-white rounded">Add Category</button>
      </div>
      
      {/* Liste des catégories */}
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-4 py-2">{category.id}</td>
                <td className="px-4 py-2">
                  {editCategory === category.id ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="p-2 border rounded"
                    />
                  ) : (
                    category.name
                  )}
                </td>
                <td className="px-4 py-2">
                  {editCategory === category.id ? (
                    <button
                      onClick={() => updateCategory(category.id)}
                      className="p-2 bg-green-500 text-white rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditCategory(category.id)}
                      className="p-2 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteCategory(category.id)}
                    className="ml-2 p-2 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
