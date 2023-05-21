import "../blocks/WeatherCard.css";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import { temperature } from "../utils/WeatherApi";
import React, { useContext } from "react";

const weatherOptions = [
  {
    url: require("../images/day/sunny-day.svg").default,
    day: true,
    type: "sunnyd",
  },
  {
    url: require("../images/day/cloudy-day.svg").default,
    day: true,
    type: "cloudyd",
  },
  {
    url: require("../images/day/fog-day.svg").default,
    day: true,
    type: "fogd",
  },
  {
    url: require("../images/day/rain-day.svg").default,
    day: true,
    type: "raind",
  },
  {
    url: require("../images/day/snow-day.svg").default,
    day: true,
    type: "snowd",
  },
  {
    url: require("../images/day/storm-day.svg").default,
    day: true,
    type: "stormd",
  },
  {
    url: require("../images/night/cloudy-night.svg").default,
    day: false,
    type: "cloudyn",
  },
  {
    url: require("../images/night/sunny-night.svg").default,
    day: false,
    type: "sunnyn",
  },
  {
    url: require("../images/night/storm-night.svg").default,
    day: false,
    type: "stormn",
  },
  {
    url: require("../images/night/snow-night.svg").default,
    day: false,
    type: "snown",
  },
  {
    url: require("../images/night/rain-night.svg").default,
    day: false,
    type: "rainn",
  },
  {
    url: require("../images/night/fog-night.svg").default,
    day: false,
    type: "fogn",
  },
];

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
