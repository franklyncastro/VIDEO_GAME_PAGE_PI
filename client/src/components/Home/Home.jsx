import Cards from "../Cards/Cards";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  const dispatch = useDispatch();
  let allGames = useSelector((state) => state.rta);
  let showLoading = useSelector((state) => state.loading);

  const [currentPage, setCurrentPage] = useState(1);
  const maxGamePage = 18;

  useEffect(() => {
    dispatch(ShowLoading());
    dispatch(GetAllGames());
    dispatch(LoadGenres());
    return () => {
      dispatch(CleanRta());
      dispatch(CleanFilterGames());
    };
  }, [dispatch]);

  const startLasGame = currentPage * maxGamePage;
  const startFirstGame = startLasGame - maxGamePage;
  const CurrentGames = allGames?.slice(startFirstGame, startLasGame);

  const pagination = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={style.container}>
      {showLoading ? (
        <Loading />
      ) : (
        <div>
          <Pagination
            maxGamePage={maxGamePage}
            allGames={allGames?.length}
            pagination={pagination}
          />

          <Cards allGames={CurrentGames} />
          
          <Pagination
            maxGamePage={maxGamePage}
            allGames={allGames?.length}
            pagination={pagination}
          />
        </div>
      )}
    </div>
  );
};
