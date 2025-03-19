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
    <button className="bg-white border-lg py-5 px-5 rounded-md flex items-center space-x-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer">
      <FontAwesomeIcon icon={icons[label]} className="text-[#05a6fb]" />
      <span>{label}</span>
    </button>
  );
};

export default Button;
