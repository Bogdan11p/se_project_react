import React, { useState } from "react";
import ModalWithForm from "./ModalWithForm";

const LoginModal = ({
  onClose,
  handleOpenRegistrationModal,
  handleSignin,
  isLoading,
}) => {
  const [emailValue, setEmail] = useState("");
  const [passwordValue, setPassword] = useState("");

  const buttonClasses = {
    mainButton: "modal__login",
    altButton: "modal__other",
  };
  const buttonTexts = {
    button: isLoading ? "Saving..." : "Log in",
    other: "or Register",
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!emailValue || !passwordValue) {
      return;
    }
    const user = { email: emailValue, password: passwordValue };
    handleSignin(user);
  };

  const onEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const onPasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  React.useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  return (
    <ModalWithForm
      title="Log in"
      name="Login"
      onClose={onClose}
      onSubmit={handleSubmit}
      /* onClick={handleOpenRegistrationModal} */
      buttonClass={buttonClasses}
      altButtonClick={handleOpenRegistrationModal}
      buttonText={buttonTexts}
    >
      <div className="modal__label-container">
        <label className="modal__label">
          Email
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
          Password
          <input
            className="modal__input"
            placeholder="Password"
            required
            name="passowrd"
            id="input-password"
            value={passwordValue}
            onChange={onPasswordChange}
          />
        </label>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
