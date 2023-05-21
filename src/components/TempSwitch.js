import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import React, { useContext, useEffect, useState } from "react";
import "../blocks/TempSwitch.css";

export const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const isChecked = currenteratureTempUnit === "C";
  return (
    <div className="switch">
      <input
        className="switch__input"
        type="checkbox"
        name="switch-checkbox"
        id="switch"
        onClick={handleToggleSwitchChange}
      ></input>

      <label className="switch__label">
        <div className="switch__container">
          <span className="switch__button"></span>
          <span
            className={
              currentTemperatureUnit === "F"
                ? "switch__slider-F"
                : "switch__slider-C"
            }
          ></span>
          <p
            className={`switch__temp switch__temp-F ${
              currentTemperatureUnit === "F" ? "switch__active" : ""
            }`}
          >
            F
          </p>
          <span
            className={
              currentTemperatureUnit === "C"
                ? "switch__slider switch__slider-F"
                : "switch__slider switch__slider-C"
            }
          />
          <p
            className={`switch__temp switch__temp-C ${
              currentTemperatureUnit === "C" ? "switch__active" : ""
            }`}
          >
            C
          </p>
        </div>
      </label>
    </div>
  );
};

export default ToggleSwitch;
