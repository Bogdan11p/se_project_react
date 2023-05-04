import "../ModalWithForm/ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText = "Add garment",
  title,
  onClose,
  name,
}) => {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal_content">
        <button
          className="modal_close"
          type="button"
          onClick={onClose}
        ></button>
        <h3>{title}</h3>
        <form>{children}</form>
        <button className="modal_submit" type="submit">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ModalWithForm;
