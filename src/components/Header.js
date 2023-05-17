import "../blocks/Header.css";
import headerLogo from "../images/logo.svg";
import headerAvatar from "../images/avatar.svg";
import React from "react";
/* import ToggleSwitch from "../components/TempSwitch"; */
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { ToggleSwitch } from "../components/TempSwitch";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

const Header = ({ onCreateModal }) => {
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
        <div className="header__avatar-logo">
          <ToggleSwitch />
          <button
            className="header_add-button"
            type="button"
            onClick={onCreateModal}
            aria-label="Add"
          >
            + Add Clothes
          </button>
        </div>
        <NavLink to="/profile" className="header__link">
          <div className="header__name">Bogdan Pintilie</div>
        </NavLink>
        <NavLink to="/profile">
          <div>
            <img src={headerAvatar} alt="avatar" />
          </div>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
