import React, { useEffect, useState } from "react";
import axios from "axios";
import Platforms from "../Platforms/Platforms";
import { useSelector, useDispatch } from "react-redux";
import { LoadGenres, CleanRta, CleanFilterGames } from "../../redux/actions";
import Genres from "../Genres/Genre";
import style from "./Form.module.css";
import { validacionesForm } from "./validaciones";
import { BackValidation } from "./BackValidation";

export const Form = () => {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.genres);

  const [Rta, setRta] = useState({});
  const [Validacion, setValidacion] = useState([]);
  const [load, setLoad] = useState(false);
  const [image, setImage] = useState("");
  const [error, setError] = useState({});

  const [input, setInput] = useState({
    name: "",
    rating: "",
    description: "",
    date: "",
    platforms: "",
    searchGenres: [],
  });

  const handleChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const option = e.target.options;

    switch (name) {
      case "searchGenres": {
        const selectedValues = [];
        const options = option;
        for (let i = 0; i < options.length; i++) {
          if (options[i].selected) {
            selectedValues.push(options[i].value);
          }
        }
        setInput({
          ...input,
          searchGenres: selectedValues,
        });
        break;
      } //
      case "image": {
        setInput({
          ...input,
          [name]: value,
        });
        break;
      }
      default: {
        setInput({
          ...input,
          [name]: value,
        });
        break;
      }
    }

    setError(
      validacionesForm(
        {
          ...input,
          [name]: value,
        },
        image
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const propertyNames = Object.keys(error);
    if (!propertyNames.length > 0) {
      e.preventDefault();
      const data = new FormData();
      data.append("name", input.name);
      data.append("description", input.description);
      data.append("platforms", input.platforms);
      data.append("date", input.date);
      data.append("rating", input.rating);
      data.append("searchGenres", input.searchGenres);
      data.append("image", input.image);

      try {
        const rta = await axios.post("videogames", data).then((res) => {
          return res.data;
        });

        if (rta.length === undefined) {
          setRta(rta);
          setLoad(false);
        } else {
          setValidacion(rta);
          setLoad(true);
        }
      } catch (error) {
        console.error(error.message);
        alert(
          "Ups! algo salio mal al crear el juego, valida los datos y vuelve a intentar"
        );
      }
    }

    setInput({
      name: "",
      rating: "",
      description: "",
      date: "",
      platforms: "",
      image: '',
      searchGenres: [],
    });


  };

  useEffect(() => {
    dispatch(LoadGenres()); //Cargar generos al actualiar pagina
    return () => {
      dispatch(CleanRta());
      dispatch(CleanFilterGames());
    };
  }, [dispatch]);

  return (
    <form className={style.container} onSubmit={handleSubmit}>
      <div className={style.title}>
        <h1>Crear VideoJuego</h1>
      </div>
      {/* --------------- */}
      <div>
        <input
          type="text"
          placeholder="Nombre"
          name="name"
          className={style.inputs}
          onChange={handleChangeInput}
          value={input.name}
        />
      </div>
      <span className={style.errors}>
        {error.name && <div> {error.name}</div>}
      </span>
      {/* --------------- */}
      <div>
        <input
          type="number"
          name="rating"
          placeholder="Clasificación"
          className={style.inputs}
          onChange={handleChangeInput}
          value={input.rating}
        />
      </div>

      <span className={style.errors}>
        {error.rating && <div> {error.rating}</div>}
      </span>
      {/* --------------- */}
      <div>
        <input
          type="date"
          name="date"
          className={style.inputs}
          onChange={handleChangeInput}
          value={input.date}
        />
      </div>

      <span className={style.errors}>
        {error.date && <div> {error.date}</div>}
      </span>
      {/* --------------- */}
      <div>
        <textarea
          name="description"
          id=""
          cols="25"
          rows="4"
          placeholder="Descripción"
          className={style.inputs}
          onChange={handleChangeInput}
          value={input.description}
        ></textarea>
      </div>
      <span className={style.errors}>
        {error.description && <div> {error.description}</div>}
      </span>
      {/* --------------- */}
      <div>
        <select
          name="platforms"
          onChange={handleChangeInput}
          value={input.platforms}
          className={style.select}
        >
          <option hidden>Seleccionar plataforma</option>
          <Platforms />
        </select>
      </div>

      <span className={style.errors}>
        {error.platforms && <div> {error.platforms}</div>}
      </span>
      {/* --------------- */}
      <div>
        <select
          name="searchGenres"
          onChange={handleChangeInput}
          value={input.searchGenres}
          className={style.select}
        >
          <option hidden>Seleccionar genero</option>
          <Genres allGenres={allGenres} />
        </select>
      </div>

      <span className={style.errors}>
        {error.searchGenres && <div> {error.searchGenres}</div>}
      </span>
      {/* --------------- */}

      <div className={style.containerImg} value={input.image}>
        <label htmlFor="image">Ingrea la URL de la Imagen</label>
        <input
          type="text"
          name="image"
          className={style.url}
          onChange={handleChangeInput}
          value={input.image}
          placeholder="URL"
        />
      </div>

      <span className={style.errors}>
        {error.image && <div> {error.image}</div>}
      </span>

      <div>
        <input
          className={`${style.btn} ${style.inputs}`}
          type="submit"
          value="Crear"
        />
      </div>

      {/* Errores desde el BackEnd */}
      {load ? <BackValidation validate={Validacion} /> : ""}
      {Object.values(Rta)}
    </form>
  );
};
