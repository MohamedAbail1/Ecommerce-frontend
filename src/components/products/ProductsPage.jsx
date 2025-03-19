import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ProductsPage = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    console.log('Product added to cart:', product);
  };

  const products = [
    {
      image: 'https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/03/17-400x400.jpg',
      price: 29.99,
      stars: 4,
      name: 'Smartphone ABC',
      description: 'A great smartphone with amazing features.',
      isOnSale: true,
      category: 'Smartphone',
      id: 1
    },
    {
      image: 'https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/03/21-400x400.jpg',
      price: 29.99,
      stars: 4,
      name: 'Smartphone ABC',
      description: 'A great smartphone with amazing features.',
      isOnSale: true,
      category: 'Smartphone',
      id: 1
    },
    {
      image: 'https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/03/16-400x400.jpg',
      price: 29.99,
      stars: 4,
      name: 'Smartphone ABC',
      description: 'A great smartphone with amazing features.',
      isOnSale: true,
      category: 'Smartphone',
      id: 1
    },
    {
      image: 'https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/03/17-400x400.jpg',
      price: 49.99,
      stars: 5,
      name: 'Gaming Console X',
      description: 'The best gaming console for hardcore gamers.',
      isOnSale: false,
      category: 'Gaming',
      id: 2
    },
    {
      image: 'https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/03/17-400x400.jpg',
      price: 19.99,
      stars: 3,
      name: 'Wireless Headphones',
      description: 'Comfortable wireless headphones with great sound quality.',
      isOnSale: true,
      category: 'Audio',
      id: 3
    }
  ];

  // Regroupe les produits par catégorie
  const categories = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-6">
      {/* Affichage de la catégorie Smartphones */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Smartphones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories['Smartphone'] && categories['Smartphone'].map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              price={product.price}
              stars={product.stars}
              onAddToCart={() => handleAddToCart(product)}
              name={product.name}
              description={product.description}
              isOnSale={product.isOnSale}
            />
          ))}
        </div>
      </div>

      {/* Ajoute ici d'autres sections pour d'autres catégories */}
      {/* Exemple pour Gaming */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Gaming Consoles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories['Gaming'] && categories['Gaming'].map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              price={product.price}
              stars={product.stars}
              onAddToCart={() => handleAddToCart(product)}
              name={product.name}
              description={product.description}
              isOnSale={product.isOnSale}
            />
          ))}
        </div>
      </div>

      {/* Exemple pour Audio */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Audio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories['Audio'] && categories['Audio'].map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              price={product.price}
              stars={product.stars}
              onAddToCart={() => handleAddToCart(product)}
              name={product.name}
              description={product.description}
              isOnSale={product.isOnSale}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
