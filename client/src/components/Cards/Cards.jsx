import Card from "../Card/Card";
import style from "./Cards.module.css";

const Cards = ({ allGames }) => {
  return (
    <div className={style.container}>
      {allGames?.map((game, key) => {
        return (
          <div key={key}>
            <Card videogame={game} />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
