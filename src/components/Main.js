import { defaultClothingItems } from "../utils/constants";
import WeatherCard from "../components/WeatherCard";
import ItemCard from "../components/ItemCard";
import React, { useMemo, useContext } from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { temperature } from "../utils/WeatherApi";
import "../blocks/Main.css";

function Main({
  weatherTemp,
  onSelectCard,
  onCardLike,
  clothingItems,
  isLoggedIn,
}) {
  const { currentUser } = useContext(CurrentUserContext);
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

  const filteredCards = clothingItems.filter((x) => {
    return x.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={false} type="cloudyn" weatherTemp={weatherTemp} />
      <section id="card-section" className="card__section">
        <p className="main_text">
          Today is {currentTempString} / You may want to wear:
        </p>
        <div id="card-items" className="card__items">
          {filteredCards.map((x) => {
            return (
              <ItemCard
                x={x}
                onSelectCard={onSelectCard}
                key={x._id || x.id}
                onCardLike={onCardLike}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Main;
