import { Link } from "react-router-dom";
import style from "./Card.module.css";
import { useSelector } from "react-redux";

const Card = ({ videogame }) => {
  const Url = useSelector((state) => state.URL);
  console.log(Url);
  const { id, name, genres, image } = videogame;
  return (
    <div key={id}>
      <main className={style.container}>
        <div className={style.containerCard}>
          {isNaN(id) ? (
            <Link to={`/detail/${id}`}>
              <img src={Url + image} width="150" height="auto" alt="Img from DataBase" />
            </Link>
          ) : (
            <Link to={`/detail/${id}`}>
              <img src={image} width="150" height="auto" alt="Img from API" />
            </Link>
          )}
          <div>
            <h2 className={style.nameGame}>{name}</h2>
            <span className={style.nameGenres}>
              {genres.map((data, key) => {
                return (
                  <div key={key} className={style.titleGenres}>
                    {data.name} 
                  </div>
                );
              })}
            </span>
            {/* <Link to={`/detail/${id}`}>
              <div className={style.button}>Detalle</div>
            </Link> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Card;
