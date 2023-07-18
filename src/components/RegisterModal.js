import React from "react";
import ModalWithForm from "./ModalWithForm";
import { Link } from "react-router-dom";

const RegisterModal = ({ onClose, handleRegister }) => {
  const [emailValue, setEmail] = React.useState("");
  const [passwordValue, setPassword] = React.useState("");
  const [nameValue, setNameValue] = React.useState("");
  const [avatarValue, setAvatarValue] = React.useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const user = {
      email: emailValue,
      password: passwordValue,
      name: nameValue,
      avatar: avatarValue,
    };
    handleRegister(user);
  };

  const onEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const onPasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const onNameChange = (evt) => {
    setNameValue(evt.target.value);
  };

  const onAvatarChange = (evt) => {
    setAvatarValue(evt.target.value);
  };

  React.useEffect(() => {
    setEmail("");
    setPassword("");
    setNameValue("");
    setAvatarValue("");
  }, []);

  return (
    <ModalWithForm
      title="Sign up"
      name="Signup"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Next"
    >
      <div className="modal__label-container">
        <label className="modal__label">
          Email*
          <input
            className="modal__input"
            type="email"
            placeholder="Email"
            required
            name="email"
            id="input-Email"
            minLength="1"
            maxLength="30"
            value={emailValue}
            onChange={onEmailChange}
          />
        </label>
        <label className="modal__label">
          Password*
          <input
            className="modal__input"
            placeholder="Password"
            required
            name="password"
            id="input-password"
            value={passwordValue}
            onChange={onPasswordChange}
          />
        </label>
        <label className="modal__label">
          Name*
          <input
            className="modal__input"
            placeholder="Name"
            type="text"
            required
            name="name"
            id="input-name"
            minLength="1"
            maxLength="30"
            value={nameValue}
            onChange={onNameChange}
          />
        </label>
        <label className="modal__label">
          Avatar URL
          <input
            className="modal__input"
            placeholder="Avatar URL"
            type="url"
            name="avatarUrl"
            id="input-avatarUrl"
            value={avatarValue}
            onChange={onAvatarChange}
          />
        </label>
      </div>
      <Link to="/signin" className="modal__link">
        or Login
      </Link>
    </ModalWithForm>
  );
};

export default RegisterModal;
