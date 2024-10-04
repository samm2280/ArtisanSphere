import React from 'react';
import Dashboard from '../actualcomp/Dashboard';
//import Footer from '../actualcomp/footer'; // Adjust the path if necessary
// <Footer /> {/* Use the Footer component here */}
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from '../actualcomp/Navbar';

function Home() {
  return (
    <div>
      <Dashboard />
      <Navbar />
     
    </div>
  );
}

export default Home;
