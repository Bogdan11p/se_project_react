import "../Header/Header.css";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

const Header = ({ onCreateModal }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src={require("../images/logo.svg").default} alt="logo" />
        </div>
        <p className="header__date" id="currentDate">
          {currentDate} Roman, Romania
        </p>
      </div>
      <div className="header__avatar-logo">
        <div>
          <button
            className="header_add-button"
            type="text"
            onClick={onCreateModal}
          >
            + Add Clothes
          </button>
        </div>
        <div>Bogdan Pintilie</div>
        <div>
          <img src={require("../images/avatar.svg").default} alt="avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
