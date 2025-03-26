import { useEffect, useState } from "react";
import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import { faUsers, faShoppingBag, faClipboardList, faBoxOpen, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Dashboard() {
  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);

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
        const usersWithRoleUser = data.filter(user => user.role === 'user');
        setUsersCount(usersWithRoleUser.length);
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
        setProductsCount(data.length);
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
        setOrdersCount(data.length);
  
        // Compter les commandes en attente
        const pendingOrders = data.filter(order => order.status === 'pending');
        setPendingOrdersCount(pendingOrders.length);
  
        // Calculer le revenu total à partir des commandes validées ou complétées
        const totalRevenue = data
            .filter(order => order.status === 'validated' || order.status === 'completed')
            .reduce((sum, order) => sum + parseFloat(order.total_amount), 0);

  
        setRevenue(totalRevenue);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des commandes:", error);
      });
  
  }, []);

  return (
    <div>
      <Header title="Dashboard" />
      
      {/* Notification des commandes en attente */}
      {pendingOrdersCount > 0 && (
        <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FontAwesomeIcon 
                icon={faBell} 
                className="h-5 w-5 text-yellow-400" 
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Vous avez {pendingOrdersCount} commande(s) en attente de confirmation
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Veuillez valider ou annuler ces commandes dans la section <a 
                  href="/orders" 
                  className="underline font-semibold text-yellow-800 hover:text-yellow-900">
                    Commandes
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCards title="Users" value={usersCount} icon={faUsers} />
        <StatsCards title="Products" value={productsCount} icon={faShoppingBag} />
        <StatsCards title="Orders" value={ordersCount} icon={faClipboardList} />
        <StatsCards title="Revenue" value={`$${revenue}`} icon={faBoxOpen} />
      </div>
    </div>
  );
}