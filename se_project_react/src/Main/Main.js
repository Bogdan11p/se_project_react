import { defaultClothingItems } from "../util/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import React from "react";

function Main({ weatherTemp, onSelectCard }) {
  const weatherType = React.useMemo(() => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else if (weatherTemp <= 65) {
      return "cold";
    }
  }, [weatherTemp]);

  console.log(weatherType);

  const filteredCards = defaultClothingItems.filter((x) => {
    console.log(x);
    return x.weather.toLowerCase() === weatherType;
  });

  console.log(filteredCards);

  return (
    <main className="main">
      <WeatherCard day={false} type="cloudyn" weatherTemp={weatherTemp} />
      <section id="card-section" className="card_section">
        Today is {weatherTemp} ℉ / You may want to wear:
        <div id="card-items" className="card_items">
          {filteredCards.map((x) => (
            <ItemCard x={x} onSelectCard={onSelectCard} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
