import "../blocks/App.css";
import Header from "../Header/Header";
import WeatherCard from "../WeatherCard/WeatherCard";

function App() {
  return (
    <div>
      <Header />
      <main className="main">
        <WeatherCard day={true} type="cloudyd" />
        <section id="card-section"></section>
      </main>
    </div>
  );
}

export default App;
