import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./card.styles.css";

function Card({ dog }) {
  const [imageUrl, setImageUrl] = useState("");
  const {
    id,
    name,
    temperament,
    weight: { imperial },
    weight: { metric },
  } = dog;

  useEffect(() => {
    const fetchData = () => {
      fetch(`https://api.thedogapi.com/v1/images/${dog.reference_image_id}`)
        .then((response) => {
          return response.json();
        })
        .then((imageData) => {
          setImageUrl(imageData.url);
        })
        .catch((error) => {
          console.error("Error fetching image:", error.message);
        });
    };

    fetchData();
  }, [dog.reference_image_id]);
  return (
    <div className="card-container">
      <Link to={`/home/${id}`}>
        <h2>{name}</h2>
        <p>{temperament}</p>
        <h3>
          {imperial}Lb ({metric}Kg)
        </h3>
        <img className="imagen_perros_home" src={imageUrl} alt="Dog" />
      </Link>
    </div>
  );
}

export default Card;
