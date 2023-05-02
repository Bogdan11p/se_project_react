import "../WeatherCard/WeatherCard.css";

const weatherOptions = [
  { url: "../images/day/sunny-day.svg", day: true, type: "sunnyd" },
  { url: "../images/day/cloudy-day.svg", day: true, type: "cloudyd" },
  { url: "../images/day/fog-day.svg", day: true, type: "fogd" },
  { url: "../images/day/rain-day.svg", day: true, type: "raind" },
  { url: "../images/day/snow-day.svg", day: true, type: "snowd" },
  { url: "../images/day/storm-day.svg", day: true, type: "stormd" },
  { url: "../images/day/cloudy-night.svg", day: false, type: "cloudyn" },
  { url: "../images/day/sunny-night.svg", day: false, type: "sunnyn" },
  { url: "../images/day/storm-night.svg", day: false, type: "stormn" },
  { url: "../images/day/snow-night.svg", day: false, type: "snown" },
  { url: "../images/day/rain-night.svg", day: false, type: "rainn" },
  { url: "../images/day/fog-night.svg", day: false, type: "fogn" },
];

const WeatherCard = ({ day, type }) => {
  console.log("weather card");
  const imageSrc = weatherOptions.filter((i) => {
    console.log(i);

    return i.day === day && i.type === type;
  });
  console.log(imageSrc);
  console.log(imageSrc[0].url);

  const imageSrcUrl = imageSrc[0].url || "";

  return (
    <section className="weather" id="weather">
      <div className="weather-info">65F</div>
      <img className="weather_image" src={imageSrcUrl} />
    </section>
  );
};

export default WeatherCard;
