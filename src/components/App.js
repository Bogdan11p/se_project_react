import React, { useEffect, useState } from "react";
import "../blocks/App.css";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import ModalWithForm from "../components/ModalWithForm";

import AddItemModal from "../components/AddItemModal";
import Profile from "./Profile";
import { defaultClothingItems } from "../utils/constants";
import ItemModal from "../components/ItemModal";
import { HashRouter, Route } from "react-router-dom";
import { getForecastWeather, parseWeatherData } from "../utils/WeatherApi";
import "../blocks/WeatherCard.css";
import CurrentTempUnitContext from "../contexts/CurrentTempUnitContext";
import removeItem from "../utils/itemsApi";
import itemsApi from "../utils/itemsApi";

function App() {
  const weatherTemp = "69°F";
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [newItem, setNewItem] = useState({});
  const [prevItems, setPrevItems] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [weatherImage, setWeatherImage] = useState("");
  const [ConfirmationModal, setConfirmationModal] = useState("");

  const handleSelectedCard = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleCreateModal = () => {
    setActiveModal("create");
    setConfirmationModal("confirmation");
    setClothingItems(prevItems);
    setPrevItems([]);
    setNewItem({});
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);

        setTemp(temperature);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleToggleSwitchChange = () => {
    setCurrentTempUnit((currentTempState) => {
      return currentTempState === "C" ? "F" : "C";
    });
  };

  const handleAddItemSubmit = (name, link, weatherChange) => {
    const newItem = {
      id: Date.now(),
      name,
      link,
      weather: weatherChange,
    };
    setClothingItems((prevItems) => [...prevItems, newItem]);
    handleCloseModal();
  };

  const handleDelete = (itemId) => {
    removeItem(itemId)
      .then((response) => {
        console.log("Item deleted successfully", response);
      })
      .catch((error) => {
        console.error("Error deleting item", error);
      });
    setClothingItems((prevItems) => prevItems.filter((x) => x.id !== itemId));
  };

  return (
    <div className="page">
      <HashRouter>
        <CurrentTempUnitContext.Provider
          value={{ currentTempUnit, handleToggleSwitchChange }}
        >
          <Header onCreateModal={handleCreateModal} />
          <Route exact path="/">
            <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
          </Route>
          <Route path="/profile">
            <Profile
              onCreateModal={handleCreateModal}
              items={[...clothingItems, ...defaultClothingItems]}
              onSelectCard={handleSelectedCard}
            />
          </Route>
          <Footer />
          {/* {activeModal === "create" && (
            <ModalWithForm
              title="New Garment"
              onClose={handleCloseModal}
              onSubmit={handleAddItemSubmit}
            >
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
                  <input
                    type="radio"
                    id="warm"
                    value="warm"
                    name="rangeOfTemp"
                  />
                  <label className="modal_temp-ranges">Warm</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="cold"
                    value="cold"
                    name="rangeOfTemp"
                  />
                  <label className="modal_temp-ranges">Cold</label>
                </div>
              </div>
            </ModalWithForm>
          )} */}

          {activeModal === "preview" && (
            <ItemModal
              selectedCard={selectedCard}
              onClose={handleCloseModal}
              onDelete={handleDelete}
            />
          )}
          {activeModal === "create" && (
            <AddItemModal
              title="New Garment"
              name="add"
              onClose={handleCloseModal}
              isOpen={handleCreateModal}
              onAddItem={handleAddItemSubmit}
            />
          )}
          {/* {ConfirmationModal === "confirmation" && (
            <AddItemModal
              title="New Garment"
              name="add"
              onClose={handleCloseModal}
              isOpen={handleCreateModal}
              onAddItem={handleAddItemSubmit}
            />
          )} */}
        </CurrentTempUnitContext.Provider>
      </HashRouter>
    </div>
  );
}

export default App;
