import "../blocks/Header.css";
import headerLogo from "../images/logo.svg";
import headerAvatar from "../images/avatar.svg";

import ToggleSwitch from "../components/TempSwitch";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

const Header = ({ onCreateModal }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src={headerLogo} alt="logo" />
        </div>
        <p className="header__date" id="currentDate">
          {currentDate} Roman, Romania
        </p>
      </div>
      <div className="header__avatar-logo">
        <div>
          <ToggleSwitch />
          <button
            className="header_add-button"
            type="button"
            onClick={onCreateModal}
            aria-label="Add"
          >
            + Add Clothes
          </button>
        </div>
        <div>Bogdan Pintilie</div>
        <div>
          <img src={headerAvatar} alt="avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
