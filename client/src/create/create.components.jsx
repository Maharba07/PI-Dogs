import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getTemperaments } from "../redux/action/actions";
import "./create.styles.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Create = () => {
  // const expresionRegular = /^[a-zA-Z ]+$/;
  // const expresionRegularN = /^[0-9]+$/;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const temperamento = useSelector((state) => state.temperaments);
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);
  const formInitialState = {
    name: "",
    imagen: "",
    //altura: "",
    //peso: "",
    años_vida: "",
    temperamento: [],
  };
  const errorInitialState = {
    name: "Ingrese un nombre valido, sin numeros y no debe de ser mayor de 40 caracteres",
    //altura: "La altura no debe contener letras",
    //peso: "El peso no debe contener letras",
    temperamento: "Al menos debe tener 1 temperamento",
  };

  const [disabled, setDisabled] = useState(false);
  const [newName, setNewName] = useState(formInitialState);
  const [inputError, setInputError] = useState(errorInitialState);

  const onTextInputChange = (event) => {
    const { name, value } = event.target;
    if (value.length > 0 && value.length < 40) {
      delete inputError.name;
    } else {
      setInputError({
        ...inputError,
        name: "Ingrese un nombre valido, sin numeros y no debe de ser mayor de 40 caracteres",
      });
    }
    console.log("onTextInputChange:", inputError);
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
      console.log("onTemperamentSelectChange:", inputError);
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
    console.log("onDeleteTemperament:", inputError);
    setNewName({
      ...newName,
      temperamento: newTemperamento,
    });
  };
  const onSubmitName = async (event) => {
    event.preventDefault();
    console.log("Datos a insertar:", newName);
    if (!newName.name) {
      alert.error("Todos los campos requeridos deben ser completados.");
      return;
    }
    try {
     const response = await axios.post("http://localhost:3001/dogs/", newName);
      console.log("Respuesta de la solicitud:", response.data);
      setNewName(formInitialState);
      setInputError(errorInitialState);
      navigate("/home");
    } catch (error) {
      console.error("Error al enviar la solicitud:", error.response);
    }
  };

  useEffect(() => {
    console.log("UseEffect:", inputError);
    Object.keys(inputError).length > 0 ? setDisabled(true) : setDisabled(false);
  }, [newName, inputError]);

  return (
    <div className="create-container">
      <form className="form-container" onSubmit={onSubmitName}>
        <label>
          Nuevo Nombre
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
        <label>
          URL de la Imagen
          <input
            name="imagen"
            type="text"
            className="label-form"
            onChange={onTextInputChange}
            value={newName.imagen}
          />
        </label>
        <label>
          Temperamentos
          <select
            name="temperamento"
            className="label-form"
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
        <input className="boton-submit" type="submit" disabled={disabled} />
      </form>
      <Link to="/home/">
        <button className="return-button">Return</button>
      </Link>
    </div>
  );
};

export default Create;
