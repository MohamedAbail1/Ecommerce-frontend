import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FaEye, FaSearch, FaTimes, FaReply, FaEnvelope, FaSpinner, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [messagesFiltres, setMessagesFiltres] = useState([]);
  const [termeRecherche, setTermeRecherche] = useState("");
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [messageSelectionne, setMessageSelectionne] = useState(null);
  const [afficherModal, setAfficherModal] = useState(false);
  const [enMiseAJour, setEnMiseAJour] = useState(false);
  const [contenuReponse, setContenuReponse] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchMessages();
  }, [token, navigate]);

  // Fonction gardée en anglais pour l'API
  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/admin/contact", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Échec de la récupération des messages");
      
      const data = await response.json();
      const messagesTries = [...data].sort((a, b) => {
        if (a.status === 'unread' && b.status !== 'unread') return -1;
        if (a.status !== 'unread' && b.status === 'unread') return 1;
        return new Date(b.created_at) - new Date(a.created_at);
      });
      
      setMessages(messagesTries);
      setMessagesFiltres(messagesTries);
      setChargement(false);
    } catch (error) {
      setErreur(error.message);
      setChargement(false);
    }
  };

  const gererRecherche = (e) => {
    const valeur = e.target.value.toLowerCase();
    setTermeRecherche(valeur);
  
    const filtres = messages.filter((message) => {
      return (
        message.id.toString().includes(valeur) ||
        message.name.toLowerCase().includes(valeur) || //   
        message.email.toLowerCase().includes(valeur) || //   
        message.subject.toLowerCase().includes(valeur) //   
      );
    });
  
    const filtresTries = [...filtres].sort((a, b) => {
      if (a.status === 'unread' && b.status !== 'unread') return -1;
      if (a.status !== 'unread' && b.status === 'unread') return 1;
      return new Date(b.created_at) - new Date(a.created_at);
    });
  
    setMessagesFiltres(filtresTries);
  };

  const afficherDetails = (message) => {
    setMessageSelectionne(message);
    setAfficherModal(true);
    if (message.status === 'unread') {
      updateMessageStatus(message.id, 'read');
    }
  };

  const fermerModal = () => {
    setAfficherModal(false);
    setMessageSelectionne(null);
    setContenuReponse("");
  };

  // Fonction gardée en anglais pour l'API
  const updateMessageStatus = async (id, newStatus) => {
    setEnMiseAJour(true);
    try {
      const response = await fetch(`http://localhost:8000/api/admin/contact/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }), //   
      });

      if (!response.ok) throw new Error("Échec de la mise à jour du statut du message");
      
      fetchMessages();
      if (messageSelectionne?.id === id) {
        setMessageSelectionne({...messageSelectionne, status: newStatus});
      }
    } catch (error) {
      toast.error(error.message, {
        className: "bg-red-50 text-red-800 border-l-4 border-red-500",
      });
    } finally {
      setEnMiseAJour(false);
    }
  };

  const envoyerReponse = async () => {
    if (!contenuReponse.trim()) {
      toast.error("Le contenu de la réponse ne peut pas être vide", {
        className: "bg-red-50 text-red-800 border-l-4 border-red-500",
      });
      return;
    }

    setEnMiseAJour(true);
    try {
      const response = await fetch(`http://localhost:8000/api/admin/contact/${messageSelectionne.id}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reply: contenuReponse }), //   
      });

      if (!response.ok) throw new Error("Échec de l'envoi de la réponse");
      
      toast.success("Réponse envoyée avec succès !", {
        className: "bg-green-50 text-green-800 border-l-4 border-green-500",
      });
      setContenuReponse("");
      fetchMessages();
    } catch (error) {
      toast.error(error.message, {
        className: "bg-red-50 text-red-800 border-l-4 border-red-500",
      });
    } finally {
      setEnMiseAJour(false);
    }
  };

  const supprimerMessage = async (id) => {
    toast.info(
      <div className="p-3">
        <p className="text-gray-700 mb-3">Voulez-vous vraiment supprimer ce message ?</p>
        <div className="flex gap-3 justify-center">
          <button 
            onClick={async () => {
              setEnMiseAJour(true);
              try {
                const response = await fetch(`http://localhost:8000/api/admin/contact/${id}`, {
                  method: "DELETE",
                  headers: {
                    "Authorization": `Bearer ${token}`,
                  },
                });
  
                if (!response.ok) throw new Error("Échec de la suppression du message");
  
                toast.success("Message supprimé avec succès !", {
                  className: "bg-green-50 text-green-800 border-l-4 border-green-500",
                });
  
                fetchMessages();
                if (messageSelectionne?.id === id) {
                  fermerModal();
                }
              } catch (error) {
                toast.error(error.message, {
                  className: "bg-red-50 text-red-800 border-l-4 border-red-500",
                });
              } finally {
                setEnMiseAJour(false);
                toast.dismiss();
              }
            }} 
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md"
          >
            Oui, supprimer
          </button>
          <button 
            onClick={() => toast.dismiss()} 
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
          >
            Annuler
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false, className: "bg-white" }
    );
  };
  
  if (chargement) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
    </div>
  );
  
  if (erreur) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg max-w-md">
        <h3 className="font-bold text-lg mb-2">Erreur de chargement</h3>
        <p>{erreur}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <ToastContainer position="top-right" autoClose={5000} />
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
              <FaEnvelope className="text-purple-600 text-2xl" />
              Gestion des messages
            </h1>
            <p className="text-sm text-gray-500 mt-1">Visualisez et gérez les messages des clients</p>
          </div>
          
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher des messages..."
              value={termeRecherche}
              onChange={gererRecherche}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-purple-50 to-blue-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Expéditeur
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Sujet
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {messagesFiltres.length > 0 ? (
                  messagesFiltres.map((message) => (
                    <tr 
                      key={message.id} 
                      className={`hover:bg-gray-50 transition-colors ${message.status === 'unread' ? 'bg-blue-50' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{message.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">{message.name}</div>  
                        <div className="text-sm text-gray-500">{message.email}</div>  
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                        {message.subject}  
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(message.created_at).toLocaleDateString()}  
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => afficherDetails(message)}
                            className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                            title="Voir le message"
                          >
                            <FaEye className="h-5 w-5" />
                          </button>
                          {message.status !== 'replied' && (       
                            <button
                              onClick={() => {
                                afficherDetails(message);
                                document.getElementById('reply-textarea')?.focus();
                              }}
                              className="text-purple-600 hover:text-purple-900 p-2 rounded-lg hover:bg-purple-50 transition-colors"
                              title="Répondre au message"
                            >
                              <FaReply className="h-5 w-5" />
                            </button>
                          )}
                          <button
                            onClick={() => supprimerMessage(message.id)}
                            className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                            title="Supprimer"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <FaEnvelope className="h-12 w-12" />
                        <p className="mt-2 text-sm font-medium text-gray-500">
                          {termeRecherche ? "Aucun message trouvé" : "Aucun message existant"}
                        </p>
                        {termeRecherche ? (
                          <button
                            onClick={() => setTermeRecherche("")}
                            className="mt-4 text-purple-600 hover:text-purple-800 text-sm font-medium"
                          >
                            Réinitialiser la recherche
                          </button>
                        ) : (
                          <p className="mt-1 text-sm text-gray-500">Lorsque des messages seront reçus, ils apparaîtront ici</p>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {afficherModal && messageSelectionne && (
        <div className="fixed inset-0 bg-gray-100/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-200">
            <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
              <h3 className="font-semibold text-xl text-gray-800">Détails du message</h3>
              <button
                onClick={fermerModal}
                className="text-gray-500 hover:text-gray-700 transition p-2 rounded-full hover:bg-gray-100"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">ID du message</p>
                  <p className="font-medium">#{messageSelectionne.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Statut</p>
                  <p className={`font-medium capitalize ${
                    messageSelectionne.status === 'read' ? 'text-green-600' :       
                    messageSelectionne.status === 'unread' ? 'text-blue-600' :       
                    messageSelectionne.status === 'replied' ? 'text-purple-600' :       
                    'text-gray-600'
                  }`}>
                    {messageSelectionne.status === 'read' ? 'lu' :     
                     messageSelectionne.status === 'unread' ? 'non lu' :
                     messageSelectionne.status === 'replied' ? 'répondu' :
                     messageSelectionne.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Expéditeur</p>
                  <p className="font-medium">{messageSelectionne.name}</p>  
                  <p className="text-sm text-gray-600">{messageSelectionne.email}</p>  
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date</p>
                  <p className="font-medium">{new Date(messageSelectionne.created_at).toLocaleString()}</p>  
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Sujet</p>
                <p className="font-medium text-lg mb-4">{messageSelectionne.subject}</p>  
                
                <p className="text-sm text-gray-500 mb-1">Message</p>
                <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-line">
                  {messageSelectionne.message}  
                </div>
              </div>

              {messageSelectionne.status === 'replied' && messageSelectionne.reply && (       
                <div>
                  <p className="text-sm text-gray-500 mb-1">Votre réponse</p>
                  <div className="bg-purple-50 p-4 rounded-lg whitespace-pre-line">
                    {messageSelectionne.reply}       
                  </div>
                </div>
              )}

              {messageSelectionne.status !== 'replied' && (       
                <div>
                  <label htmlFor="reply-textarea" className="block text-sm font-medium text-gray-700 mb-2">
                    Répondre à ce message
                  </label>
                  <textarea
                    id="reply-textarea"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Tapez votre réponse ici..."
                    value={contenuReponse}
                    onChange={(e) => setContenuReponse(e.target.value)}
                  />
                </div>
              )}
            </div>
            <div className="border-t p-4 flex justify-between sticky bottom-0 bg-white">
              <div className="flex space-x-2">
                {messageSelectionne.status !== 'replied' && (       
                  <button
                    onClick={envoyerReponse}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-md"
                    disabled={enMiseAJour || !contenuReponse.trim()}
                  >
                    {enMiseAJour ? <FaSpinner className="animate-spin" /> : <FaReply />}
                    <span>Envoyer la réponse</span>
                  </button>
                )}
                <button
                  onClick={() => supprimerMessage(messageSelectionne.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md"
                  disabled={enMiseAJour}
                >
                  {enMiseAJour ? <FaSpinner className="animate-spin" /> : <FaTrash />}
                  <span>Supprimer le message</span>
                </button>
              </div>
              <button
                onClick={fermerModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}