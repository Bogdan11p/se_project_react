import "../blocks/ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonClassSubmit,
  buttonTextSubmit,
  buttonClassAlt,
  buttonTextAlt,
  title,
  onClose,
  name,
  onSubmit,
  altButtonClick,
}) => {
  return (
    <div className={`modal modal__type_${name}`}>
      <div className="modal__content">
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          <fieldset className="modal__fieldset">
            <button
              className="modal__close"
              type="button"
              onClick={onClose}
              aria-label="Close"
            ></button>
            <h2 className="modal__header">{title}</h2>
            {children}
            <div className="modal__buttons-down">
              <button
                className={buttonClassSubmit}
                type="submit"
                aria-label="Save"
                id="addSave"
              >
                {buttonTextSubmit}
              </button>
              <button
                className={buttonClassAlt}
                type="button"
                onClick={altButtonClick}
              >
                {buttonTextAlt}
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
