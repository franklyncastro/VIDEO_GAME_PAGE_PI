import { GET_ALL_GAMES } from "./actions-types";

const initialState = {
  videogames: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GAMES:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
