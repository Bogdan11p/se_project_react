const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className={`modal`}>
      <div className="modal_content">
        <button
          className="modal_close"
          type="button"
          onClick={onClose}
          aria-label="Close"
        ></button>
        <img className="modal_image" src={selectedCard.link} />
        <div className="modal_subcontainer">
          <div>
            <h2 className="modal_title">{selectedCard.name}</h2>
            <p className="modal_weather">
              Weather type: {selectedCard.weather}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
