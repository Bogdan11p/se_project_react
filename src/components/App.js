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

import itemsApi from "../utils/itemsApi";

function App() {
  const weatherTemp = "69°F";
  const [activeModal, setActiveModal] = useState("");
  const [selectCard, setSelectCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [newItem, setNewItem] = useState({});
  const [prevItems, setPrevItems] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [weatherImage, setWeatherImage] = useState("");

  const handleSelectCard = (card) => {
    setSelectCard(card);
    setActiveModal("preview");
  };

  const handleCreateModal = () => {
    setActiveModal("create");

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

  const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
    const newItem = {
      id: Date.now(),
      name,
      link: imageUrl,
      weather,
    };
    itemsApi
      .add(newItem.name, newItem.link, newItem.weather)
      .then((response) => {
        console.log("Item added:", response);
        setClothingItems((prevItems) => [...prevItems, newItem]);
        handleCloseModal();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const handleDelete = (id) => {
    itemsApi
      .remove(id)
      .then(() => {
        console.log("Item deleted");
        setClothingItems((prevItems) =>
          prevItems.filter((itemsId) => itemsId !== itemsId)
        );
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div className="page">
      <HashRouter>
        <CurrentTempUnitContext.Provider
          value={{ currentTempUnit, handleToggleSwitchChange }}
        >
          <Header onCreateModal={handleCreateModal} />
          <Route exact path="/">
            <Main weatherTemp={temp} onSelectCard={handleSelectCard} />
          </Route>
          <Route path="/profile">
            <Profile
              onCreateModal={handleCreateModal}
              items={[...clothingItems, ...defaultClothingItems]}
              onSelectCard={handleSelectCard}
            />
          </Route>
          <Footer />

          {activeModal === "preview" && (
            <ItemModal
              selectCard={selectCard}
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
        </CurrentTempUnitContext.Provider>
      </HashRouter>
    </div>
  );
}

export default App;
