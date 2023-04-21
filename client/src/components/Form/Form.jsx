import React from "react";
import style from "./Form.module.css";

export const Form = () => {
  return (
    <div className={style.container}>
      <form className={style.containerForm}>
        <h1>Create Video Game</h1>
        <div className={style.containerInputs}>
          <span className={style.span}>Name</span>
          <input
            placeholder="Name"
            type="text"
            name="name"
            className={style.inputs}
          ></input>
          <span className={style.span}>Summary</span>
          <input
            placeholder="Summary"
            type="text"
            name="summary"
            className={style.inputs}
          ></input>
          <span className={style.span}>Realease</span>
          <input
            placeholder="Realease"
            type="date"
            name="released"
            className={style.inputs}
          ></input>
          <span className={style.span}>Rating</span>
          <input
            placeholder="Rating"
            type="number"
            name="rating"
            className={style.inputs}
          ></input>
          <span className={style.span}>Description</span>
          <textarea
            name="description"
            placeholder="Description"
            rows="5"
            className={style.inputs}
          ></textarea>
          <span className={style.span}>Genre</span>
          <select
            name="genre"
            className={`${style.inputs} ${style.textarea}`}
          >
            <option disabled selected>
              Select Genre
            </option>
            <option> Action</option>
            <option> Adventure</option>
            <option> Shooter</option>
          </select>
          <span className={style.span}>Platforms</span>
          <select
            name="platforms"
            className={`${style.inputs} ${style.textarea}`}
          >
            <option disabled selected>
              Select platforms
            </option>
            <option> PS4 </option>
            <option> PS5 2</option>
            <option> Xbox One 3</option>
            <option> PC</option>
          </select>
          <button className={style.formBtn}>SEND</button>
        </div>
      </form>
    </div>
  );
};
