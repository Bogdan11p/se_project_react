import CurrentTempUnitContext from "../contexts/CurrentTemperatureUnitContext";
import React, { useContext, useEffect, useState } from "react";
import "../blocks/TempSwitch.css";

export const ToggleSwitch = () => {
  const { currentTempUnit, handleToggleSwitchChange } = useContext(
    CurrentTempUnitContext
  );

  const isChecked = currentTempUnit === "C";
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
              currentTempUnit === "F" ? "switch__slider-F" : "switch__slider-C"
            }
          ></span>
          <p
            className={`switch__temp switch__temp-F ${
              currentTempUnit === "F" ? "switch__active" : ""
            }`}
          >
            F
          </p>
          <span
            className={
              currentTempUnit === "C"
                ? "switch__slider switch__slider-F"
                : "switch__slider switch__slider-C"
            }
          />
          <p
            className={`switch__temp switch__temp-C ${
              currentTempUnit === "C" ? "switch__active" : ""
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
