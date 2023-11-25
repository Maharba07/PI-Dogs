import React from 'react';
import { Link } from 'react-router-dom';
import './landing.styles.css'

function LandingPage() {
  return (
    <div className="landing-page">
      <h1>BIENVENID@S A LA PAGINA QUE TE LLEVERA AL CIELO DE LAS TERNURAS</h1>
      <Link to="/home">
        <button className="landing-button">LISTO PARA EL CIELO? </button>
      </Link>
    </div>
  );
}

export default LandingPage;