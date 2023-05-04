import React from "react";
import "../blocks/App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getForecastWeather, parseWeatherData } from "../util/WeatherApi";

function App() {
  const weatherTemp = "69°F";
  const [activeModal, setActiveModal] = React.useState("");
  const [selectedCard, setSelectedCard] = React.useState({});
  const [temp, setTemp] = React.useState(0);

  const handleSelectedCard = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  React.useEffect(() => {
    getForecastWeather().then((data) => {
      const temperature = parseWeatherData(data);

      setTemp(temperature);
    });
  }, []);

  return (
    <div>
      <Header onCreateModal={handleCreateModal} />
      <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
      <Footer />
      {activeModal === "create" && (
        <ModalWithForm title="New Garment" onClose={handleCloseModal}>
          <div className="modal_label-container">
            <label className="modal_label">
              Name
              <input
                type="text"
                name="name"
                minLength="1"
                maxLength="30"
                placeholder="Name"
                className="modal_input"
              />
            </label>
            <label className="modal_label">
              Image
              <input
                type="url"
                name="link"
                minLength="1"
                maxLength="30"
                placeholder="Image URL"
                className="modal_input"
                required
              />
            </label>
          </div>
          <p className="modal_weather-type">Select the weather type:</p>
          <div>
            <div>
              <input type="radio" id="hot" value="hot" name="rangeOfTemp" />
              <label className="modal_temp-ranges">Hot</label>
            </div>
            <div>
              <input type="radio" id="warm" value="warm" name="rangeOfTemp" />
              <label className="modal_temp-ranges">Warm</label>
            </div>
            <div>
              <input type="radio" id="cold" value="cold" name="rangeOfTemp" />
              <label className="modal_temp-ranges">Cold</label>
            </div>
          </div>
        </ModalWithForm>
      )}

      {activeModal === "preview" && (
        <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
