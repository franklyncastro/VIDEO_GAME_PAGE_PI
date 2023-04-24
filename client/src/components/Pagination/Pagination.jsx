import style from './pagination.module.css'
import {Link} from 'react-router-dom'


const Pagination = ({maxGamePage, allGames, pagination}) =>
    {
        const pageNumbers = [];
        for (let i=1; i <= Math.ceil(allGames / maxGamePage); i++)
        {
            pageNumbers.push(i);
        }
        return(
            <div className={style.pagination} >
                 {
                    pageNumbers.map(numero =>{
                       return(
                        <div key={numero}>
                            {/* <a  onClick={()=> pagination(numero)} href="#">{numero}</a> */}
                            <Link to="#">{numero}</Link>
                            </div>
                       )
                    })
                 }
                
             </div>    )}

export default Pagination;