import style from "./pagination.module.css";
import { Link } from "react-router-dom";

const Pagination = ({ maxGamePage, allGames, pagination }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allGames / maxGamePage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={style.pagination}>
      {pageNumbers.map((numberPage) => {
        return (
          <div key={numberPage}>
            <Link to="#" onClick={() => pagination(numberPage)}>{numberPage}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default Pagination;
