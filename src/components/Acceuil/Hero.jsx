import React, { useState, useEffect } from 'react';

const Hero = () => {
  const images = [
    'https://m.media-amazon.com/images/I/61cTi9MBqOL._AC_SL1500_.jpg', // Remplace par tes images
    
    // Ajoute plus d'images si nécessaire
  ];

  const [currentImage, setCurrentImage] = useState(images[0]);

  // Change l'image toutes les 60 secondes (60000 ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 60000); // 60 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div
      className="hero-container w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${currentImage})`,
        backgroundSize: 'contain', // Utilise 'contain' pour ne pas zoomer l'image
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat', // Evite la répétition de l'image
      }}
    >
      <div className="flex justify-center items-center h-full">
        <div className="text-center text-white p-4">
          <h1 className="text-4xl font-bold mb-4">Soldes d'Été jusqu'à 50% de réduction</h1>
          <p className="text-xl mb-6">
            Découvrez notre nouvelle collection et profitez de nos offres exceptionnelles sur des milliers d'articles.
          </p>
          <button className="bg-blue-500 py-2 px-6 rounded text-white hover:bg-blue-600">
            Acheter Maintenant
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
