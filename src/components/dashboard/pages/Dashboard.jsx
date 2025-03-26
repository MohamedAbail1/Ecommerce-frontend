import { useEffect, useState } from "react";
import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import { faUsers, faShoppingBag, faClipboardList, faBoxOpen, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

// Enregistrer les composants nécessaires de Chart.js
ChartJS.register(...registerables);

export default function Dashboard() {
  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [ordersData, setOrdersData] = useState([]);

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
        setOrdersData(data); // Stocker les données pour les graphiques
  
        // Compter les commandes en attente
        const pendingOrders = data.filter(order => order.status === 'pending');
        setPendingOrdersCount(pendingOrders.length);
  
        // Calculer le revenu total
        const totalRevenue = data
            .filter(order => order.status === 'validated' || order.status === 'completed')
            .reduce((sum, order) => sum + parseFloat(order.total_amount), 0);
  
        setRevenue(totalRevenue);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des commandes:", error);
      });
  }, []);

  // Préparer les données pour les graphiques
  const ordersByStatus = {
    labels: ['Pending', 'Validated', 'Completed', 'Cancelled'],
    datasets: [
      {
        label: 'Orders by Status',
        data: [
          ordersData.filter(order => order.status === 'pending').length,
          ordersData.filter(order => order.status === 'validated').length,
          ordersData.filter(order => order.status === 'completed').length,
          ordersData.filter(order => order.status === 'cancelled').length,
        ],
        backgroundColor: [
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
        ],
      },
    ],
  };

  // Exemple de données pour un graphique de revenus mensuels (à adapter selon vos données)
  const monthlyRevenue = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [1200, 1900, 1500, 2000, 1800, 2500],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCards title="Users" value={usersCount} icon={faUsers} />
        <StatsCards title="Products" value={productsCount} icon={faShoppingBag} />
        <StatsCards title="Orders" value={ordersCount} icon={faClipboardList} />
        <StatsCards title="Revenue" value={`$${revenue}`} icon={faBoxOpen} />
      </div>

      {/* Section des graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Orders by Status</h2>
          <div className="h-80">
            <Pie data={ordersByStatus} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Monthly Revenue</h2>
          <div className="h-80">
            <Bar data={monthlyRevenue} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Un autre graphique en pleine largeur */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Revenue Trend</h2>
        <div className="h-96">
          <Line data={monthlyRevenue} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
}