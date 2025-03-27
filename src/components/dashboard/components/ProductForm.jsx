import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductForm({ product = null, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category_id: "",
    stock: "",
  });
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data);
      } catch (error) {
        toast.error("Erreur lors de la récupération des catégories");
      }
    };
    fetchCategories();

    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category_id: product.category_id,
        stock: product.stock,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product && product.id) {
      await updateProduct(formData);
    } else {
      await addProduct(formData);
    }
  };

  const addProduct = async (newProduct) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/admin/products", newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Produit ajouté avec succès !");
      onSubmit(response.data);
      onClose();
    } catch (error) {
      toast.error("Erreur lors de l'ajout du produit");
    }
  };

  const updateProduct = async (data) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/admin/products/${product.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Produit mis à jour avec succès !");
      onSubmit(response.data);
      onClose();
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du produit");
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-white p-8 rounded-2xl shadow-xl max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        {product ? "✏️ Edit Product" : "➕ Add New Product"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-1">
            Price ($)
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            id="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
        <div>
          <label htmlFor="category_id" className="block text-sm font-semibold text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category_id"
            id="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="stock" className="block text-sm font-semibold text-gray-700 mb-1">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            id="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          {product ? "✅ Update Product" : "🚀 Add Product"}
        </button>
      </form>
    </div>
  );
}
