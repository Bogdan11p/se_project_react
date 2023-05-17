import CurrentTempUnitContext from "../contexts/CurrentTempUnitContext";
import React, { useContext, useEffect, useState } from "react";
import "../blocks/TempSwitch.css";

const ToggleSwitch = () => {
  const { currentTempUnit, handleToggleSwitch } = useContext(
    CurrentTempUnitContext
  );

  const [isChecked, setIsChecked] = useState(currentTempUnit === "C");

  useEffect(() => {
    setIsChecked(currentTempUnit === "C");
  }, [currentTempUnit]);

  /* const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    handleToggleSwitch();
  }; */

  return (
    <div className="switch">
      <input
        className="switch__input"
        type="checkbox"
        name="switch-checkbox"
        id="switch"
        onChange={handleToggleSwitch}
      ></input>
      <label className="switch__label">
        <span className="switch__button">
          <div className="switch__container">
            <span
              className={
                currentTempUnit === "F"
                  ? "switch__slider-F"
                  : "switch__slider-C"
              }
            ></span>
            <p
              className={`switch__F ${
                currentTempUnit === "F" ? "switch__active-F" : ""
              }`}
            >
              F
            </p>
            <span
              className={
                currentTempUnit === "C"
                  ? "switch__slider-C"
                  : "switch__slider-F"
              }
            ></span>
            <p
              className={`switch__C ${
                currentTempUnit === "C" ? "switch__active-C" : ""
              }`}
            >
              C
            </p>
          </div>
        </span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
