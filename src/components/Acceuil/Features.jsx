import React from 'react';
import Feature from './Feature';
import './style/Features.css';
function Features() {
  const features = [
    {
      id: 1,
      icon: '🚚',
      title: 'Livraison Rapide',
      description: 'Livraison gratuite pour toute commande supérieure à 500DH et livraison en 48h.'
    },
    {
      id: 2,
      icon: '💯',
      title: 'Garantie Qualité',
      description: 'Tous nos produits sont garantis et peuvent être retournés sous 30 jours.'
    },
    {
      id: 3,
      icon: '🔒',
      title: 'Paiement Sécurisé',
      description: 'Vos données de paiement sont protégées par un cryptage avancé.'
    },
    {
      id: 4,
      icon: '🛟',
      title: 'Service Client 24/7',
      description: 'Notre équipe est disponible pour vous aider à tout moment.'
    }
  ];

  return (
    <section>
      <div className="section-title">
        <h2>Pourquoi nous choisir?</h2>
        <p>Nous offrons le meilleur à nos clients</p>
      </div>
      <div className="features">
        {features.map(feature => (
          <Feature key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
}

export default Features;