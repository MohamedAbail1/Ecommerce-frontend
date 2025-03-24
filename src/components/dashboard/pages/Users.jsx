import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FaTrashAlt, FaEye, FaSearch } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Pour la redirection

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // Redirige l'utilisateur vers la page de login s'il n'a pas de token
      return;
    }

    fetch("http://localhost:8000/api/admin/users", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) throw new Error("Erreur lors du chargement des utilisateurs");
        return response.json();
      })
      .then(data => {
        const filteredUsers = data.filter(user => user.role === 'user');
        setUsers(filteredUsers);
        setFilteredUsers(filteredUsers);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [navigate]);

  // Fonction pour gérer la recherche
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = users.filter((user) => {
      return user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value);
    });

    setFilteredUsers(filtered);
  };

  // Fonction pour supprimer un utilisateur
  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
  
    // Afficher un toast de confirmation
    toast.info(
      <div>
        <p>Voulez-vous vraiment supprimer cet utilisateur ?</p>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button onClick={() => confirmDelete(id, token)} style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>Oui</button>
          <button onClick={() => toast.dismiss()} style={{ background: "gray", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>Non</button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false }
    );
  };
  
  const confirmDelete = async (id, token) => {
    try {
      const response = await fetch(`http://localhost:8000/api/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        toast.success("Utilisateur supprimé avec succès !", {
          position: "top-right",
          autoClose: 10000,
        });
        setFilteredUsers(filteredUsers.filter((user) => user.id !== id)); // Mettre à jour la liste après suppression
      } else {
        toast.error("Échec de la suppression de l'utilisateur.");
      }
    } catch (error) {
      toast.error("Une erreur est survenue !");
      console.error(error);
    }
    toast.dismiss(); // Fermer le toast après action
  };

  // Fonction pour voir le profil d'un utilisateur
  const handleView = (id) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8000/api/admin/users/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) throw new Error("Utilisateur introuvable");
        return response.json();
      })
      .then(user => {
        toast.info(`Profil de ${user.name}\nEmail: ${user.email}`, {
          position: "top-right",
          autoClose: 5000,
        });
      })
      .catch(error => {
        toast.error(`Erreur: ${error.message}`, {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <Header title="Users" />
      <ToastContainer /> {/* Ajout du ToastContainer ici */}
      <div className="bg-white p-4 rounded-lg shadow">
        {/* Barre de recherche avec icône de loupe */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
        </div>
        
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 flex space-x-4">
                  <button 
                    onClick={() => handleDelete(user.id)} 
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrashAlt />
                  </button>
                  <button 
                    onClick={() => handleView(user.id)} 
                    className="text-green-500 hover:text-green-700 transition"
                  >
                    <FaEye />
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
