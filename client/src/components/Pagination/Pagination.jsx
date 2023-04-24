import style from "./pagination.module.css";
import { Link } from "react-router-dom";

const Pagination = ({ maxGamePage, allGames, pagination }) => {
  const pageNumbers = [];
  const firstPage = 1;
  const lastPage = Math.ceil(allGames / maxGamePage);
  const isOnFirstPage = pagination === 1;
  const isOnLastPage = pagination === lastPage;

  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={style.pagination}>
      {!isOnFirstPage && (
        <div>
          <Link to="#" onClick={() => pagination(firstPage)} className={style.link}>
            {"<<"}
          </Link>
        </div>
      )}
      {pageNumbers.map((numberPage) => {
        return (
          <div key={numberPage}>
            <Link to="#" onClick={() => pagination(numberPage)} className={style.link}>
              {numberPage}
            </Link>
          </div>
        );
      })}
      {!isOnLastPage && (
        <div>
          <Link to="#" onClick={() => pagination(lastPage)} className={style.link}>
            {">>"}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Pagination;
