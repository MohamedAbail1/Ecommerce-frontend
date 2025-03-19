import React from "react";
import Button from "./Button"; // Importer le composant Button
import landingImage from "../assets/mains.png";

const MainPage = () => {
  return (
    <div className="container mx-auto p-6 bg-gray-100">
      {/* Conteneur pour les boutons */}
      <div className="flex justify-between space-x-4 mb-8">
        <Button label="Smartphon" />
        <Button label="Games" />
        <Button label="Television" />
        <Button label="Headphones" />
        <Button label="Laptops" />
        <Button label="Speakers" />
        <Button label="Camera" />
        <Button label="Alarm" />

      </div>

      <div className="flex justify-center">
        <img src={landingImage} alt="Landing Page" className="w-full h-auto" />
      </div>

    </div>
  );
};

export default MainPage;
