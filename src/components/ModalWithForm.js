import "../blocks/ModalWithForm.css";

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
