import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Admin dashboard
import Sidebar from "./components/dashboard/components/Sidebar";
import Dashboard from "./components/dashboard/pages/Dashboard";
import Users from "./components/dashboard/pages/Users";
import Products from "./components/dashboard/pages/Products";
import Categories from "./components/dashboard/pages/Categories";
import Orders from "./components/dashboard/pages/Orders";
import Login from "./components/dashboard/pages/Login";
import Messages from "./components/dashboard/pages/Messages"; // Importez la page Messages
import PrivateRoute from "./components/dashboard/components/PrivateRoute";
import { ToastContainer } from "react-toastify";


// Shop (public site)
import Home from "./components/shop/pages/Home";
import ProductDetails from "./components/shop/pages/ProductDetails";

import Checkout from "./components/shop/pages/Checkout";
import Aprop from './components/apropos/apropos';
import Contacter from './components/contacterNous/contacter';
import Navbar from './components/Acceuil/NavBar';
import Footer  from './components/Acceuil/Footer'
import Layout from './components/Acceuil/Layout';
// import Fet from './components/Acceuil/Features';
import LayoutAcceuil from './components/Acceuil/Acceuil';
import SignUp from './components/dashboard/pages/SignUp';
// Dans votre fichier de routes (ex: App.js ou Routes.js)
import CartPage from "./components/shop/pages/CartPage";


// Ajoutez cette route à votre configuration


function App() {
  return (
    <Router>

<>
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Autres composants */}
    </>
      
      <Routes>
        {/* acceuil */}
        {/* <Route path="/shop/Fet" element={<Fet />} /> */}
        <Route path="/shop/about" element={<Layout><Aprop /></Layout>} />
        <Route path="/shop/Contact" element={<Layout><Contacter /></Layout>} />
        <Route path="/login" element= {<Layout><Login /></Layout>}/>
        <Route path="/SignUp" element= {<Layout><SignUp /></Layout>}/>
        <Route path="/" element= {<LayoutAcceuil><Home /></LayoutAcceuil>}/>
      {/*  */}
     
     
     

        {/* ✅ Shop public */}
        {/* <Route path="/shop" element={<Home />} /> */}
        <Route path="/shop/product/:id" element={<ProductDetails />} />
        <Route path="/shop/cart" element={<CartPage />} />
        <Route path="/shop/checkout" element={<Checkout />} />

        {/* ✅ Admin dashboard */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="flex">
                <Sidebar />
                <div className="p-6 w-full bg-gray-100 min-h-screen">
                  <Routes>
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/messages" element={<Messages />} /> {/* Route pour les messages */}
                  </Routes>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
