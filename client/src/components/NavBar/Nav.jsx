import React from "react";
import style from "./Nav.module.css";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <div className={style.container}>
      <div className={style.container_Link}>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/Contacto">Contacto</Link>
      </div>
    </div>
  );
};
