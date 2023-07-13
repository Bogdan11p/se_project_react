import "../blocks/ItemModal.css";
import "../components/ModalWithForm";
import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const ItemModal = ({ selectCard, onClose, handleOpenConfirmationModal }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = selectCard.owner === currentUser._id;
  const itemDeleteButtonClassName = `item__delete-btn ${
    isOwn ? "item__delete-btn_visible" : "item__delete-btn_hidden"
  }`;

  return (
    <div className={`modal`}>
      <div className="modal__content modal__content-item">
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
            className="itemDeleteButtonClassName"
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
