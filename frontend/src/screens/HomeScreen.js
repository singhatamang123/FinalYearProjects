import React from "react";
import ProductCarousel from "../components/ProductCarousel";
import './homePage.scss';
import Directory from '../components/directory/directory.js';

function HomeScreen() {
  return (
    <div>
      <ProductCarousel />
      <h2>Collections store</h2>
      <div className='homepage' >
        <Directory />
      </div>
    </div>
  );
}

export default HomeScreen;
