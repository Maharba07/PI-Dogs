import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogByName, getDogs } from "../redux/action/actions";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/navbar.components";
import Cards from "../components/cards/cards.components";

import "./home.styles.css";

function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const created = useSelector((state) => state.createdDog);
  const [searchString, setSearchString] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;

  function handleChange(e) {
    e.preventDefault();
    setSearchString(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getDogByName(searchString));
  }

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  const dogsToDisplay = searchString ? created.filter((dog) =>
    dog.name.toLowerCase().includes(searchString.toLowerCase())
) : [...allDogs, ...created];

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogsToDisplay.slice(indexOfFirstDog, indexOfLastDog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="home-page">
      <h1 className="title">WELCOME!</h1>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
      <div className="botones">
        <Link to="/" className="boton-salir">
          Salir
        </Link>
        <Link to="/create" className="boton-crearPerro">
          Crear Perro
        </Link>
      </div>
      <Cards allDogs={currentDogs} searchString={searchString} />

      <div className="paginado">
        {Array.from({
          length: Math.ceil(dogsToDisplay.length / dogsPerPage),
        }).map((item, index) => (
          <button
            className="boton-paginado"
            key={index}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
