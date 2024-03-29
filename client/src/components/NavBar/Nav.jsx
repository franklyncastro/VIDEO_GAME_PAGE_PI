import React from "react";
import style from "./Nav.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Nav = () => {
  let Loading = useSelector((state)=> state.loading);

  return (
    
    <div className={style.container}>
      { Loading ? ''  :
        <div className={style.container_Link}>
        <Link to="/videogames" className={style.linkBtn}>Inicio</Link>|
        <Link to="/about" className={style.linkBtn}>Sobre Mi</Link>|
        <Link to="/form" className={style.linkBtn}>Crear Video Juego</Link>|
        <Link to="/contact" className={style.linkBtn}>Contact</Link>|
        <Link to="/" className={style.linkBtn}>Exit</Link>|
      </div>
      
      }
    </div>
  );
};
