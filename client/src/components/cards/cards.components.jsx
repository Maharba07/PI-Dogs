import React, { useState } from "react";
import Card from "../card/card.components";
import "./cards.styles.css";

function Cards({ allDogs, searchString }) {
  const [orderBy, setOrderBy] = useState({ field: "name", order: "asc" });

  const filteredDogs = allDogs.filter((dog) => {
    return dog.name.toLowerCase().includes(searchString.toLowerCase());
  });

  const toggleOrder = (field) => {
    if (orderBy.field === field) {
      const newOrder = orderBy.order === "asc" ? "desc" : "asc";
      setOrderBy({ field, order: newOrder });
    } else {
      setOrderBy({ field, order: "asc" });
    }
  };

  filteredDogs.sort((a, b) => {
    let fieldA, fieldB;

    if (orderBy.field === "name") {
      fieldA = a.name.toLowerCase();
      fieldB = b.name.toLowerCase();
    } else if (orderBy.field === "temperament") {
      fieldA = a.temperament.toLowerCase();
      fieldB = b.temperament.toLowerCase();
    }

    const orderFactor = orderBy.order === "asc" ? 1 : -1;
    return fieldA < fieldB ? -1 * orderFactor : fieldA > fieldB ? 1 * orderFactor : 0;
  });

  return (
    <div>
      <button className="ordenar" onClick={() => toggleOrder("name")}>
        Sort By Name{" "}
        {orderBy.field === "name" && orderBy.order === "asc" ? "↓" : "↑"}
      </button>
      <button className="ordenar" onClick={() => toggleOrder("temperament")}> 
        Sort By Temperament{" "}
        {orderBy.field === "temperament" && orderBy.order === "asc" ? "↓" : "↑"} 
      </button>

      <div className="cards-list">
        {filteredDogs.map((dog) => (
          <Card key={dog.id} dog={dog} imagen={dog.image} />
        ))}
      </div>
    </div>
  );
}

export default Cards;
