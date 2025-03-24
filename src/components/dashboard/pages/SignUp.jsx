import React, { useState } from 'react';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setSuccess('');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Inscription réussie !');
        setError('');
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setError(data.message || 'Erreur lors de l’inscription.');
        setSuccess('');
      }
    } catch (err) {
      console.error(err);
      setError('Erreur réseau. Veuillez réessayer plus tard.');
      setSuccess('');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl mb-6 text-center font-bold">S'inscrire</h2>

        {/* Affichage des erreurs ou du succès */}
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-500 mb-4 text-center">{success}</p>}

        <input
          type="text"
          placeholder="Nom complet"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-2 border mb-4 rounded"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border mb-4 rounded"
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-4 rounded"
          required
        />

        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border mb-4 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          S'inscrire
        </button>

        <p className="mt-4 text-center">
          Déjà un compte ?{' '}
          <a href="/login" className="text-blue-500 hover:text-blue-600">
            Connectez-vous
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
