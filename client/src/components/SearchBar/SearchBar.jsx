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
  const [select, setSelect] = useState({
    selectType: "filter",
    selectFilter: "filter",
    selectOrder: "filter",
  });

  const allGenres = useSelector((state) => state.genres);

  

  const HandleSubmit = (e) => {
    e.preventDefault();
    const value = name.name;
    if (value.length > 0) {
      dispatch(getAllGames(value));
    } else {
      alert("Ingresa un valor en el campo de búsqueda");
    }
    setName({ name: "" });
    setName((prevName) => ({ ...prevName, name: "" }));
  };
  
  

  const HandleChangeForm = (e) => {
    setName({
      ...name,
      [e.target.name]: e.target.value,
    });
  };

  const HandleChangeType = (e) => {
    setSelect({
      ...select,
      [e.target.name]: e.target.value,
    });
    dispatch(FilterByType(e.target.value));
  };

  const HandleChangeOrder = (e) => {
    setSelect({
      ...select,
      [e.target.name]: e.target.value,
    });
    dispatch(OrderGames(e.target.value));
  };

  const HandleChangeGenre = (e) => {
    setSelect({
      ...select,
      [e.target.name]: e.target.value,
    });
    dispatch(FilterByGenres(e.target.value));
    console.log(`FilterByGenres ${FilterByGenres}`)
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
    <div className={style.container}>
      <div className={style.containerInputs}>
        <select
          name="selectType"
          value={select.selectType}
          onChange={HandleChangeType}
          className={style.selects}
        >
          <option value="filter" disabled="disabled">
            Filtrar Tipo
          </option>
          <option value="api">API</option>
          <option value="db">DB</option>
        </select>

        <select
          name="selectFilter"
          value={select.selectFilter}
          onChange={HandleChangeGenre}
          className={style.selects}
        >
          <option value="filter" disabled="disabled">
            Filtrar Genero
          </option>
          <Genres  allGenres={allGenres}/>
        </select>

        <select
          name="selectOrder"
          value={select.selectOrder}
          onChange={HandleChangeOrder}
          className={style.selects}
        >
          <option value="filter" disabled="disabled">
            Ordenar
          </option>
          <option value="Ascendente">A-Z</option>
          <option value="Descendente">Z-A</option>
        </select>
      </div>
      <form onSubmit={HandleSubmit} className={style.form}>
        <input
          placeholder="Buscar"
          name="name"
          value={name.name}
          onChange={HandleChangeForm}
          type="text"
          className={style.search}
        />
        <button type="submit" className={style.btn}>
          Buscar
        </button>
      </form>
      <button className={style.btn} onClick={HandleClear}>
        Limpiar Filtro
      </button>
    </div>
  );
};

export default SearchBar;
