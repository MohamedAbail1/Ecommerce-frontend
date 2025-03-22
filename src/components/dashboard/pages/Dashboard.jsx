import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import { faUsers, faShoppingBag, faClipboardList, faBoxOpen } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login"); // Si pas de token, redirige vers la page de login
    }

    // Appel API pour récupérer les statistiques si l'admin est connecté
    const fetchStats = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`, // Utiliser le token pour authentification
        },
      });

      const data = await response.json();
      setStats(data); // Remplir avec les statistiques récupérées
    };

    fetchStats();
  }, [navigate]);

  return (
    <div>
      <Header title="Dashboard" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCards title="Users" value={stats.users || 0} icon={faUsers} />
        <StatsCards title="Products" value={stats.products || 0} icon={faShoppingBag} />
        <StatsCards title="Orders" value={stats.orders || 0} icon={faClipboardList} />
        <StatsCards title="Categories" value={stats.categories || 0} icon={faBoxOpen} />
      </div>
    </div>
  );
}
