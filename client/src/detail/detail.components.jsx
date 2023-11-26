import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./detail.styles.css";

const Detail = () => {
  const { id } = useParams();
  const [dog, setDog] = useState({});
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch(`https://api.thedogapi.com/v1/breeds/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.name) {
          setDog(data);
          fetch(`https://api.thedogapi.com/v1/images/${data.reference_image_id}`)
            .then((response) => response.json())
            .then((imageData) => {
              setImageUrl(imageData.url);
            });
        } else {
          window.alert("Dog not found");
        }
      });
    return setDog({});
  }, [id]);

  return (
    <div className="details">
      <pre>
        <h1>Dog Details:</h1>
        <Link to="/home/">
          <button className="return-button">Return</button>
        </Link>
        <h2>Name: {dog.name}</h2>
        {dog.weight && (
          <>
            <h2>Peso: </h2>
            <h3>Imperial: {dog.weight.imperial} --Lb</h3>
            <h3>Metrico: {dog.weight.metric} --Kg</h3>
          </>
        )}
        <h3>Temperament: {dog.temperament}</h3>
        
          <div>
            <h3>Image:</h3>
            <img src={imageUrl} alt="Dog" />
          </div>
       
      </pre>
    </div>
  );
};

export default Detail;