import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  getAllGames,
  ResetFilterGames,
  FilterByType,
  OrderGames,
  FilterByGenres,
} from "../../redux/actions";
import Genres from "../Genres/Genre";

import style from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState({ name: "" });
  const [Select, setSelect] = useState({
    selectType: "filter",
    selectFilter: "filter",
    selectOrder: "filter",
  });

  let allGenres = useSelector((state) => state.genres);

  const HandleSubmit = (e) => {
    e.preventDefault();
    let value = name.name;
    setName({ name: "" });
    if (value.length > 0) {
      dispatch(getAllGames(value));
    } else {
      dispatch(ResetFilterGames());
    }
  };

  const HandleChangeForm = (e) => {
    setName({
      ...name,
      [e.target.name]: e.target.value,
    });
  };

  const HandleChangeType = (e) => {
    setSelect({
      ...Select,
      [e.target.name]: e.target.value,
    });
    dispatch(FilterByType(e.target.value));
    console.log(e.target.name)
  };

  const HandleChangeOrder = (e) => {
    setSelect({
      ...Select,
      [e.target.name]: e.target.value,
    });
    dispatch(OrderGames(e.target.value));
  };

  const HandleChangeGenre = (e) => {
    setSelect({
      ...Select,
      [e.target.name]: e.target.value,
    });
    dispatch(FilterByGenres(e.target.value));
  };

  const HandleClear = () => {
    setSelect({
      selectType: "filter",
      selectFilter: "filter",
      selectOrder: "filter",
    });
    dispatch(ResetFilterGames());
  };

  return (
    <div className={style.EnLinea}>
      <div className={style.Margin15}>
        <select
          name="selectType"
          value={Select.selectType}
          onChange={HandleChangeType}
        >
          <option value="filter" disabled="disabled">
            Filtrar Tipo
          </option>
          <option value="API">API</option>
          <option value="DB">DB</option>
        </select>

        <select
          name="selectFilter"
          value={Select.selectFilter}
          onChange={HandleChangeGenre}
        >
          <option value="filter" disabled="disabled">
            Filtro Genero
          </option>
          <Genres allGenres={allGenres} />
        </select>

        <select
          name="selectOrder"
          value={Select.selectOrder}
          onChange={HandleChangeOrder}
        >
          <option value="filter" disabled="disabled">
            Ordenar
          </option>
          <option value="Ascendente">Ascendente</option>
          <option value="Descendente">Descendente</option>
        </select>
      </div>
      <form onSubmit={HandleSubmit}>
        <input
          placeholder="Buscar"
          name="name"
          value={name.name}
          onChange={HandleChangeForm}
          type="text"
        />
        <button type="submit" className={style.btnSearch}>Buscar</button>
      </form>
      <button className={style.btn} onClick={HandleClear}>
        Limpiar Filtro
      </button>
    </div>
  );
};

export default SearchBar;
