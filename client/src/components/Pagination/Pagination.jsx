import style from "./pagination.module.css";
import { Link } from "react-router-dom";

const Pagination = ({ maxPageGames, allGames, pagination, setCurrentPage, currentPage }) => {
  const pageNumbers = [];
  const lastPage = Math.ceil(allGames / maxPageGames);

  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={style.pagination}>
  {currentPage > 1 && (
    <Link className={style.link} onClick={() => setCurrentPage(currentPage - 1)}>Anterior</Link>
  )}
  {pageNumbers.map((numberPage) => {
    return (
      <Link
        key={numberPage}
        onClick={() => setCurrentPage(numberPage)}
        className={currentPage === numberPage ? style.active : style.link}
      >
        {numberPage}
      </Link>
    );
  })}
  {currentPage < lastPage && (
    <Link className={style.link} onClick={() => setCurrentPage(currentPage + 1)}>Siguiente</Link>
  )}
</div>

  );
};

export default Pagination;