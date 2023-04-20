import { GET_ALL_GAMES } from "./actions-types";

export const getAllVideogames = () => {
  return async (dispatch) => {
    try {
      await fetch("http://localhost:3002/videogames")
        .then((res) => res.json())
        .then((payload) => {
          dispatch({ type: GET_ALL_GAMES, payload });
        });
    } catch (error) {
      console.log(error);
    }
  };
};
