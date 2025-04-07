import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ListeProduits() {
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState({}); // Pour stocker les noms des catégories
  const [produitSelectionne, setProduitSelectionne] = useState(null);
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);

  // Récupérer le token depuis localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Si un token est trouvé, on peut récupérer les produits et les catégories
    if (token) {
      recupererProduits();
      recupererCategories();
    } else {
      console.log("Token non trouvé. Vous devez vous connecter.");
    }
  }, [token]);

  const recupererProduits = async () => {
    try {
      const reponse = await axios.get('http://127.0.0.1:8000/api/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProduits(reponse.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits', error);
    }
  };

  const recupererCategories = async () => {
    try {
      const reponse = await axios.get('http://127.0.0.1:8000/api/categories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Convertir le tableau de catégories en objet pour un accès facile par ID
      const mapCategories = {};
      reponse.data.forEach(categorie => {
        mapCategories[categorie.id] = categorie.name;
      });
      setCategories(mapCategories);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories', error);
    }
  };

  const supprimerProduit = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      recupererProduits();
      toast.success('Produit supprimé avec succès !'); // Notification de succès
    } catch (error) {
      console.error('Erreur lors de la suppression du produit', error);
      toast.error('Erreur lors de la suppression du produit'); // Notification d'erreur
    }
  };

  const gererAjoutClic = () => {
    setProduitSelectionne(null); // Aucun produit sélectionné = ajout
    setAfficherFormulaire(true);
  };

  const gererEditionClic = (produit) => {
    setProduitSelectionne(produit); // Produit à éditer
    setAfficherFormulaire(true);
  };

  const gererFermerFormulaire = () => {
    setAfficherFormulaire(false);
    setProduitSelectionne(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* En-tête avec bouton d'ajout */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Inventaire des Produits
            </h1>
            <p className="text-sm text-gray-500 mt-1">Gérez votre catalogue de produits</p>
          </div>
          <button
            onClick={gererAjoutClic}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Ajouter un Produit
          </button>
        </div>
  
        {/* Formulaire de produit Modal */}
        {afficherFormulaire && (
          <ProductForm
            product={produitSelectionne}
            onSubmit={recupererProduits}
            onClose={gererFermerFormulaire}
          />
        )}
  
        {/* Tableau des Produits */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-purple-50 to-blue-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Produit
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Prix
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Stock
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
                {produits.length > 0 ? (
                  produits.map((produit) => (
                    <tr key={produit.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{produit.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{produit.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                        ${parseFloat(produit.price).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${produit.stock > 10 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {produit.stock} en stock
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                         {categories[produit.category_id] || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => gererEditionClic(produit)}
                            className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                            title="Éditer"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => supprimerProduit(produit.id)}
                            className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                            title="Supprimer"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <p className="mt-2 text-sm font-medium text-gray-500">Aucun produit trouvé</p>
                        <button
                          onClick={gererAjoutClic}
                          className="mt-4 text-purple-600 hover:text-purple-800 text-sm font-medium"
                        >
                          Ajouter votre premier produit
                        </button>
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
