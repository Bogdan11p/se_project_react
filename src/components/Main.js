import { defaultClothingItems } from "../utils/constants";
import WeatherCard from "../components/WeatherCard";
import ItemCard from "../components/ItemCard";
import React, { useMemo, useContext } from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import { temperature } from "../utils/WeatherApi";
import "../blocks/Main.css";

function Main({ weatherTemp, onSelectCard }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const weatherType = useMemo(() => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else if (weatherTemp <= 65) {
      return "cold";
    }
  }, [weatherTemp]);

  const currentTemp = temperature(weatherTemp);
  const currentTempString = currentTemp[currentTemperatureUnit];

  const filteredCards = defaultClothingItems.filter((x) => {
    return x.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={false} type="cloudyn" weatherTemp={weatherTemp} />
      <section id="card-section" className="card_section">
        <p className="main_text">
          Today is {currentTempString} / You may want to wear:
        </p>
        <div id="card-items" className="card_items">
          {filteredCards.map((x) => (
            <ItemCard
              x={x}
              onSelectCard={onSelectCard}
              key={x._id || x.id}
              name={x.name}
              weather={x.weather}
              id={x.id}
              link={x.link}
              _id={undefined}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
