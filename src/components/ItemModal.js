import "../blocks/ItemModal.css";
import "../components/ModalWithForm";
import React from "react";

const ItemModal = ({ selectCard, onClose, handleOpenConfirmationModal }) => {
  return (
    <div className={`modal`}>
      <div className="modal__content">
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
          aria-label="Close"
        ></button>
        <img
          className="modal__image"
          src={selectCard.link || selectCard.imageUrl}
          alt={selectCard.name}
        />
        <div className="modal__subcontainer">
          <div>
            <h2 className="modal__title">{selectCard.name}</h2>
            <p className="modal__weather">Weather type: {selectCard.weather}</p>
          </div>
          <button
            className="modal__delete"
            onClick={handleOpenConfirmationModal}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
