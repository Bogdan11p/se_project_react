export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "deployed-backend-url"
    : "http://localhost:3001";

export const latitude = 44.34;
export const longitude = 10.99;
export const APIkey = "ff1313fe582026737c438ec92763ddbe";

export const weatherOptions = [
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
