import Header from "../components/Header";
import StatsCards from "../components/StatsCards";

export default function Dashboard() {
  const stats = [
    { title: "Users", value: 120 },
    { title: "Products", value: 45 },
    { title: "Orders", value: 78 },
    { title: "Revenue", value: "$5,600" }
  ];

  return (
    <div>
      <Header title="Dashboard" />
      <StatsCards stats={stats} />
    </div>
  );
}
