import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_BY_NAME = "GET_BY_NAME";

export function getDogs() {
  return async function (dispatch) {
    const response = await axios.get("https://api.thedogapi.com/v1/breeds/");
    return dispatch({ type: "GET_DOGS", payload: response.data });
  };
}
export function getDogByName(name) {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3000/?name=${name}`);
    console.log(response.data);
    return dispatch({ type: "GET_BY_NAME", payload: response.data });
  };
}