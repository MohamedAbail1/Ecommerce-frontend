import { useState } from 'react';
import ProductForm from './ProductForm';

export default function ProductList() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', description: 'High performance laptop', price: 999, image: 'image_url', category_id: '1' },
    { id: 2, name: 'Smartphone', description: 'Latest model smartphone', price: 799, image: 'image_url', category_id: '2' }
  ]);
  
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    setSelectedProduct(null);
  };

  const updateProduct = (updatedProduct) => {
    setProducts(products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)));
    setSelectedProduct(null);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Products</h2>
        <button
          onClick={() => setSelectedProduct({})}
          className="bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Add Product
        </button>
      </div>

      {selectedProduct !== null && (
        <ProductForm product={selectedProduct} onSubmit={selectedProduct.id ? updateProduct : addProduct} />
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
