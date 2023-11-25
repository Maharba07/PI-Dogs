import { GET_DOGS, GET_BY_NAME } from "../action/actions";

let initialState = { allDogs: [], dogsCopy: [] };


function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        allDogs: action.payload,
        dogsCopy: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        allDogs: action.payload,
        dogsCopy: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;