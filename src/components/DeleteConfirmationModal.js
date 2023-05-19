import "../blocks/DeleteConfirmationModal.css";
import { handleCloseConfirmationModal } from "../components/App";

const DeleteConfirmationModal = ({
  onClick,
  onDelete,

  onClose,
  onCancel,
}) => {
  const handleDeleteClick = () => {
    onDelete(handleDeleteClick);
  };

  return (
    <div className="modal">
      <div className="modal__confirmation">
        <p className="modal__text_confirmation">
          Are you sure you want to delete this item?
        </p>
        <p className="modal__text_confirmation">This action is irreversible.</p>
        <button
          className="modal__confirmation_close"
          onClick={onClose}
        ></button>
        <div className="modal__confirmation_buttons">
          <button
            className="modal__button_confirm"
            type="button"
            aria-label="Confirm"
            onDelete={handleDeleteClick}
          >
            Yes, delete item
          </button>
          <button
            className="modal__button_cancel"
            type="button"
            aria-label="Cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
