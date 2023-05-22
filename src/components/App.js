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
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import itemsApi from "../utils/itemsApi";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectCard, setSelectCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [newItem, setNewItem] = useState({});
  const [prevItems, setPrevItems] = useState([]);

  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

  const handleOpenConfirmModal = () => {
    setActiveModal("delete");
  };

  const handleCloseConfirmModal = () => {
    setActiveModal("");
  };

  const handleSelectCard = (card) => {
    setSelectCard(card);
    setActiveModal("preview");
  };

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);

        setTemp(temperature);
        itemsApi.get().then((response) => {
          setClothingItems(response);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((currentTempState) => {
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
        setClothingItems((clothingItems) =>
          clothingItems.filter((x) => x.id !== itemId)
        );
        handleCloseModal();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div className="page">
      <HashRouter>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header onCreateModal={handleCreateModal} />
          <Route exact path="/">
            <Main
              weatherTemp={temp}
              onSelectCard={handleSelectCard}
              clothingItems={clothingItems}
            />
          </Route>
          <Route path="/profile">
            <Profile
              onCreateModal={handleCreateModal}
              items={clothingItems}
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
          {activeModal === "delete" && (
            <DeleteConfirmationModal
              handleDelete={() => handleDelete(selectCard.id)}
              handleCloseConfirmModal={handleCloseConfirmModal}
              selectCard={selectCard}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </HashRouter>
    </div>
  );
}

export default App;
