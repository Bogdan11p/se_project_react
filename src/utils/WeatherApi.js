// https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
import checkResponse from "./checkResponse";
const latitude = 44.34;
const longitude = 10.99;
const APIkey = "ff1313fe582026737c438ec92763ddbe";

export const getForecastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(checkResponse);
  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;

  const temperature = main && main.temp;

  return Math.ceil(temperature);
};

export const temperature = (temp) => ({
  F: `${Math.round(temp)}°F`,
  C: `${Math.round(((temp - 32) * 5) / 9)}°C`,
});
