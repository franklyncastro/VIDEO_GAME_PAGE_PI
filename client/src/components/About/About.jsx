import React from "react";
import style from "./About.module.css";
import img from "../../img/me.jpg";
export const About = () => {
  return (
    <div className={style.container}>
      <h1>Sobre Mi</h1>
      <img src={img} alt="not found" className={style.picture} />
      <div className={style.containerText}>
        <p className={style.text}>
          ¡Hola! Soy
          <strong className={style.strong}> Franklyn Yawerlyn Castro </strong> y
          este es mi proyecto individual del Bootcamp
          <strong className={style.strong}> Soy Henry </strong>
        </p>
        <p className={style.text}>
        Para crear esta aplicación web utilicé las siguientes tecnologías:
          <br /> <br />
          <span className={style.span}>JavaScript</span>,
          <span className={style.span}>Node.js</span>,
          <span className={style.span}>React</span>,
          <span className={style.span}>Redux</span>,
          <span className={style.span}>Sequelize</span>,
          <span className={style.span}>Postgres</span> y
          <span className={style.span}> SQL</span>. He creado una aplicación web
          para mostrar títulos de videojuegos que se pueden filtrar, ordenar y
          crear juegos que se guardarán en la base de datos.
        </p>
      </div>
    </div>
  );
};
