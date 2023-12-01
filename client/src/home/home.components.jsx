import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogByName, getDogs } from "../redux/action/actions";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/navbar.components";
import Cards from "../components/cards/cards.components";

import "./home.styles.css";

function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const [searchString, setSearchString] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setSearchString(e.target.value);
  }
  //********Filtro con el Backend */

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getDogByName(searchString));
    console.log(allDogs);
  }

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);
    return (
      <div className="home-page">
        <h1>Estas en la Home</h1>
    <div className="botones-home">
    <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
        <Link to="/">
            <button className="boton-generico">Salir</button>
        </Link>
        <Link to="/create">
            <button className="boton-generico">Crear Perro</button>
        </Link>
    </div>
    <Cards allDogs={allDogs} searchString={searchString} />
      </div>
    );
  }
  
  export default Home;