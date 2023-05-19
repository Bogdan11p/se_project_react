import "../blocks/ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText = "Add garment",
  title,
  onClose,
  name,
  onSubmit,
}) => {
  return (
    <div className={`modal modal__type_${name}`}>
      <div className="modal__content">
        <form className="modal__form" name={name} handleSubmit={onSubmit}>
          <fieldset className="modal__fieldset">
            <button
              className="modal__close"
              type="button"
              onClick={onClose}
              aria-label="Close"
            ></button>
            <h2 className="modal__header">{title}</h2>
            {children}
            <button className="modal__submit" type="submit">
              {buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;

/* const Profile = ({ items, onCreateModal, onSelectCard }) => {
  const handleCardClick = (x) => {
    onSelectCard();

    console.log("Selected item:", x);
  };

  return (
    <div className="profile">
      <div className="profile__container">
        <div className="profile__sidebar">
          <SideBar />
        </div>
        <div className="profile__clothes-section">
          <ClothesSection
            cards={items}
            onCardClick={handleCardClick}
            onAddClick={onCreateModal}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
 */
