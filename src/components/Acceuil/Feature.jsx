import React from 'react';
import './style/Features.css';
function Feature({ feature }) {
  return (
    <div className="bg-white shadow-md p-5 rounded-lg flex flex-col items-center text-center">
      <div className="text-4xl">{feature.icon}</div>
      <h3 className="text-lg font-bold mt-2">{feature.title}</h3>
      <p className="text-gray-600 mt-1">{feature.description}</p>
    </div>
  );
}

export default Feature;
