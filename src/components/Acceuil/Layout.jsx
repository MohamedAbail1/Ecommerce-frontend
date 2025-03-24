// Layout.js
import Navbar from './NavBar'; // Importation de ton Navbar
import Footer from './Footer'; // Importation de ton Footer

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />  {/* Navbar affichée */}
      <div className="min-h-screen p-5">{children}</div>  {/* Contenu de la page */}
      <Footer />  {/* Footer affiché */}
    </>
  );
};

export default Layout;
