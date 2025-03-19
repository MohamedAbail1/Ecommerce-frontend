import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileAlt, faGamepad, faTv, faHeadphones, faLaptop, faVolumeUp, faCamera,faTabletAlt  } from "@fortawesome/free-solid-svg-icons";

const icons = {
  Smartphon: faMobileAlt,
  Games: faGamepad,
  Television: faTv,
  Headphones: faHeadphones,
  Laptops: faLaptop,
  Speakers: faVolumeUp,
  Camera: faCamera,
  Alarm: faTabletAlt ,
};

const Button = ({ label }) => {
  return (
    <button className="bg-gray-100 border-lg py-2 px-4 rounded-md flex items-center space-x-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
      <FontAwesomeIcon icon={icons[label]} />
      <span>{label}</span>
    </button>
  );
};

export default Button;
