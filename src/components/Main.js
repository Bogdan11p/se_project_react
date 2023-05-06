import { defaultClothingItems } from "../utils/constants";
import WeatherCard from "../components/WeatherCard";
import ItemCard from "../components/ItemCard";
import React from "react";
import "../blocks/Main.css";

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

  const filteredCards = defaultClothingItems.filter((x) => {
    return x.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={false} type="cloudyn" weatherTemp={weatherTemp} />
      <section id="card-section" className="card_section">
        <p className="main_text">
          Today is {weatherTemp} ℉ / You may want to wear:
        </p>
        <div id="card-items" className="card_items">
          {filteredCards.map((x) => (
            <ItemCard
              x={x}
              onSelectCard={onSelectCard}
              key={x._id}
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
