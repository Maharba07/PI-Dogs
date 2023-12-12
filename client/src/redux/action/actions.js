import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const CREATE_DOG = "CREATE_DOG";
export const GET_CREATED = "GET_CREATED";

export function getDogs() {
  return async function (dispatch) {
    const response = await axios.get("https://api.thedogapi.com/v1/breeds/");
    return dispatch({ type: "GET_DOGS", payload: response.data });
  };
}
export function getDogByName(name) {
  return async function (dispatch) {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds/?name=${name}`
    );
    return dispatch({ type: "GET_BY_NAME", payload: response.data });
  };
}
export function getTemperaments() {
  return async function (dispatch) {
    const response = await axios.get("https://api.thedogapi.com/v1/breeds/");
    const temperaments = response.data.map((breed) => breed.temperament);
    return dispatch({ type: "GET_TEMPERAMENTS", payload: temperaments });
  };
}
export function createDogsDB(newName) {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/dogs/", newName);
      dispatch({
        type: CREATE_DOG,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      throw error; 
    }
  };
}


export function getCreated() {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/dogs/");
    return dispatch({ type: "GET_CREATED", payload: response.data });
  };
}

