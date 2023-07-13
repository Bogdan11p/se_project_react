import "../blocks/DeleteConfirmationModal.css";

const DeleteConfirmationModal = ({
  handleCloseConfirmModal,
  handleCancel,
  handleDelete,
  selectCard,
}) => {
  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__confirmation">
          <p className="modal__text_confirmation">
            Are you sure you want to delete this item?
          </p>
          <p className="modal__text_confirmation">
            This action is irreversible.
          </p>
          <button
            className="modal__confirmation_close"
            onClick={handleCloseConfirmModal}
          ></button>
          <div className="modal__confirmation_buttons">
            <button
              className="modal__button_confirm"
              type="button"
              aria-label="Confirm"
              onClick={() => handleDelete(selectCard._id)}
            >
              Yes, delete item
            </button>
            <button
              className="modal__button_cancel"
              type="button"
              aria-label="Cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
