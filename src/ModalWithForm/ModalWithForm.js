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
        <form className="modal_form" name={name}>
          <fieldset className="modal_fieldset">
            <button
              className="modal_close"
              type="button"
              onClick={onClose}
              aria-label="Close"
            ></button>
            <h2 className="modal_header">{title}</h2>
            {children}
            <button className="modal_submit" type="submit">
              {buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
