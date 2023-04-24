import {
  GET_ALL_GAMES,
  GET_ALLGAMES_NAME,
  GET_DETAIL_GAMES,
  CLEAN_DETAIL,
  LOAD_GENRES,
  LOADING,
  ORDER_GAMES,
  FILTER_TYPE,
  FILTER_GENRES,
  CLEAN_FILTER,
  RESET_FILTER,
  CLEAN_RTA,
} from "./actions-types";
const axios = require("axios");

export const GetAllGames = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("videogames");
      return dispatch({
        type: GET_ALL_GAMES,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const showGameDetail = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`videogames/${id}`);
      return dispatch({
        type: GET_DETAIL_GAMES,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getAllGames = (value) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`videogames/name?name=${value}`);
      return dispatch({
        type: GET_ALLGAMES_NAME,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const FilterByType = (value) => {
  return (dispatch) => {
    return dispatch({
      type: FILTER_TYPE,
      payload: value,
    });
  };
}; 

export const FilterByGenres = (value) => {
  return (dispatch) => {
    return dispatch({
      type: FILTER_GENRES,
      payload: value,
    });
  };
}; 
export const OrderGames = (value) => {
  return (dispatch) => {
    return dispatch({
      type: ORDER_GAMES,
      payload: value,
    });
  };
};

export const LoadGenres = () => {
 
  return async (dispatch) => {
    try {
      const res = await axios.get("genres/load/");
      return dispatch({
        type: LOAD_GENRES,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}; 

export const ShowLoading = () => {
  return (dispatch) => {
    return dispatch({
      type: LOADING,
    });
  };
};

export const CleanFilterGames = () => {

  return (dispatch) => {
    return dispatch({
      type: CLEAN_FILTER,
    });
  };
};

export const ResetFilterGames = () => {
 
  return (dispatch) => {
    return dispatch({
      type: RESET_FILTER,
    });
  };
};

export const CleanDetail = () => {
  return (dispatch) => {
    return dispatch({
      type: CLEAN_DETAIL,
    });
  };
};

export const CleanRta = () => {
  return (dispatch) => {
    return dispatch({
      type: CLEAN_RTA,
    });
  };
};
