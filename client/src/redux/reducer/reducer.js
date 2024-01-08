import {
  GET_DOGS,
  GET_BY_NAME,
  GET_TEMPERAMENTS,
  CREATE_DOG,
  // GET_CREATED,
} from "../action/actions";

let initialState = { allDogs: [], dogsCopy: [], temperaments: [], createdDog:[], };

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        allDogs: action.payload,
        dogsCopy: action.payload,
      };
      case GET_BY_NAME:
        console.log("Action GET_BY_NAME dispatched with payload:", action.payload);
        console.log("Current state:", state);
        return {
          ...state,
          createdDog: [...state.createdDog, ...action.payload],
        };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case CREATE_DOG:
      if (action.payload) {
        const newDog = action.payload;
        console.log("New dog added to state:", newDog);
        return {
          ...state,
          allDogs: [...state.allDogs, newDog],
          createdDog: [...state.createdDog, newDog],
        };
      } else {
        return {
          ...state,
          errorMessage: "Error Creating Dog",
        };
      }

  //     case GET_CREATED:
  // return {
  //   ...state,
  //   createdDog: [...state.createdDog, ...action.payload],
  // };

    default:
      return state;
  }
}

export default rootReducer;
