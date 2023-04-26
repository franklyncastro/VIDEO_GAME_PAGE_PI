import { Link, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  ShowLoading,
  showGameDetail,
  CleanRta,
  CleanDetail,
  CleanFilterGames,
} from "../../redux/actions";

import Loading from "../Loading/Loading";
import style from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const URL = useSelector((state) => state.URL);
  let showLoading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  let gameDetail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(ShowLoading());
    dispatch(showGameDetail(id));
    return () => {
      dispatch(CleanDetail());
      dispatch(CleanRta());
      dispatch(CleanFilterGames());
    };
  }, [id, dispatch]);

  return (
    <>
      {showLoading ? (
        <Loading />
      ) : (
        <main className={style.gameContainer}>
          <h1 className={style.cardTitle}>{gameDetail.name}</h1>
          <div className={style.cardsList}>
            <div className={style.cardItem}>
              <div className={style.card}>
                <div className={style.cardImage}>
                  <img
                    src={
                      isNaN(gameDetail.id)
                        ? URL + gameDetail.image
                        : gameDetail.image
                    }
                    alt={gameDetail.name}
                  />
                </div>
                <div className={style.cardContent}>
                  
                  <div className={style.cardDescription}>
                    <h2 className={style.cardSubtitle}>
                      {isNaN(gameDetail.id)
                        ? gameDetail.platforms
                        : gameDetail.platforms?.map((value) => {
                            return `${value.platform.name} | `;
                          })}
                    </h2>
                    <span>
                      {gameDetail.description
                        ?.replace(/<p>/g, "")
                        .replace(/<\/p>/g, "")
                        .replace(/<br\/>/g, "")}
                    </span>
                    <span> Date: {gameDetail.date} </span>
                    <div className={style.rating}>
                      Rating:
                      <span>
                        {isNaN(gameDetail.id)
                          ? gameDetail.rating
                          : gameDetail.rating?.map((value) => {
                              return `${value.title} | `;
                            })}
                      </span>
                    </div>
                    <div className={style.genres}>
                      <span className={style.span}>
                        Genres: {gameDetail.genres?.map((value) => {
                          return `${value.name} | `;
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            <Link to='/videogames' className={style.btn}>Volver</Link>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Detail;
