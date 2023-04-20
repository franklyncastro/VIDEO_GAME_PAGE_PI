import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import thunkMidleware from "redux-thunk";

//esta linea es para coenctar con la extension del navegador REDUX DEVTOOLS
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

const store = createStore(
  reducer,
  //esta linea es para poder hacer peticiones a un server
  composeEnhancer(applyMiddleware(thunkMidleware)) 
);

export default store;
