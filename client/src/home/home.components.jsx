//import { useEffect, useState } from "react";
//import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./home.styles.css"

function Home() {
    return (
      <div className="home-page">
        <h1>Estas en la Home</h1>
    <div className="botones-home">
        <Link to="/">
            <button className="boton-generico">Salir</button>
        </Link>
        <Link to="/create">
            <button className="boton-generico">Crear Perro</button>
        </Link>
    </div>
      </div>
    );
  }
  
  export default Home;