import React from "react";
import "../blocks/App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function App() {
  const weatherTemp = "69°F";
  const [activeModal, setActiveModal] = React.useState("");
  const [selectedCard, setSelectedCard] = React.useState({});

  const handleSelectedCard = (card) => {
    setSelectedCard(card);
  };

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  console.log(selectedCard);

  return (
    <div>
      <Header onCreateModal={handleCreateModal} />
      <Main weatherTemp={weatherTemp} onSelectCard={handleSelectedCard} />
      <Footer />
      {activeModal === "create" && (
        <ModalWithForm title="New Garment" onClose={handleCloseModal}>
          <label className="modal_label">
            Name
            <input
              type="text"
              name="name"
              minlength="1"
              maxlength="30"
              placeholder="Name"
              className="modal_input"
            />
          </label>
          <label className="modal_label">
            Image
            <input
              type="url"
              name="link"
              minlength="1"
              maxlength="30"
              placeholder="Image URL"
              className="modal_input"
            />
          </label>
          <p>Select the weather type:</p>
          <div>
            <div>
              <input type="radio" id="hot" value="hot" />
              <label>Hot</label>
            </div>
            <div>
              <input type="radio" id="warm" value="warm" />
              <label>Warm</label>
            </div>
            <div>
              <input type="radio" id="cold" value="cold" />
              <label>Cold</label>
            </div>
          </div>
        </ModalWithForm>
      )}

      {activeModal === "preview" && (
        <div className={`modal`}>
          <div className="modal_content">
            <img />
            <div>Text for item name</div>
            <div>Weather type</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
