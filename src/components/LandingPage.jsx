import React, { useState } from "react";
import Navbar from "./navbar";
import Header from "./Header";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import ProductsPage from "./products/ProductsPage";
import Footer from "./footer/Footer";


const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <>
      <div>
        <Navbar />
        <Header onLoginClick={handleLoginClick} />
        {showLogin && <LoginPage onClose={handleCloseLogin} />}
        <MainPage />
        <ProductsPage />
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
