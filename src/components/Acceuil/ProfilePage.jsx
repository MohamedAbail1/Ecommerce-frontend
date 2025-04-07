import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from "./Footer";
import Features from "./Features";
import Navbar from './NavBar';
const ProfilePage = () => {
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState({
    name: '',
    email: ''
  });
  
  const [password, setPassword] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/connexion');
          return;
        }

        const response = await axios.get('http://localhost:8000/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        setProfile({
          name: response.data.name,
          email: response.data.email
        });
      } catch (error) {
        console.error('Erreur lors du chargement du profil:', error);
        if (error.response?.status === 401) {
          navigate('/connexion');
        } else {
          setErrors({ fetch: 'Échec du chargement des données du profil' });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:8000/api/profile', profile, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setProfile(response.data);
      setSuccess('Profil mis à jour avec succès !');
      setTimeout(() => setSuccess(''), 5000);
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      } else {
        setErrors({ submit: 'Échec de la mise à jour du profil' });
      }
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:8000/api/profile/password', {
        current_password: password.current_password,
        password: password.new_password,
        password_confirmation: password.new_password_confirmation
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setSuccess('Mot de passe modifié avec succès !');
      setTimeout(() => setSuccess(''), 5000);
      setPassword({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
      });
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      } else {
        setErrors({ submit: 'Échec de la modification du mot de passe' });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Paramètres du Profil</h1>
            <p className="mt-2 text-sm text-gray-600">
              Gérez vos informations de compte et sécurité
            </p>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200">
              {success}
            </div>
          )}

          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              Profil
            </button>
            <button
              className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                activeTab === 'password'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('password')}
            >
              Mot de passe
            </button>
          </div>

          {activeTab === 'profile' ? (
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom complet
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className="block w-full px-4 py-3 rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600">{errors.name[0]}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Adresse email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="block w-full px-4 py-3 rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email[0]}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Mettre à jour le profil
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">
                  Mot de passe actuel
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    id="current_password"
                    name="current_password"
                    value={password.current_password}
                    onChange={handlePasswordChange}
                    className="block w-full px-4 py-3 rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  {errors.current_password && (
                    <p className="mt-2 text-sm text-red-600">{errors.current_password[0]}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">
                  Nouveau mot de passe
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    id="new_password"
                    name="new_password"
                    value={password.new_password}
                    onChange={handlePasswordChange}
                    className="block w-full px-4 py-3 rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">{errors.password[0]}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="new_password_confirmation" className="block text-sm font-medium text-gray-700">
                  Confirmer le nouveau mot de passe
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    id="new_password_confirmation"
                    name="new_password_confirmation"
                    value={password.new_password_confirmation}
                    onChange={handlePasswordChange}
                    className="block w-full px-4 py-3 rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Changer le mot de passe
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </>);
};

export default ProfilePage;