import { GET_ALL_GAMES } from "./actions-types";
const axios = require('axios')

export const getVideogames = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3001/videogames");
    dispatch({
      type: GET_ALL_GAMES,
      payload: response.data,
      
    });
  } catch (error) {
    console.log(error);
  }
};
