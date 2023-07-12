import React, { useEffect, useState } from "react";
import "../blocks/App.css";
import "../blocks/DeleteConfirmationModal.css";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

import AddItemModal from "../components/AddItemModal";
import Profile from "./Profile";

import ItemModal from "../components/ItemModal";
import { BrowserRouter, Route, useHistory } from "react-router-dom";
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

  const history = useHistory();

  if (token) {
    checkTokenValidity(token)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.log("Error checking the validity of the token:", err);
      });
  }

  const handleProfileUpdate = ({ name, avatar }) => {
    auth
      .updateCurrentUser(token, { name, avatar })
      .then(() => {
        handleCloseModal();
        setCurrentUser({ name, avatar });
      })
      .catch((error) => {
        console.log(error);
      });
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
        } else {
          console.log("Registration failed:", res.err);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSignIn = ({ email, password }) => {
    setIsLoading(true);

    auth
      .signin(email, password)
      .then((data) => {
        if (data.token) {
          return auth.checkTokenValidity(data.token);
        }
      })
      .then((res) => {
        setCurrentUser(res.data);
        handleCloseModal();
        setIsLoggedIn(true);
        history.push("/profile");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    /* history.push("/login"); */
  };

  /*  const handleOutClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      handleCreateModal();
    }
  }; */

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

  const handleAddItemSubmit = (token, { name, imageUrl, weather }) => {
    /* const card = { name, imageUrl, weather };
    setIsLoading(true);
 */
    /*  const newItem = {
      name,
      imageUrl,
      weather,
    }; */
    itemsApi
      .add(token, { name, weather, imageUrl })
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
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

  useEffect(() => {
    const tokenCheck = () => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        auth
          .checkTokenValidity(jwt)
          .then((res) => {
            if (res) {
              setToken(jwt);
              setIsLoggedIn(true);
              const { name, avatar, _id } = res.data;
              setCurrentUser({ name, avatar, _id });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    tokenCheck();
  }, []);

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
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
              />
            </Route>
            <ProtectedRoute path="/profile" isLoggedIn={isLoggedIn}>
              <Profile
                onCreateModal={handleCreateModal}
                items={clothingItems}
                onSelectCard={handleSelectCard}
                handleOpenEditModal={handleOpenEditModal}
                logOut={handleLogOut}
              />
            </ProtectedRoute>
          </Switch>
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
              token={token}
              currentUser={currentUser}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
