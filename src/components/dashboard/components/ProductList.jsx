import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const token = "1|hMWY0xeVHpYdokZopSAaWpNDg7CxWfe0ixtCMxs567f898d3"; // Remplace par le token dynamique si nécessaire

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fonction pour récupérer les produits
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/admin/products', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits', error);
    }
  };

  // Fonction pour supprimer un produit
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/products/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      fetchProducts();
    } catch (error) {
      console.error('Erreur lors de la suppression du produit', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Product List</h2>
        <button
          onClick={() => setSelectedProduct({})}
          className="bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Add Product
        </button>
      </div>

      {selectedProduct !== null && (
        <ProductForm product={selectedProduct} onSubmit={fetchProducts} />
      )}

      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2">{product.id}</td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">${product.price}</td>
                <td className="px-4 py-2">{product.category_id}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="ml-2 text-red-600"
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
