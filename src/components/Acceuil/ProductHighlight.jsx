import React from 'react';

const ProductHighlight = () => {
    return (
        <div className="relative bg-gradient-to-r from-gray-50 to-blue-50 py-16 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              {/* Animated Background Elements */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-200 rounded-full opacity-30 animate-blob"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-200 rounded-full opacity-30 animate-blob animation-delay-2000"></div>
    
              {/* Header Section */}
              <div className="relative mb-8">
                <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4 tracking-wide">
                  Découverte Produits
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                  L'Excellence Technique
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-2">
                    Rencontre l'Innovation Créative
                  </span>
                </h2>
              </div>
    
              {/* Descriptive Text */}
              <p className="text-lg text-gray-700 mb-10 leading-relaxed">
                Nous transformons les défis technologiques en solutions élégantes et performantes. 
                Chaque produit est le résultat d'une passion pour l'innovation, 
                conçu pour repousser les limites et simplifier votre quotidien.
              </p>
    
              {/* Action Buttons with Icons */}
              <div className="flex justify-center space-x-4">
                <a 
                  href="/shop" 
                  className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg 
                  hover:from-blue-700 hover:to-purple-700 transition-all duration-300 
                  transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                    />
                  </svg>
                  Découvrir nos Produits
                </a>
                
                <a 
                  href="/about" 
                  className="flex items-center bg-white text-gray-800 px-8 py-3 rounded-lg 
                  border border-gray-200 
                  hover:bg-gray-100 transition-all duration-300 
                  transform hover:-translate-y-1 hover:shadow-md"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  Notre Mission
                </a>
              </div>
            </div>
          </div>
    
          {/* Custom CSS for Blob Animation */}
          <style jsx>{`
            @keyframes blob {
              0% {
                transform: scale(1);
              }
              33% {
                transform: scale(1.1);
              }
              66% {
                transform: scale(0.9);
              }
              100% {
                transform: scale(1);
              }
            }
            .animate-blob {
              animation: blob 5s infinite;
            }
            .animation-delay-2000 {
              animation-delay: 2s;
            }
          `}</style>
        </div>
      );
};

export default ProductHighlight;

// Updated Layout component
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      
      <div className="bg-gray-100 py-10">
        <Hero />
      </div>

      {/* New Professional Product Highlight Section */}
      <ProductHighlight />

      {/* Page Content */}
      <div className="min-h-screen p-5">
        {children}
      </div>

      <div className="bg-gray-100 py-10">
        <Features />
      </div>
      <Footer />
    </>
  );
};