import { useEffect, useState } from "react";
import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import { faUsers, faShoppingBag, faClipboardList, faBoxOpen } from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {
  const [usersCount, setUsersCount] = useState(0);  // Pour le nombre d'utilisateurs
  const [productsCount, setProductsCount] = useState(0);  // Pour le nombre de produits
  const [ordersCount, setOrdersCount] = useState(0);  // Pour le nombre de commandes
  const [revenue, setRevenue] = useState(0);  // Pour les revenus

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("Token non trouvé");
      return;
    }

    // Récupérer les données des utilisateurs
    fetch("http://localhost:8000/api/admin/users", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        // Filtrer les utilisateurs ayant le rôle 'user'
        const usersWithRoleUser = data.filter(user => user.role === 'user');
        setUsersCount(usersWithRoleUser.length);  // Nombre d'utilisateurs avec le rôle 'user'
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
      });

    // Récupérer les données des produits
    fetch("http://localhost:8000/api/products", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setProductsCount(data.length);  // Nombre de produits récupérés
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des produits:", error);
      });

    // Récupérer les données des commandes
    fetch("http://localhost:8000/api/admin/orders", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setOrdersCount(data.length);  // Nombre de commandes récupérées
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des commandes:", error);
      });
  }, []);

  return (
    <div>
      <Header title="Dashboard" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCards title="Users" value={usersCount} icon={faUsers} />
        <StatsCards title="Products" value={productsCount} icon={faShoppingBag} />
        <StatsCards title="Orders" value={ordersCount} icon={faClipboardList} />
        <StatsCards title="Revenue" value={`$${revenue}`} icon={faBoxOpen} />
      </div>
    </div>
  );
}
