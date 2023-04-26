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
  genres: [], // Fixed typo in Adventure
  detail: {},
  loading: false,
  rta: [],
  filter_type: "",
  filter_genre: null,
  URL: "http://localhost:3001/videogames",
};

// Moved filter_Genres function to top of file
const filter_Genres = (arr, action) => {
  let search = arr.map((data) => {
    let confirmGenre = data.genres.filter((genre) => genre.name === action);
    let obj = {
      name: data.name,
      image: data.image,
      id: data.id,
      genres: confirmGenre,
    };
    return (obj);
  });

  return search.filter((clear) => clear.genres.length > 0);
};

const Filter = (state, actions) => {
  state.rta = state.allGames;
  let filter = [];

  if (state.filter_type.length > 0) {
    console.log("Filtrando por tipo");
    if (state.filter_type === "api") {
      console.log("Filtrando por tipo: api");
      filter = state.rta.filter((dato) => !isNaN(dato.id));
    } else {
      console.log("Filtrando por tipo: db");
      filter = state.rta.filter((dato) => isNaN(dato.id));
    }
  }

  if (
    state.filter_genre &&
    state.filter_genre.length > 0 &&
    filter.length === 0
  ) {
    console.log("Filtrando por género");
    filter = filter_Genres(state.rta, state.filter_genre);
  }

  if (
    state.filter_genre &&
    state.filter_genre.length > 0 &&
    filter.length > 0
  ) {
    console.log("Filtrando por género compuesto");
    filter = filter_Genres(filter, state.filter_genre);
  }

  return filter;
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
        filter_genre: null, // Fixed to use null instead of empty string
        detail: action.payload,
      };

    case LOAD_GENRES:
      return {
        ...state,
        genres: action.payload,
        filtered_genres: action.payload,
      };

    
      case FILTER_TYPE:{
        state.filter_type=action.payload
        let filtered = Filter(state,action)
        return{
            ...state,
            rta: filtered,
        }
    }//
      

    case FILTER_GENRES:
            state.filter_genre = action.payload
            let filtered = Filter(state,action)
            return{
                ...state,
                rta:filtered,
            }

    case ORDER_GAMES: {
      const order = [...state.rta];
      if (action.payload === "Ascendente") {
        order.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        order.sort((a, b) => b.name.localeCompare(a.name));
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
        filter_genre: null, // Fixed to use null instead of empty string
      };

    case RESET_FILTER:
      return {
        ...state,
        filter_type: "",
        filter_genre: null, // Fixed to use null instead of empty string
        rta: state.allGames,
      };

    default:
      return state;
  }
};

export default reducer
