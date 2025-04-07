import { useState, useEffect } from "react";
import { useLocation,Link } from "react-router-dom";
import axios from "axios";
import Features from "../../Acceuil/Features"; 
import Navbar from "../../Acceuil/NavBar";
import Foot from "../../Acceuil/Footer";
const Catalog = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/api/items");
        setProducts(response.data.data); // Accéder à response.data.data
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q")?.toLowerCase() || "";
    setSearchQuery(query);

    const filtered = query
      ? products.filter((product) =>
          product.name.toLowerCase().includes(query)
        )
      : products;
    
    setFilteredProducts(filtered);
  }, [location.search, products]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 min-h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <>
     <Navbar />
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Notre Catalogue</h1>
      
      {/* Barre de recherche */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value.toLowerCase();
              setSearchQuery(value);
              
              // Mettre à jour l'URL
              const newUrl = value 
                ? `${location.pathname}?q=${encodeURIComponent(value)}`
                : location.pathname;
              window.history.pushState({}, "", newUrl);
              
              // Filtrer les produits
              const filtered = value
                ? products.filter((product) =>
                    product.name.toLowerCase().includes(value)
                )
                : products;
              setFilteredProducts(filtered);
            }}
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                window.history.pushState({}, "", location.pathname);
                setFilteredProducts(products);
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Liste des produits */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image du produit */}
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://via.placeholder.com/300x200?text=Image+Non+Disponible";
                    }}
                  />
                ) : (
                  <img 
                    src="https://via.placeholder.com/300x200?text=Pas+d'image" 
                    alt="Placeholder" 
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              
              {/* Détails du produit */}
              <div className="p-4">
                <h2 className="font-bold text-xl mb-2 text-gray-800">{product.name}</h2>
                {product.description && (
                  <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                )}
                
                <div className="flex justify-between items-center mt-4">
                  {product.price ? (
                    <span className="text-lg font-bold text-blue-600">
                      {parseFloat(product.price).toFixed(2)} DH
                    </span>
                  ) : (
                    <span className="text-gray-500">Prix non disponible</span>
                  )}
                   <Link
            to={`/shop/product/${product.id}`}>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    Voir plus
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 mb-4">
            {products.length === 0 ? "Aucun produit disponible" : "Aucun produit trouvé"}
          </p>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                window.history.pushState({}, "", location.pathname);
                setFilteredProducts(products);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Réinitialiser la recherche
            </button>
          )}
        </div>
      )}
    </div>
    <div className="bg-gray-100 py-10">
        <Features />
      </div>
    <Foot />
    </>
  );
};

export default Catalog;