import React from "react";
import style from "./Form.module.css";

export const Form = () => {

  
  return (
    <div className={style.containerForm}>
      <h1>Create Video Game</h1>
      <form className={style.containerInputsForm}>
        Name <input placeholder="Name" type="text" name="name"></input>
        Summary <input placeholder="Summary" type="text" name="summary"></input>
        Realease <input placeholder="Realease" type="date" name="released"></input>
        Rating <input placeholder="Rating" type="number" name="rating"></input>
        Platforms
        <select name="platforms">
          <option disabled selected>
            Choose platforms
          </option>
          <option> option 1</option>
          <option> option 2</option>
          <option> option 3</option>
        </select>
      </form>
    </div>
  );
};
