import React from "react";
import style from "./style.module.css";

function result({ title, url, image, calorie, ingredients }) {
  return (
    <div className={style.result}>
      <h3>{title}</h3>
      <h5>calories: {calorie}</h5>
      <ul>
        {ingredients.map(ingredient => (
          <li key={ingredient.weight}>{ingredient.text}</li>
        ))}
      </ul>
      <a href="{url}" className={style.url}>
        {url}
      </a>
      <br />
      <img src={image} className={style.image} alt="" />
      <br />
    </div>
  );
}

export default result;
