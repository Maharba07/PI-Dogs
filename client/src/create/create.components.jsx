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
    alturaMin: "",
    alturaMax: "",
    pesoMin: "",
    pesoMax: "",
    años_vidaMin: "",
    años_vidaMax: "",
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

  const onHeightInputChange = (event) => {
    const { name, value } = event.target;
    let errorMessage = "";

    setNewName({
      ...newName,
      [name]: value,
    });

    // Validación después de que ambos campos estén llenos
    if (name === "alturaMin" && newName.alturaMax !== "") {
      const minValue = parseFloat(value);
      const maxValue = parseFloat(newName.alturaMax);

      if (minValue >= maxValue) {
        errorMessage =
          "La altura mínima no puede ser mayor o igual a la altura máxima.";
      } else if (minValue < 5) {
        errorMessage = "La altura mínima no puede ser menor a 5.";
      } else if (maxValue > 45) {
        errorMessage = "La altura máxima no puede ser mayor a 45.";
      }
    } else if (name === "alturaMax" && newName.alturaMin !== "") {
      const minValue = parseFloat(newName.alturaMin);
      const maxValue = parseFloat(value);

      if (minValue >= maxValue) {
        errorMessage =
          "La altura máxima no puede ser menor o igual a la altura mínima.";
      } else if (minValue < 5) {
        errorMessage = "La altura mínima no puede ser menor a 5.";
      } else if (maxValue > 45) {
        errorMessage = "La altura máxima no puede ser mayor a 45.";
      }
    }

    setInputError((prevInputError) => ({
      ...prevInputError,
      altura: errorMessage,
    }));
  };

  const onWeightInputChange = (event) => {
    const { name, value } = event.target;
    let errorMessage = "";

    setNewName({
      ...newName,
      [name]: value,
    });

    // Validación después de que ambos campos estén llenos
    if (name === "pesoMin" && newName.pesoMax !== "") {
      const minValue = parseFloat(value);
      const maxValue = parseFloat(newName.pesoMax);

      if (minValue < 1 || maxValue > 200) {
        errorMessage =
          "El peso mínimo no puede ser menor a 1 y el peso máximo no puede ser mayor a 200.";
      } else if (minValue >= maxValue) {
        errorMessage =
          "El valor mínimo no puede ser mayor o igual al valor máximo.";
      }
    } else if (name === "pesoMax" && newName.pesoMin !== "") {
      const minValue = parseFloat(newName.pesoMin);
      const maxValue = parseFloat(value);

      if (minValue < 1 || maxValue > 200) {
        errorMessage =
          "El peso mínimo no puede ser menor a 1 y el peso máximo no puede ser mayor a 200.";
      } else if (minValue >= maxValue) {
        errorMessage =
          "El valor mínimo no puede ser mayor o igual al valor máximo.";
      }
    }

    setInputError((prevInputError) => ({
      ...prevInputError,
      peso: errorMessage,
    }));
  };

  const onLifeExpectancyInputChange = (event) => {
    const { name, value } = event.target;
    let errorMessage = "";

    setNewName({
      ...newName,
      [name]: value,
    });

    // Validación después de que ambos campos estén llenos
    if (name === "años_vidaMin" && newName.años_vidaMax !== "") {
      const minValue = parseFloat(value);
      const maxValue = parseFloat(newName.años_vidaMax);

      if (minValue < 8 || maxValue > 20) {
        errorMessage =
          "Los años de vida mínimos no pueden ser menores a 8 y los años de vida máximos no pueden ser mayores a 20.";
      } else if (minValue >= maxValue) {
        errorMessage =
          "El valor mínimo no puede ser mayor o igual al valor máximo.";
      }
    } else if (name === "años_vidaMax" && newName.años_vidaMin !== "") {
      const minValue = parseFloat(newName.años_vidaMin);
      const maxValue = parseFloat(value);

      if (minValue < 8 || maxValue > 20) {
        errorMessage =
          "Los años de vida mínimos no pueden ser menores a 8 y los años de vida máximos no pueden ser mayores a 20.";
      } else if (minValue >= maxValue) {
        errorMessage =
          "El valor mínimo no puede ser mayor o igual al valor máximo.";
      }
    }

    setInputError((prevInputError) => ({
      ...prevInputError,
      años_vida: errorMessage,
    }));
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
      !newName.alturaMin ||
      !newName.alturaMax ||
      !newName.pesoMin ||
      !newName.pesoMax ||
      !newName.años_vidaMin ||
      !newName.años_vidaMax ||
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
          Altura (Pulgadas; min:5 - max:45):
          <br />
          <div className="label-container">
            <br />
            <label>Minimo: </label>
            <input
              name="alturaMin"
              type="text"
              className="label-form"
              onChange={onHeightInputChange}
              value={newName.alturaMin}
            />
            <span className="conversion-message">
              {newName.alturaMin &&
                `${newName.alturaMin} pulgadas = ${
                  newName.alturaMin * 2.54
                } cm`}
            </span>
          </div>
          <div className="label-container">
            <label>Maximo: </label>
            <input
              name="alturaMax"
              type="text"
              className="label-form"
              onChange={onHeightInputChange}
              value={newName.alturaMax}
            />
            <span className="conversion-message">
              {newName.alturaMax &&
                `${newName.alturaMax} pulgadas = ${
                  newName.alturaMax * 2.54
                } cm`}
            </span>
          </div>
          <div className="errorMessage">
            {inputError.altura && inputError.altura}
          </div>
        </label>
        <br />
        <label className="form-label">
          Peso (Libras; min:1 - max:200):
          <br />
          <div className="label-container">
            <label>Minimo: </label>
            <input
              name="pesoMin"
              type="text"
              className="label-form"
              onChange={onWeightInputChange}
              value={newName.pesoMin}
            />
            <span className="conversion-message">
              {newName.pesoMin &&
                `${newName.pesoMin} libras = ${newName.pesoMin * 0.453592} kg`}
            </span>
          </div>
          <div className="label-container">
            <label>Maximo: </label>
            <input
              name="pesoMax"
              type="text"
              className="label-form"
              onChange={onWeightInputChange}
              value={newName.pesoMax}
            />
            <span className="conversion-message">
              {newName.pesoMax &&
                `${newName.pesoMax} libras = ${newName.pesoMax * 0.453592} kg`}
            </span>
          </div>
          <div className="errorMessage">
            {inputError.peso && inputError.peso}
          </div>
        </label>
        <br />
        <label className="form-label">
          Años de Vida (min:8 - max:20):
          <br />
          <div className="label-container">
            <br />
            <label>Minimo: </label>
            <input
              name="años_vidaMin"
              type="text"
              className="label-form"
              onChange={onLifeExpectancyInputChange}
              value={newName.años_vidaMin}
            />
          </div>
          <div className="label-container">
            <label>Maximo: </label>
            <input
              name="años_vidaMax"
              type="text"
              className="label-form"
              onChange={onLifeExpectancyInputChange}
              value={newName.años_vidaMax}
            />
          </div>
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
