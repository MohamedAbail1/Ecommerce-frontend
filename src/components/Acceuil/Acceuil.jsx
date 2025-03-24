import Navbar from "./NavBar";
import Footer from "./Footer";
import Features from "./Features"; // Import du composant Features

const Layout = ({ children }) => {
  return (
    <>
      <Navbar /> {/* Navbar affichée */}
      
      {/* Section Features */}
     

      {/* Contenu de la page */}
      <div className="min-h-screen p-5">
        {children}
      </div>
      <div className="bg-gray-100 py-10">
        <Features />
      </div>
      <Footer /> {/* Footer affiché */}
    </>
  );
};

export default Layout;
