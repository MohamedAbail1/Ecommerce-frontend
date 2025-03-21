import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import { faUsers, faShoppingBag, faClipboardList, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
export default function Dashboard() {
  const stats = [
    { title: "Users", value: 120 },
    { title: "Products", value: 45 },
    { title: "Orders", value: 78 },
    { title: "Revenue", value: "$5,600" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCards title="Users" value="120" icon={faUsers} />
      <StatsCards title="Products" value="50" icon={faShoppingBag} />
      <StatsCards title="Orders" value="200" icon={faClipboardList} />
      <StatsCards title="Categories" value="8" icon={faBoxOpen} />
    </div>
  );
}
