import React, { useEffect, useState } from "react";
import "../blocks/App.css";
import "../blocks/DeleteConfirmationModal.css";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

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
  const [activeModal, setActiveModal] = useState("");
  const [selectCard, setSelectCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [newItem, setNewItem] = useState({});
  const [prevItems, setPrevItems] = useState([]);

  const [DeleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

  const handleOpenConfirmModal = () => {
    setDeleteConfirmationModal(true);
  };

  const handleCloseConfirmModal = () => {
    setDeleteConfirmationModal(false);
  };

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
      name,
      imageUrl,
      weather,
    };
    itemsApi
      .add(newItem)
      .then((response) => {
        console.log("Item added:", response);
        setClothingItems((items) => [response, ...items]);
        handleCloseModal();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const handleDelete = (itemId) => {
    itemsApi

      .remove(itemId)
      .then(() => {
        console.log("Item deleted");
        setClothingItems((i) => i.filter((x) => x.id !== itemId));
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
              handleOpenConfirmationModal={handleOpenConfirmModal}
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
          {DeleteConfirmationModal && (
            <div className="modal">
              <div className="modal__content">
                <div className="modal__confirmation">
                  <p className="modal__text_confirmation">
                    Are you sure you want to delete this item?
                  </p>
                  <p className="modal__text_confirmation">
                    This action is irreversible.
                  </p>
                  <button
                    className="modal__confirmation_close"
                    onClick={handleCloseConfirmModal}
                  ></button>
                  <div className="modal__confirmation_buttons">
                    <button
                      className="modal__button_confirm"
                      type="button"
                      aria-label="Confirm"
                      onClick={handleDelete && handleCloseConfirmModal}
                      /* onClick={handleCloseConfirmModal} */
                    >
                      Yes, delete item
                    </button>
                    <button
                      className="modal__button_cancel"
                      type="button"
                      aria-label="Cancel"
                      onClick={handleCloseConfirmModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          ;
        </CurrentTempUnitContext.Provider>
      </HashRouter>
    </div>
  );
}

export default App;
