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

const initialState = {
  allGames: [],
  genres: [],
  detail: {},
  loading: false,
  rta: [],
  filter_type: "",
  filter_genre: "",
  URL: 'http://localhost:3001/videogames'
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GAMES:
      return {
        ...state,
        loading: false,
        allGames: action.payload,
        rta: action.payload,
      };
    case GET_ALLGAMES_NAME:
      return {
        ...state,
        rta: action.payload,
      };
      
    case GET_DETAIL_GAMES:
      return {
        ...state,
        loading: false,
        rta: [],
        filter_type: "",
        filter_genre: "",
        detail: action.payload,
      };


    case LOAD_GENRES:
      return {
        ...state,
        genres: action.payload,
        filtered_genres: action.payload,
      };

    case FILTER_TYPE: {
      const filter_type = action.payload;
      const filters = filter(state, filter_type, state.filter_genre);
      return {
        ...state,
        rta: filters,
        filter_type,
      };
    }

    case FILTER_GENRES: {
      const filter_genre = action.payload;
      const filters = filter(state, state.filter_type, filter_genre);
      return {
        ...state,
        rta: filters,
        filter_genre,
      };
    }

    case ORDER_GAMES: {
      const order = [...state.rta];

      if (action.payload === "Ascendente") {
        order.sort((a,b)=> a.id - b.id)
      } else if(action.payload === "Descendente") {
        order.sort((a,b)=> b.id - a.id)
      }

      return {
        ...state,
        rta: order,
      };
    }


    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAN_RTA:
      return {
        ...state,
        rta: [],
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        detail: {},
      };
    case CLEAN_FILTER:
      return {
        ...state,
        filter_type: "",
        filter_genre: "",
      };
    case RESET_FILTER:
      return {
        ...state,
        filter_type: "",
        filter_genre: "",
        rta: state.allGames,
      };
    default:
      return state;
  }
};

export default reducer;

// Helpers

const filterGenre = (arr, genre) => {
  return arr
    .map((data) => ({
      ...data,
      genres: data.genres.filter((g) => g.name === genre),
    }))
    .filter((data) => data.genres.length > 0);
};

const filter = (state, filter_type, filter_genre) => {
  let filters = [...state.allGames];

  filters = filter_type === "api" ? filters.filter((data) => !isNaN(data.id)) : filters.filter((data) => isNaN(data.id));

  filters = filter_genre ? filterGenre(filters, filter_genre) : filters;

  return filters;
};
