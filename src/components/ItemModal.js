import "../blocks/ItemModal.css";
import "../components/ModalWithForm";
import React, { useState } from "react";

const ItemModal = ({ selectedCard, onClose, onDelete }) => {
  const [ConfirmationModal, setConfirmationModal] = useState(false);

  const handleOpenConfirmationModal = () => {
    setConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setConfirmationModal(false);
  };

  const handleDelete = () => {
    onDelete(selectedCard.id);

    handleCloseConfirmationModal(false);
  };

  return (
    <div className={`modal`}>
      <div className="modal_content">
        <button
          className="modal_close"
          type="button"
          onClick={onClose}
          aria-label="Close"
        ></button>
        <img
          className="modal_image"
          src={selectedCard.link}
          alt={selectedCard.name}
        />
        <div className="modal_subcontainer">
          <div>
            <h2 className="modal_title">{selectedCard.name}</h2>
            <p className="modal_weather">
              Weather type: {selectedCard.weather}
            </p>
          </div>
          <button
            className="modal__delete"
            onClick={handleOpenConfirmationModal}
          >
            Delete
          </button>
          {ConfirmationModal && (
            <div className="modal__confirmation">
              <p>Are you sure you want to delete this item?</p>
              <p className="modal__text_confirmation">
                This action is irreversible.
              </p>
              <button
                className="modal__confirmation_close"
                onClick={onClose}
              ></button>
              <div className="modal__confirmation_buttons">
                <button
                  className="modal__button_confirm"
                  type="button"
                  aria-label="Confirm"
                  onClick={handleDelete}
                >
                  Yes, delete item
                </button>
                <button
                  className="modal__button_cancel"
                  type="button"
                  aria-label="Cancel"
                  onClick={handleCloseConfirmationModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
