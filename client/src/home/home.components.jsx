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
  const visiblePages = 5;

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

  const dogsToDisplay = searchString
    ? [
        ...created.filter((dog) =>
          dog.name.toLowerCase().includes(searchString.toLowerCase())
        ),
        ...allDogs.filter((dog) =>
          dog.name.toLowerCase().includes(searchString.toLowerCase())
        ),
      ]
    : [...allDogs, ...created];

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogsToDisplay.slice(indexOfFirstDog, indexOfLastDog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    const totalPages = Math.ceil(dogsToDisplay.length / dogsPerPage);
    const pages = [];

    if (totalPages <= visiblePages) {
      // Si hay menos o igual a 5 páginas, mostrar todos los botones
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            className={`boton-paginado ${currentPage === i ? "active" : ""}`}
            key={i}
            onClick={() => paginate(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      // Si hay más de 5 páginas, manejar la lógica de puntos suspensivos
      const leftBound = Math.max(1, currentPage - Math.floor(visiblePages / 2));
      const rightBound = Math.min(
        totalPages,
        leftBound + visiblePages - 1
      );

      if (leftBound > 1) {
        // Agregar puntos suspensivos si la primera página no es visible
        pages.push(<span key="ellipsis-start">...</span>);
      }

      for (let i = leftBound; i <= rightBound; i++) {
        pages.push(
          <button
            className={`boton-paginado ${currentPage === i ? "active" : ""}`}
            key={i}
            onClick={() => paginate(i)}
          >
            {i}
          </button>
        );
      }

      if (rightBound < totalPages) {
        // Agregar puntos suspensivos si la última página no es visible
        pages.push(<span key="ellipsis-end">...</span>);
      }
    }

    return pages;
  };

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
        {currentPage > 1 && (
          <button
            className="boton-paginado"
            onClick={() => paginate(currentPage - 1)}
          >
            Prev
          </button>
        )}
        {renderPagination()}
        {currentPage < Math.ceil(dogsToDisplay.length / dogsPerPage) && (
          <button
            className="boton-paginado"
            onClick={() => paginate(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
