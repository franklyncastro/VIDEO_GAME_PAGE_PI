import React from 'react'
import img from '../../img/img-2-play.jpg'
import style from "./Landing.module.css"


export const Landing = () => {
  return (
    <div>
      <h1>Welcome to World Game</h1>
      <img src={img} alt="img not found" className={style.imgLanding}/>
    </div>
  )
}


