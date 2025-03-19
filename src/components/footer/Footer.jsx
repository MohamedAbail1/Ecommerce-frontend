import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin, faTruck, faTag } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Section 1: EcoWeb Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">EcoWeb</h3>
            <ul>
              <li>
                <a href="#" className="flex items-center hover:text-blue-400">
                  <FontAwesomeIcon icon={faLocationPin} className="mr-2" style={{ color: '#05a6fb' }} />
                  Find a location nearest you. See Our Stores
                </a>
              </li>
              <li>
                <a href="mailto:Support1234@EcoWeb.com" className="hover:text-blue-400">
                  <FontAwesomeIcon icon={faTag} className="mr-2" style={{ color: '#05a6fb' }} />
                  Support1234@EcoWeb.com
                </a>
              </li>
              <li>
                <a href="tel:+212698439434" className="hover:text-blue-400">
                  <FontAwesomeIcon icon={faTruck} className="mr-2" style={{ color: '#05a6fb' }} />
                  +212 698439434
                </a>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-white hover:text-blue-400">
                <FontAwesomeIcon icon={faFacebookF} size="lg" />
              </a>
              <a href="#" className="text-white hover:text-blue-400">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a href="#" className="text-white hover:text-blue-400">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a href="#" className="text-white hover:text-blue-400">
                <FontAwesomeIcon icon={faPinterest} size="lg" />
              </a>
            </div>
          </div>

          {/* Section 2: About Us */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <ul>
              <li><a href="#" className="hover:text-blue-400">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400">News & Blog</a></li>
              <li><a href="#" className="hover:text-blue-400">Brands</a></li>
              <li><a href="#" className="hover:text-blue-400">Press Center</a></li>
              <li><a href="#" className="hover:text-blue-400">Advertising</a></li>
              <li><a href="#" className="hover:text-blue-400">Investors</a></li>
            </ul>
          </div>

          {/* Section 3: Support */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Support</h3>
            <ul>
              <li><a href="#" className="hover:text-blue-400">Support Center</a></li>
              <li><a href="#" className="hover:text-blue-400">Manage</a></li>
              <li><a href="#" className="hover:text-blue-400">Service</a></li>
              <li><a href="#" className="hover:text-blue-400">Haul Away</a></li>
              <li><a href="#" className="hover:text-blue-400">Security Center</a></li>
              <li><a href="#" className="hover:text-blue-400">Contact</a></li>
            </ul>
          </div>

          {/* Section 4: Order */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Order</h3>
            <ul>
              <li><a href="#" className="hover:text-blue-400">Check Order</a></li>
              <li><a href="#" className="hover:text-blue-400">Delivery & Pickup</a></li>
              <li><a href="#" className="hover:text-blue-400">Returns</a></li>
              <li><a href="#" className="hover:text-blue-400">Exchanges</a></li>
              <li><a href="#" className="hover:text-blue-400">Developers</a></li>
              <li><a href="#" className="hover:text-blue-400">Gift Cards</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center text-sm">
            <hr className="border-gray-600" />
          <p className='mt-4'>&copy; 2025 EcoWeb. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
