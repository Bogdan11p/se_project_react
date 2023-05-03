import { defaultClothingItems } from "../util/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherTemp }) {
  return (
    <main className="main">
      <WeatherCard day={false} type="cloudyn" weatherTemp={weatherTemp} />
      <section id="card-section" className="card_section">
        Today is {weatherTemp} F / You may want to wear:
        <div id="card-items" className="card_items">
          {defaultClothingItems.map((x) => (
            <ItemCard x={x} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
