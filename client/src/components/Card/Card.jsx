import { Link } from "react-router-dom";
import style from "./Card.module.css";
import { useSelector } from "react-redux";

const Card = ({ videogame }) => {
 
  const Url = useSelector((state) => state.URL);
  console.log(Url)
  const { id, name, genres, image } = videogame;
  console.log(videogame)
  return (
    <div key={id}>
      <main>
        <div className={style.card}>
          {isNaN(id) ? (
            <img src={Url+image} width="100" height="auto" alt="db" />
          ) : (
            <img src={image} width="100" height="auto" alt="api" />
          )}
          <div>
            <h2>{name}</h2>
            <span>
              {genres.map((data, key) => {
                return (
                  <div key={key}>
                    {data.name} <br></br>
                  </div>
                );
              })}
            </span>
            <Link to={`/detail/${id}`}>
              <div className={style.button}>Detalle</div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Card;
