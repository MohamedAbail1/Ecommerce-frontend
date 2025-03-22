import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductForm({ product = null, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category_id: "",
    stock: "",
  });

  const token = "1|hMWY0xeVHpYdokZopSAaWpNDg7CxWfe0ixtCMxs567f898d3";

  // Initialiser le formulaire si un produit est sélectionné
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category_id: product.category_id,
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
    console.log("Submitting form:", formData);
    if (product && product.id) {
      await updateProduct(formData);
    } else {
      await addProduct(formData);
    }
  };

  // Fonction pour ajouter un produit
  const addProduct = async (newProduct) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/products",
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      onSubmit(response.data);
      onClose(); // Fermer le formulaire après l'ajout
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit", error);
    }
  };

  // Fonction pour mettre à jour un produit
  const updateProduct = async (data) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/admin/products/${product.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      onSubmit(response.data);
      onClose(); // Fermer le formulaire après la mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour du produit", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {product ? "Edit Product" : "Add Product"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            id="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category_id" className="block text-sm font-medium">
            Category
          </label>
          <input
            type="text"
            name="category_id"
            id="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="stock" className="block text-sm font-medium">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            id="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md"
        >
          {product ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}
