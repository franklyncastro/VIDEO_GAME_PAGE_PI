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



const filterGenre = (arr, action) => {
  let search = arr.map((data) => {
    let result = data.genres.filter((genre) => genre.name === action);

    let obj = {
      name: data.name,
      image: data.image,
      id: data.id,
      genres: result,
    };
    return obj;
  });

  return search.filter((clear) => clear.genres?.length > 0);
};

const filter = (state) => {
  state.rta = state.allGames; // reset
  let filter = [];
  console.log("reset");
  if (state.filter_type.length > 0) {
    console.log("filter type");
    if (state.filter_type === "api") {
      console.log("filter api");
      filter = state.rta.filter((data) => !isNaN(data.id));
    } else {
      console.log("Db filter");
      filter = state.rta.filter((data) => isNaN(data.id));
    }
  }

  if (state.filter_genre.length > 0 && filter.length === 0) {
    filter = filterGenre(state.rta, state.filter_genre);
  }
  if (state.filter_genre.length > 0 && filter.length > 0) {
    filter = filterGenre(filter, state.filter_genre);
  }

  return filter;
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_ALL_GAMES:
      return {
        ...state,
        loading: false,
        allGames: actions.payload,
        rta: actions.payload,
      };
    case GET_ALLGAMES_NAME:
      return {
        ...state,
        rta: actions.payload,
      };
    case GET_DETAIL_GAMES:
      return {
        ...state,
        loading: false,
        rta: [],
        filter_type: "",
        filter_genre: "",
        detail: actions.payload,
      };

    case LOAD_GENRES:
      return {
        ...state,
        genres: actions.payload,
        filtered_genres: actions.payload,
      };

    case FILTER_TYPE: {
      state.filter_type = actions.payload;
      let filters = filter(state, actions);
      return {
        ...state,
        rta: filters,
      };
    }

    case FILTER_GENRES:
      state.filter_genre = actions.payload;
      let filters = filter(state, actions);
      return {
        ...state,
        rta: filters,
      };
    case ORDER_GAMES: {
      const order = [...state.rta];

      if (actions.payload === "Ascendente") {
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
      return {
        ...state,
      };
  }
};

export default reducer;
