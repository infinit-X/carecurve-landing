import React from 'react';
import Navbar from './components/Navbar/Navbar'; // Import Navbar
import Hero from './components/Hero/Hero';       // Import Hero
import ProblemStatement from './components/ProblemStatement/ProblemStatement'; // Import ProblemStatement
import CareCurveIntro from './components/carecurve-intro/CareCurveIntro'; // Import CareCurveIntro
import './App.css'; // Keep or modify App.css for global styles if needed

function App() {
  return (
    <div className="App">
      <Navbar /> {/* Render the Navbar */}
      <Hero />   {/* Render the Hero section */}
      <ProblemStatement />
      <CareCurveIntro /> {/* Render the CareCurveIntro section */}
      {/* Other sections will go here later */}
    </div>
  );
}

export default App;