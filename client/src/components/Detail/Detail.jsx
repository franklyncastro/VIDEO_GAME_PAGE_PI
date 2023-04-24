import { useParams } from "react-router-dom";
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
        <div className={style.posicion}>
          <ul>
            <li className={style.cards_item}>
              <div className={style.card}>
                <div className={style.card_image}>
                  {
                    //
                    isNaN(gameDetail.id) ? (
                      <img src={URL + gameDetail.image} alt={gameDetail.name} />
                    ) : (
                      <img src={gameDetail.image} alt={gameDetail.name} />
                    )
                  }
                </div>
                <div className={style.card_content}>
                  <h2 className={style.card_title}>{gameDetail.name}</h2>
                  <h2 className={style.card_title2}>
                    <div>
                      {isNaN(gameDetail.id)
                        ? gameDetail.platforms
                        : gameDetail.platforms?.map((value) => {
                            return value.platform.name + " / ";
                          })}
                    </div>
                  </h2>
                  <div className={style.card_text}>
                    <p> {gameDetail.description} </p>
                    <p> date : {gameDetail.date} </p>
                    <p>
                      <div>
                        rating :
                        {isNaN(gameDetail.id)
                          ? gameDetail.rating
                          : gameDetail.rating?.map((value) => {
                              return " " + value.title + " / ";
                            })}
                      </div>
                    </p>
                    <p>
                      <div>
                        genres:
                        {isNaN(gameDetail.id)
                          ? gameDetail.genres?.map((value) => {
                              return " " + value.name + " / ";
                            })
                          : gameDetail.genres?.map((value) => {
                              return " " + value.name + " / ";
                            })}
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Detail;
