import { React, useState } from "react";
import Card from "../card/card.components";
import "./cards.styles.css";

function Cards({allDogs, searchString }) {
  const [orderBy, setOrderBy] = useState({ field: "name", order: "asc" });
  

  const filteredDogs = allDogs.filter((dog) => {
    return dog.name
      .toLowerCase()
      .includes(searchString.toLowerCase());
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
    const fieldA =
      orderBy.field === "name" ? a.name.toLowerCase() : a.dob;
    const fieldB =
      orderBy.field === "name" ? b.name.toLowerCase() : b.dob;
    const orderFactor = orderBy.order === "asc" ? 1 : -1;
    return fieldA.localeCompare(fieldB) * orderFactor;
  });

  return (
    <div className="cards-list" >
      <div>
        <button className="ordenar-nombre" onClick={() => toggleOrder("name")}>
          Sort By Name{" "}
          {orderBy.field === "name" && orderBy.order === "asc" ? "↓" : "↑"}
        </button>
      </div>
      {filteredDogs.map((dog) => (
        <Card key={dog.id} dog={dog} />
      ))}
    </div> 
  );
}

export default Cards;