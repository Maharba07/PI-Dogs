import React from 'react';
import { Link } from 'react-router-dom';
import './landing.styles.css'

function LandingPage() {
  return (
    <div className="landing-page">
      <h1 className='titulo-landing'>BIENVENID@S A LA PAGINA DE LOS PERRITOS</h1>
      <Link to="/home">
        <button className="landing-button">ADELANTE</button>
      </Link>
    </div>
  );
}

export default LandingPage;