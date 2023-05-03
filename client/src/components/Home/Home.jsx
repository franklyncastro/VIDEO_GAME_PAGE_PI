import Cards from "../Cards/Cards";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import {
  GetAllGames,
  ShowLoading,
  CleanFilterGames,
  CleanRta,
  LoadGenres,
} from "../../redux/actions";

import Loading from "../../components/Loading/Loading";
import Pagination from "../Pagination/Pagination";
import style from "./Home.module.css";

export const Home = () => {
  let location = useLocation();

  const dispatch = useDispatch();
  let allGames = useSelector((state) => state.rta);
  let showLoading = useSelector((state) => state.loading);

  //Estado Paginado
  const [currentPage, setCurrentPage] = useState(1);
  //Cantidad de juegos que se mostra por pagina
  const maxPageGames = 8;

  //Al montar el componente se ejecutan las siguientes acciones de Redux
  useEffect(() => {
    dispatch(ShowLoading());//Mostrar el Loading mientras se cargan los juegos
    dispatch(GetAllGames());//Mostrar todos los Juegos
    dispatch(LoadGenres());//Cargar los Generos
    return () => {
      dispatch(CleanRta());
      dispatch(CleanFilterGames());
    };
  }, [dispatch]);

  const startLasGame = currentPage * maxPageGames;
  const startFirstGame = startLasGame - maxPageGames;
  const CurrentGames = allGames?.slice(startFirstGame, startLasGame);

  const pagination = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={style.container}>
      {showLoading ? (
        <Loading />
      ) : (
        <div>
        {
        location.pathname.includes('videogames') 
        ? <div>  <SearchBar /> </div> 
        : <div>  </div>
        }
          <Pagination
            maxPageGames={maxPageGames}
            allGames={allGames?.length}
            pagination={pagination}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />

          <Cards allGames={CurrentGames} />

          <Pagination
            maxPageGames={maxPageGames}
            allGames={allGames?.length}
            pagination={pagination}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};
