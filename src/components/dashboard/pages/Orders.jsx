import Header from "../components/Header";

export default function Orders() {
  const orders = [
    { id: 1, user: "John Doe", total: "$999", status: "Completed" },
    { id: 2, user: "Jane Smith", total: "$799", status: "Pending" },
    { id: 3, user: "Mark Lee", total: "$199", status: "Shipped" }
  ];

  return (
    <div>
      <Header title="Orders" />
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.user}</td>
                <td className="px-4 py-2">{order.total}</td>
                <td className="px-4 py-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
