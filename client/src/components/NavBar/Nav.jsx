import React from "react";
import style from "./Nav.module.css";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";

export const Nav = () => {
  let Loading = useSelector((state)=> state.loading);
  // let location = useLocation();

  return (
    
    <div className={style.container}>
      { Loading ? ''  :
        <div className={style.container_Link}>
        <Link to="/videogames" className={style.linkBtn}>Inicio</Link>
        <Link to="/about" className={style.linkBtn}>Sobre Mi</Link>
        <Link to="/form" className={style.linkBtn}>Crear Video Juego</Link>
        <Link to="/contact" className={style.linkBtn}>Contact</Link>
        <Link to="/" className={style.linkBtn}>Exit</Link>

        {/* {
        location.pathname.includes('videogames') 
        ? <div>  <SearchBar /> </div> 
        : <div>  </div>
        } */}
      </div>
      
      }
    </div>
  );
};
