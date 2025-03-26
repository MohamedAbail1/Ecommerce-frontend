import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Récupérer le token depuis localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Si un token est trouvé, on peut récupérer les produits
    if (token) {
      fetchProducts();
    } else {
      console.log("Token non trouvé. Vous devez vous connecter.");
    }
  }, [token]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
    } catch (error) {
      console.error('Erreur lors de la suppression du produit', error);
    }
  };

  const handleAddClick = () => {
    setSelectedProduct(null); // Aucun produit sélectionné = ajout
    setShowForm(true);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product); // Produit à éditer
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">🛒 Product List</h2>
        <button
          onClick={handleAddClick}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-xl shadow transition duration-300"
        >
          ➕ Add Product
        </button>
      </div>

      {showForm && (
        <ProductForm
          product={selectedProduct}
          onSubmit={fetchProducts}
          onClose={handleCloseForm}
        />
      )}

      <div className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-gray-600 uppercase bg-purple-100 rounded-xl">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr
                key={product.id}
                className={`border-b ${idx % 2 === 0 ? 'bg-white' : 'bg-purple-50'} hover:bg-purple-100 transition`}
              >
                <td className="px-4 py-3">{product.id}</td>
                <td className="px-4 py-3 font-medium">{product.name}</td>
                <td className="px-4 py-3">${product.price}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3">{product.category_id}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg text-sm shadow"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm shadow"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
