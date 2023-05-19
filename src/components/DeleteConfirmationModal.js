const DeleteConfirmationModal = ({
  onClick,
  onDelete,
  card,
  onClose,
  onCancel,
}) => {
  const handleDeleteClick = () => {
    onDelete(card._id);
  };

  return (
    <div className="modal__confirmation">
      <p>Are you sure you want to delete this item?</p>
      <p className="modal__text_confirmation">This action is irreversible.</p>
      <button className="modal__confirmation_close" onClick={onClose}></button>
      <div className="modal__confirmation_buttons">
        <button
          className="modal__button_confirm"
          type="button"
          aria-label="Confirm"
          onClick={handleDeleteClick}
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
  );
};
