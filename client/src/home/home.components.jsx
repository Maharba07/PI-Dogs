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

  const filteredDogs = searchString
    ? allDogs.filter((dog) =>
        dog.name.toLowerCase().includes(searchString.toLowerCase())
      )
    : allDogs;

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = filteredDogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="home-page">
      <h1 className="title">WELCOME!</h1>

      <div className="botones-home">
        <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
        <Link to="/">
          <button className="boton-generico">Salir</button>
        </Link>
        <Link to="/create">
          <button className="boton-generico">Crear Perro</button>
        </Link>
      </div>
      <Cards allDogs={currentDogs} searchString={searchString} />

      <div className="paginado">
        {Array.from({
          length: Math.ceil(filteredDogs.length / dogsPerPage),
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
