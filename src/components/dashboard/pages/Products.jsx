import Header from "../components/Header";

export default function Products() {
  const products = [
    { id: 1, name: "Laptop", price: "$999", stock: 20 },
    { id: 2, name: "Smartphone", price: "$799", stock: 50 },
    { id: 3, name: "Headphones", price: "$199", stock: 100 }
  ];

  return (
    <div>
      <Header title="Products" />
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2">{product.id}</td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.price}</td>
                <td className="px-4 py-2">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
