import { useState } from 'react';
import { Link } from 'react-router-dom';
import IsmailImage from '../../assets/WhatsApp Image 2025-04-02 à 22.00.01_7f76e3e0.jpg';
import MohamedImage from '../../assets/WhatsApp Image 2025-04-02 à 21.56.48_72b8884e.jpg';
import hamzaImage from '../../assets/WhatsApp Image 2025-04-02 à 23.48.39_3fb7aa06.jpg';
export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('histoire');
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div style={{ backgroundColor: "#27548A" }} className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-4 text-center">À propos de ShopFlex</h1>
          <p className="text-xl max-w-3xl text-center">
            Votre destination en ligne pour des produits de qualité exceptionnelle depuis 2015
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {['histoire', 'mission', 'équipe', 'valeurs'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg capitalize`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {activeTab === 'histoire' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Histoire</h2>
                <div className="prose max-w-none text-gray-600">
                  <p className="mb-4">
                    Fondée en 2015, ShopFlex est née de la passion de trois amis déterminés à transformer l'expérience du shopping en ligne. Débutant dans un petit bureau à Lyon, notre entreprise s'est rapidement développée pour devenir l'une des principales destinations e-commerce de France.
                  </p>
                  <p className="mb-4">
                    Au cours des dernières années, nous avons étendu notre catalogue de produits pour répondre aux besoins variés de nos clients tout en maintenant notre engagement envers la qualité et le service client exceptionnel.
                  </p>
                  <p>
                    Aujourd'hui, ShopFlex sert des milliers de clients à travers l'Europe avec une sélection soigneusement choisie de produits innovants et durables. Notre croissance témoigne de notre dévouement à créer une expérience de shopping en ligne simple, agréable et fiable.
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === 'mission' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Mission</h2>
                <div className="prose max-w-none text-gray-600">
                  <p className="mb-4">
                    Chez ShopFlex, notre mission est de rendre le shopping en ligne accessible, éthique et agréable pour tous. Nous nous efforçons d'offrir une expérience d'achat transparente qui donne la priorité à la satisfaction du client et à la durabilité.
                  </p>
                  <p className="mb-4">
                    Nous croyons que le commerce électronique devrait être un moyen d'enrichir la vie des gens, pas seulement par les produits qu'ils achètent, mais aussi par l'impact positif que ces achats peuvent avoir sur notre planète et nos communautés.
                  </p>
                  <p>
                    En proposant des produits de qualité à des prix équitables, nous visons à créer un écosystème commercial qui profite à toutes les parties prenantes : nos clients, nos fournisseurs, nos employés et notre environnement.
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === 'équipe' && (
             <div>
             <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Équipe</h2>
             <div className="prose max-w-none text-gray-600">
               <p className="mb-6">
                 Derrière chaque commande chez ShopFlex se trouve une équipe dévouée de professionnels passionnés par l'innovation et le service client. Notre équipe diverse apporte une richesse d'expériences et de perspectives qui nous permettent de mieux servir notre clientèle internationale.
               </p>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                 {[
                   { 
                     name: 'Ismail Roumani', 
                     role: 'Fondatrice & CEO',
                     image:IsmailImage
                   },
                   { 
                     name: 'Hamza Chagane', 
                     role: 'Directeur Marketing',
                     image:hamzaImage
                   },
                   { 
                     name: 'Mohamed Abail', 
                     role: 'Responsable Relation Client',
                     image: MohamedImage
                   }
                 ].map((member) => (
                   <div key={member.name} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                     <div className="w-20 h-20 rounded-full mb-4 mx-auto overflow-hidden border-2 border-gray-100">
                       <img 
                         src={member.image} 
                         alt={member.name}
                         className="w-full h-full object-cover"
                       />
                     </div>
                     <h3 className="text-xl font-semibold text-center">{member.name}</h3>
                     <p className="text-gray-500 text-center">{member.role}</p>
                   </div>
                 ))}
               </div>
             </div>
           </div>
            )}
            
            {activeTab === 'valeurs' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Nos Valeurs</h2>
                <div className="prose max-w-none text-gray-600">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Qualité</h3>
                      <p>Nous sélectionnons minutieusement chaque produit pour garantir qu'il répond à nos normes élevées de qualité et de durabilité.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Transparence</h3>
                      <p>Nous croyons à une communication ouverte et honnête avec nos clients concernant nos produits, nos prix et nos pratiques commerciales.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Durabilité</h3>
                      <p>Nous nous engageons à réduire notre impact environnemental en travaillant avec des fournisseurs écoresponsables et en adoptant des pratiques durables dans toutes nos opérations.</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Innovation</h3>
                      <p>Nous cherchons constamment à améliorer notre plateforme et nos produits pour offrir une expérience d'achat toujours plus intuitive et satisfaisante.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Chiffres Clés</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-600">Année de création</span>
                  <span className="font-medium">2015</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Clients satisfaits</span>
                  <span className="font-medium">150,000+</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Produits</span>
                  <span className="font-medium">5,000+</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Pays desservis</span>
                  <span className="font-medium">12</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Collaborateurs</span>
                  <span className="font-medium">85</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contactez-nous</h3>
              <p className="text-gray-600 mb-4">
                Vous avez des questions sur notre entreprise ou nos produits ? N'hésitez pas à nous contacter.
              </p>
              <Link to="/shop/contact">
                <button style={{ backgroundColor: "#27548A" }} className="w-full text-white py-2 px-4 rounded-md hover:opacity-80 transition duration-300">
                  Nous contacter
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="bg-gray-100 py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Ce que nos clients disent</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { 
          name: 'Marie L.', 
          text: 'ShopFlex a complètement transformé ma façon de faire du shopping en ligne. La qualité des produits est incomparable et le service client est toujours réactif.',
          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80' 
        },
        { 
          name: 'Pierre D.', 
          text: 'Je suis client depuis plus de 3 ans et je n\'ai jamais été déçu. Les livraisons sont rapides et les produits correspondent toujours parfaitement aux descriptions.',
          image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
        },
        { 
          name: 'Julie M.', 
          text: 'J\'apprécie particulièrement l\'engagement de ShopFlex envers la durabilité. C\'est rare de trouver une entreprise qui prend autant au sérieux sa responsabilité environnementale.',
          image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'
        }
      ].map((testimonial, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <img 
              src={testimonial.image} 
              alt={testimonial.name}
              className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-gray-200"
            />
            <h3 className="text-lg font-semibold">{testimonial.name}</h3>
          </div>
          <p className="text-gray-600 italic">"{testimonial.text}"</p>
          <div className="mt-4 flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
    </div>
  );
}