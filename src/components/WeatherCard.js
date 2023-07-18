import "../blocks/WeatherCard.css";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import { temperature } from "../utils/WeatherApi";
import React, { useContext } from "react";
import { weatherOptions } from "../utils/constants";

const WeatherCard = ({ day = true, type = "sunny", weatherTemp = "" }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const imageSrc = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });
  const currentTemp = temperature(weatherTemp);
  const currentTempString = currentTemp[currentTemperatureUnit];
  const imageSrcUrl = imageSrc[0].url || "";

  return (
    <section className="weather" id="weather">
      <div className="weather-info">{currentTempString}</div>

      <img className="weather_image" src={imageSrcUrl} alt={type} />
    </section>
  );
};

export default WeatherCard;
