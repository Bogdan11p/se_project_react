import React, { useCallback, useEffect, useState } from "react";
import "../blocks/App.css";
import "../blocks/DeleteConfirmationModal.css";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

import AddItemModal from "../components/AddItemModal";
import Profile from "./Profile";

import ItemModal from "../components/ItemModal";
import { Route, useHistory } from "react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { getForecastWeather, parseWeatherData } from "../utils/WeatherApi";
import "../blocks/WeatherCard.css";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import itemsApi from "../utils/itemsApi";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";
import { checkTokenValidity } from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import EditProfileModal from "./EditProfileModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectCard, setSelectCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [newItem, setNewItem] = useState({});
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [prevItems, setPrevItems] = useState("");

  const history = useHistory();

  const handleProfileUpdate = ({ name, avatar }) => {
    auth
      .updateCurrentUser(token, { name, avatar })
      .then(() => {
        handleCloseModal();
        setCurrentUser({ ...currentUser, name, avatar });
      })
      .catch(console.error);
  };

  const handleRegister = ({ email, password, name, avatar }) => {
    setIsLoading(true);

    auth
      .signup({ email, password, name, avatar })
      .then((res) => {
        if (res) {
          setCurrentUser(res.data);
          handleSignIn({ email, password });
          handleCloseModal();
          setIsLoggedIn(true);
        } else {
          console.log("Registration failed:", res.err);
        }
      })
      .catch(console.error);
  };

  const handleSignIn = ({ email, password }) => {
    auth
      .signin(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        if (data.token) {
          return auth.checkTokenValidity(data.token);
        }
      })
      .then((res) => {
        const data = res.data;
        setCurrentUser(data);
        setToken(data.token);
        handleCloseModal();
        setIsLoggedIn(true);
        history.push("/profile");
      })

      .catch(console.error);
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setToken("");
    setCurrentUser("");
    history.push("/");
  };

  const handleOpenEditModal = () => {
    setActiveModal("edit");
  };

  const handleOpenSigninModal = () => {
    setActiveModal("login");
  };

  const handleOpenRegisterModal = () => {
    setActiveModal("register");
  };

  const handleOpenConfirmModal = () => {
    setActiveModal("delete");
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

        itemsApi
          .get()
          .then((items) => {
            setClothingItems(items);
          })
          .catch(console.error);
      })
      .catch(console.error);
  }, []);

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
    itemsApi
      .add({ name, weather, imageUrl }, token)
      .then((res) => {
        setClothingItems([res.data, ...clothingItems]);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (itemId) => {
    itemsApi
      .remove(itemId, token)
      .then(() => {
        const updateItems = clothingItems.filter((x) => {
          return x._id !== itemId;
        });

        setClothingItems(updateItems);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleLikeClick = (itemId, isLiked) => {
    console.log(itemId);
    console.log(isLiked);
    if (!isLiked) {
      itemsApi
        .addCardLike({ _id: itemId, user: currentUser }, token)
        .then((updatedCard) => {
          console.log(updatedCard);
          const cardData = updatedCard.data;

          setClothingItems((prevItems) =>
            prevItems.map((x) => (x._id === itemId ? cardData : x))
          );
        })
        .catch(console.error);
    } else {
      itemsApi
        .removeCardLike({ _id: itemId, user: currentUser }, token)
        .then((updatedCard) => {
          console.log(updatedCard);
          const cardData = updatedCard.data;

          setClothingItems((prevItems) =>
            prevItems.map((x) => (x._id === itemId ? cardData : x))
          );
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkTokenValidity(jwt)
        .then((res) => {
          setCurrentUser(res.data);
          setToken(jwt);
          setIsLoggedIn(true);
        })
        .catch(console.error);
    }
  }, [token]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
        <Header
          onCreateModal={handleCreateModal}
          parseWeatherData={parseWeatherData}
          handleOpenLogModal={handleOpenSigninModal}
          handleOpenRegistrationModal={handleOpenRegisterModal}
          isLoggedIn={isLoggedIn}
        />
        <Switch>
          <Route exact path="/">
            <Main
              weatherTemp={temp}
              onSelectCard={handleSelectCard}
              clothingItems={clothingItems}
              onCardLike={handleLikeClick}
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <ProtectedRoute path="/profile" isLoggedIn={isLoggedIn}>
            <Profile
              onCreateModal={handleCreateModal}
              items={clothingItems}
              onSelectCard={handleSelectCard}
              handleOpenEditModal={handleOpenEditModal}
              logOut={handleLogOut}
              onCardLike={handleLikeClick}
              isLoggedIn={isLoggedIn}
            />
          </ProtectedRoute>
        </Switch>
        <Footer />
        {activeModal === "preview" && (
          <ItemModal
            selectCard={selectCard}
            onClose={handleCloseModal}
            onDelete={handleDeleteItem}
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
            handleDelete={handleDeleteItem}
            handleCloseConfirmModal={handleCloseModal}
            selectCard={selectCard}
            handleCancel={handleCloseModal}
          />
        )}
        {activeModal === "login" && (
          <LoginModal
            onClose={handleCloseModal}
            handleSignin={handleSignIn}
            isLoading={isLoading}
            handleOpenRegistrationModal={handleOpenRegisterModal}
          />
        )}
        {activeModal === "register" && (
          <RegisterModal
            onClose={handleCloseModal}
            handleOpenLogModal={handleOpenSigninModal}
            isLoading={isLoading}
            handleRegister={handleRegister}
          />
        )}
        {activeModal === "edit" && (
          <EditProfileModal
            onClose={handleCloseModal}
            onEditProfile={handleProfileUpdate}
            clothingItems={clothingItems}
          />
        )}
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
