import "../blocks/Header.css";
import React, { useContext } from "react";
import headerLogo from "../images/logo.svg";

import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import ToggleSwitch from "../components/TempSwitch";
import CurrentUserContext from "../contexts/CurrentUserContext";

const Header = ({
  onCreateModal,
  parseWeatherData,
  handleOpenLogModal,
  handleOpenRegistrationModal,
  isLoggedIn,
}) => {
  const { currentUser } = useContext(CurrentUserContext);

  if (!parseWeatherData) return null;

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <NavLink exact to="/">
          <img className="header__logo" src={headerLogo} alt="wtwr logo" />
        </NavLink>

        <p className="header__date" id="currentDate">
          {currentDate} Roman, Romania
        </p>
      </div>
      <div className="header__right">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              className="header_add-button"
              type="button"
              onClick={onCreateModal}
              aria-label="Add"
            >
              + Add Clothes
            </button>
            <NavLink to="/profile" className="header__link">
              <p className="header__name">
                {currentUser ? currentUser.name : "Terrence Tegegne"}
              </p>
            </NavLink>
            <NavLink to="/profile" className="header__link">
              <img
                className="header__avatar"
                src={currentUser ? currentUser.avatar : ""}
                alt="User avatar"
              />
            </NavLink>
          </>
        ) : (
          <div className="header__login-info">
            <button
              className="header__signup-button"
              onClick={handleOpenRegistrationModal}
            >
              Sign Up
            </button>
            <button
              className="header__login-button"
              onClick={handleOpenLogModal}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
