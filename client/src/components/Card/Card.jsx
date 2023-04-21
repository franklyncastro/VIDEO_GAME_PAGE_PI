import React from "react";
import styles from "./styles/card.module.css";
import { Link } from "react-router-dom";

export const Card = ({ id, image, name, genres }) => {
  return (
    <div className={styles.cardcontainer}>
      <Link to={`/videogames/${id}`}>
        <div className={styles.cardimage}>
          <div className={styles.divimg}>
            <img className={styles.img} src={image} alt={name} />
          </div>
          <div className={styles.cardinfo}>
            <p className={styles.cardname}>{name}</p>
            <div className={styles.genres}>
              {genres.map((g) => (
                <li>{g.name}</li>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
