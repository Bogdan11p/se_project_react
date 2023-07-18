import React, { useState } from "react";
import ModalWithForm from "./ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose, token }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  React.useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);

  const handleAddItemSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  return (
    <ModalWithForm
      title="New Garment"
      name="add"
      onClose={onClose}
      onSubmit={handleAddItemSubmit}
      buttonText="Add garment"
    >
      <div className="modal__label-container">
        <label className="modal__label">
          Name
          <input
            className="modal__input"
            type="text"
            placeholder="Name"
            required
            minLength="1"
            maxLength="30"
            name="name"
            id="input-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="modal__label">
          Image
          <input
            className="modal__input"
            minLength="1"
            type="url"
            placeholder="Image Url"
            required
            name="Image Url"
            id="input-url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
      </div>
      <p className="modal_weather-type">Select the weather type:</p>
      <div>
        <div>
          <input
            className="modal__input-button"
            type="radio"
            id="hot"
            value="hot"
            name="rangeOfTemp"
            onChange={handleWeatherChange}
          />
          <label className="modal__temp-ranges">Hot</label>
        </div>
        <div>
          <input
            className="modal__input-button"
            type="radio"
            id="warm"
            value="warm"
            name="rangeOfTemp"
            onChange={handleWeatherChange}
          />
          <label className="modal__temp-ranges">Warm</label>
        </div>
        <div>
          <input
            className="modal__input-button"
            type="radio"
            id="cold"
            value="cold"
            name="rangeOfTemp"
            onChange={handleWeatherChange}
          />
          <label className="modal__temp-ranges">Cold</label>
        </div>
      </div>
    </ModalWithForm>
  );
};
export default AddItemModal;
