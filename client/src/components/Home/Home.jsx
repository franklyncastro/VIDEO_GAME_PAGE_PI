import React from 'react'
import style from './Home.module.css'
import img from "../../img/img-1-play.jpg"

export const Home = () => {
  return (
    <div>
      <img src={img} alt="img not found" className={style.img} />
    </div>
    
  )
}
