import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        console.log('Données soumises:', formData);
        setSubmitted(true);

        // Réinitialiser le formulaire après 3 secondes
        setTimeout(() => {
          setFormData({ name: '', email: '', message: '' });
          setSubmitted(false);
        }, 3000);
      } else {
        console.error('Erreur lors de l\'envoi des données');
      }
    } catch (error) {
      console.error('Une erreur s\'est produite:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Service Client - Contactez-nous</h2>
        <p className="text-center text-gray-600 mb-6">Vous avez une question sur votre commande ou nos produits ? Notre équipe est là pour vous aider.</p>
        
        {submitted ? (
          <div className="text-center py-4 px-6 bg-green-100 text-green-700 rounded-md mb-4">
            Merci pour votre message ! Notre service client vous répondra dans les 24 heures.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Votre nom complet"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email (pour la réponse)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="email@exemple.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Votre message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Décrivez votre question ou problème concernant votre commande, un produit..."
              />
            </div>
            
            <div className="text-xs text-gray-500">
              En soumettant ce formulaire, vous acceptez notre politique de traitement des données personnelles.
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150"
              >
                Envoyer votre demande
              </button>
            </div>
          </form>
        )}
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Vous pouvez aussi nous joindre par :</p>
          <p className="font-medium mt-1">email: service-client@votreboutique.com</p>
          <p className="font-medium">téléphone: 01 23 45 67 89</p>
          <p className="mt-2">Horaires: Lundi-Vendredi, 9h-18h</p>
        </div>
      </div>
    </div>
  );
}
