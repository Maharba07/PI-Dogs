import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./detail.styles.css";

const Detail = () => {
  const { id } = useParams();
  const [dog, setDog] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.thedogapi.com/v1/breeds/${id}`);
        const data = await response.json();

        if (data.name) {
          setDog(data);

          if (data.reference_image_id) {
            const imageResponse = await fetch(`https://api.thedogapi.com/v1/images/${data.reference_image_id}`);
            const imageData = await imageResponse.json();
            setImageUrl(imageData.url);
          }
        } else {
        
          navigate("/error");
        }
      } catch (error) {
        console.error("Error fetching dog details:", error);

        navigate("/error");
      }
    };

    fetchData();


    return () => setDog({});
  }, [id, navigate]);

  return (
    <div className="container">
      <div className="details">
        <pre>
          <h1>Dog Details:</h1>
          <Link to="/home/">
            <button className="return-detail">Return</button>
          </Link>
          <h2>ID: {dog.id}</h2>
          <h2>Name: {dog.name}</h2>
          {dog.weight && (
            <>
              <h2>Peso: </h2>
              <h3>Imperial: {dog.weight.imperial} -- Lb</h3>
              <h3>Metrico: {dog.weight.metric} -- Kg</h3>
            </>
          )}
          {dog.height && (
            <>
              <h2>Altura: </h2>
              <h3>Imperial: {dog.height.imperial} -- Pulg</h3>
              <h3>Metrico: {dog.height.metric} -- CM</h3>
            </>
          )}
          <h3>Temperamentos: {dog.temperament}</h3>
          <h3>Años de Vida: {dog.life_span}</h3>

          <div className="imagen_details_container">
            {imageUrl ? (
              <img className="imagen_details" src={imageUrl} alt="Dog" />
            ) : (
              <p>Imagen no disponible</p>
            )}
          </div>
        </pre>
      </div>
    </div>
  );
};

export default Detail;
