import React, { useRef, useState } from "react";
import "./recom.css";
const Recom = () => {
  const key = "020d191d43be09bb79c4349744904d41";
  const resultRef = useRef(null);
  const btnRef = useRef(null);

  const onSearchChange = (event) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${event.target.value}&appid=${key}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        resultRef.current.innerHTML = `
          <div class="meteo">
            <h1>${event.target.value}</h1>  
            <h2>${data.weather[0].description}</h2>
            <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="weather icon"></img>
            <h1>${data.main.temp} °C</h1>
            <h3>min : ${data.main.temp_min}</h3>
            <h3>max : ${data.main.temp_max}</h3>
          </div>
        `;
        btnRef.current.innerHTML = ` <button className="getr">Get Recommandation</button>`;
      })
      .catch(() => {
        resultRef.current.innerHTML = `<h2>City not found </h2>`;
      });
  };

  return (
    <div className="page">
      <div className="weather">
        <input
          className="getw"
          type="text"
          placeholder="enter your city here"
          onChange={onSearchChange}
        />
        <div ref={resultRef}></div>
      </div>
      <div className="recom">
        <div ref={btnRef}></div>
      </div>
    </div>
  );
};

export default Recom;
