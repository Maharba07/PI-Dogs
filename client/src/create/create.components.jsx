import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import axios from "axios";
import {
  getTemperaments,
  createDogsDB,
  // getCreated,
} from "../redux/action/actions";
import "./create.styles.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const temperamento = useSelector((state) => state.temperaments);
  const createdDogs = useSelector((state) => state.createdDog);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const formInitialState = {
    name: "",
    image: "",
    altura: "",
    peso: "",
    años_vida: "",
    temperamento: [],
  };

  const errorInitialState = {
    name: "Ingrese un nombre válido, sin números y no debe ser mayor de 40 caracteres",
    altura: "La altura debe ser un número",
    peso: "El peso debe ser un número",
    años_vida: "Los años de vida deben ser un número",
    temperamento: "Al menos debe tener 1 temperamento",
  };

  const [newName, setNewName] = useState(formInitialState);
  const [inputError, setInputError] = useState(errorInitialState);

  const onTextInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "name" && value.length > 0 && value.length < 40) {
      setInputError((prevInputError) => ({ ...prevInputError, name: "" }));
    } else if (name === "altura" && (!isNaN(value) || value === "")) {
      setInputError((prevInputError) => ({ ...prevInputError, altura: "" }));
    } else if (name === "peso" && !isNaN(value)) {
      setInputError((prevInputError) => ({ ...prevInputError, peso: "" }));
    } else if (name === "años_vida" && !isNaN(value)) {
      setInputError((prevInputError) => ({ ...prevInputError, años_vida: "" }));
    } else {
      setInputError((prevInputError) => ({
        ...prevInputError,
        [name]: errorInitialState[name],
      }));
    }

    setNewName({
      ...newName,
      [name]: value,
    });
  };

  const onTemperamentSelectChange = (event) => {
    const { value } = event.target;
    if (!newName.temperamento.includes(value)) {
      const newTemperamentoName = [...newName.temperamento, value];
      if (newTemperamentoName.length < 1) {
        setInputError({
          ...inputError,
          temperamento: "Al menos debe tener 1 temperamento",
        });
      } else {
        delete inputError.temperamento;
      }

      setNewName({
        ...newName,
        temperamento: [...newName.temperamento, value],
      });
    }
  };

  const onDeleteTemperament = (event) => {
    const value = event.target.innerText;
    const newTemperamento = newName.temperamento.filter(
      (temperamento) => temperamento !== value
    );
    if (newTemperamento.length < 1) {
      setInputError({
        ...inputError,
        temperamento: "Al menos debe tener 1 temperamento",
      });
    } else {
      delete inputError.temperamento;
    }

    setNewName({
      ...newName,
      temperamento: newTemperamento,
    });
  };

  const onSubmitName = async (event) => {
    event.preventDefault();

    if (
      !newName.name ||
      !newName.altura ||
      !newName.peso ||
      !newName.años_vida ||
      newName.temperamento.length === 0
    ) {
      return window.alert("Todos los campos requeridos deben ser completados.");
    }

    try {
      await dispatch(createDogsDB(newName));
      // await dispatch(getCreated());

      console.log("Updated Dogs State:", createdDogs);

      navigate("/home");
      
    } catch (error) {
      console.error("Error al enviar la solicitud:", error.response);
    }
  };

  useEffect(() => {}, [newName, inputError]);

  return (
    <div className="create-container">
      <form className="form-container" onSubmit={onSubmitName}>
        <label className="form-label">
          Nuevo Nombre:
          <br />
          <input
            name="name"
            type="text"
            className="label-form"
            onChange={onTextInputChange}
            value={newName.name}
          />
          <div className="errorMessage">
            {inputError.name && inputError.name}
          </div>
        </label>
        <br />
        <label className="form-label">
          URL de la Image:
          <br />
          <input
            name="image"
            type="url"
            className="label-form"
            onChange={onTextInputChange}
            value={newName.image}
          />
          <br />
        </label>
        <br />
        <label className="form-label">
          Altura:
          <br />
          <input
            name="altura"
            type="text"
            className="label-form"
            onChange={onTextInputChange}
            value={newName.altura}
          />
          <div className="errorMessage">
            {inputError.altura && inputError.altura}
          </div>
        </label>
        <br />
        <label className="form-label">
          Peso:
          <br />
          <input
            name="peso"
            type="text"
            className="label-form"
            onChange={onTextInputChange}
            value={newName.peso}
          />
          <div className="errorMessage">
            {inputError.peso && inputError.peso}
          </div>
        </label>
        <br />
        <label className="form-label">
          Años de Vida:
          <br />
          <input
            name="años_vida"
            type="text"
            className="label-form"
            onChange={onTextInputChange}
            value={newName.años_vida}
          />
          <div className="errorMessage">
            {inputError.años_vida && inputError.años_vida}
          </div>
        </label>
        <br />
        <label className="form-label">
          Temperamentos:
          <br />
          <select
            name="temperamento"
            className="label-temperamento"
            onChange={onTemperamentSelectChange}
          >
            {temperamento &&
              temperamento.map((temperaments) => {
                return (
                  <option
                    key={temperaments && temperaments.id}
                    value={temperaments}
                  >
                    {temperaments}
                  </option>
                );
              })}
          </select>
          <div className="errorMessage">
            {inputError.temperamento && inputError.temperamento}
          </div>
        </label>
        <div>
          {newName.temperamento.length > 0 &&
            newName.temperamento.map((temperaments) => {
              return (
                <span
                  className="temperamentos-agregados"
                  key={temperaments}
                  value="temperaments"
                  onClick={onDeleteTemperament}
                >
                  {temperaments}
                </span>
              );
            })}
        </div>
        <input className="boton-submit" type="submit" />
        <Link to="/home/">
          <button className="return-button">Return</button>
        </Link>
      </form>
    </div>
  );
};

export default Create;
