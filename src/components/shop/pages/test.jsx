import React, { useState } from 'react';
import { 
  BookOpenIcon, 
  CodeBracketIcon, 
  RocketLaunchIcon, 
  StarIcon, 
  CheckCircleIcon 
} from '@heroicons/react/24/solid';

const ReactTrainingLandingPage = () => {
  const [activeTab, setActiveTab] = useState('beginner');

  const courses = {
    beginner: {
      title: 'Formation React.js Débutant',
      description: 'Apprenez les bases de React.js et construisez vos premières applications web.',
      price: 199,
      features: [
        'Introduction à React et JSX',
        'Composants et Props',
        'State et Hooks',
        'Gestion des événements',
        'Projets pratiques'
      ]
    },
    intermediate: {
      title: 'Formation React.js Intermédiaire',
      description: 'Approfondissez vos compétences et maîtrisez les concepts avancés de React.',
      price: 299,
      features: [
        'Hooks personnalisés',
        'Gestion d\'état avancée (Redux, Context)',
        'Routing avec React Router',
        'Optimisation des performances',
        'Tests de composants'
      ]
    },
    advanced: {
      title: 'Formation React.js Expert',
      description: 'Devenez un développeur React.js de haut niveau avec des techniques avancées.',
      price: 399,
      features: [
        'Architecture d\'applications complexes',
        'Server-Side Rendering',
        'Micro-frontends',
        'Intégration avec backend',
        'Déploiement et optimisation'
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Maîtrisez React.js
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Transformez vos compétences en développement web avec nos formations complètes
          </p>
          <a 
            href="#courses" 
            className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition"
          >
            Commencer
          </a>
        </div>
      </header>

      {/* Avantages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <BookOpenIcon className="h-16 w-16 mx-auto text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Apprentissage Complet</h3>
              <p>Cours complets couvrant tous les aspects de React.js</p>
            </div>
            <div className="text-center">
              <CodeBracketIcon className="h-16 w-16 mx-auto text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Projets Pratiques</h3>
              <p>Apprenez en construisant des applications réelles</p>
            </div>
            <div className="text-center">
              <RocketLaunchIcon className="h-16 w-16 mx-auto text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Carrière Boostée</h3>
              <p>Préparez-vous aux demandes du marché professionnel</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formations */}
      <section id="courses" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nos Formations React.js
          </h2>
          
          <div className="flex justify-center mb-8">
            {['beginner', 'intermediate', 'advanced'].map((level) => (
              <button
                key={level}
                onClick={() => setActiveTab(level)}
                className={`px-6 py-2 mx-2 rounded-full ${
                  activeTab === level 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white text-gray-700 border'
                }`}
              >
                {level === 'beginner' ? 'Débutant' : 
                 level === 'intermediate' ? 'Intermédiaire' : 'Avancé'}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-indigo-600">
                {courses[activeTab].title}
              </h3>
              <p className="text-gray-600 mb-6">
                {courses[activeTab].description}
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {courses[activeTab].features.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-indigo-600">
                  {courses[activeTab].price} €
                </div>
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition">
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Ce que nos étudiants disent
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Marie D.', role: 'Développeuse Web', quote: 'Formation incroyablement complète qui m\'a permis de décrocher mon premier emploi en React!' },
              { name: 'Jean P.', role: 'Développeur Frontend', quote: 'Les projets pratiques m\'ont vraiment aidé à comprendre les concepts complexes de React.' },
              { name: 'Sophie L.', role: 'Freelance', quote: 'Un enseignement de qualité qui m\'a permis de monter en compétences rapidement.' }
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-gray-100 p-6 rounded-lg">
                <StarIcon className="h-6 w-6 text-yellow-500 mb-4" />
                <p className="italic mb-4">"{testimonial.quote}"</p>
                <div className="font-bold">{testimonial.name}</div>
                <div className="text-gray-600">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Prêt à commencer votre voyage React?</h3>
          <p className="mb-8">Rejoignez nos formations et transformez votre carrière de développeur</p>
          <a 
            href="#courses" 
            className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition"
          >
            Commencez Maintenant
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ReactTrainingLandingPage;