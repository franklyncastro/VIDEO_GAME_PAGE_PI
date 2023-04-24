import React from "react";
import style from "./Landing.module.css";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div className={style.container}>
      <Link to="/videogames" className={style.startButton}>
        <button className={style.startBtn}>
          <span className={style.spanStart}> START</span>
        </button>
      </Link>
    </div>
  );
};
