import React, { useEffect, useState } from "react";
import ModalWithForm from "./ModalWithForm";

const EditProfileModal = ({ onClose, handleOpenEditModal, onEditProfile, token, currentUser }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const buttonClassesSubmit = "modal__submit";

  const buttonTextsSubmit = "Save changes";

  const buttonClassesAlt = "modal__other-editProfile";

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile({ name, avatar });
  };

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setAvatar(currentUser.avatar);
    }
  }, [currentUser]);

  return (
    <ModalWithForm
      title="Change profile data"
      name="Edit Profile"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonClassAlt={buttonClassesAlt}
      buttonClassSubmit={buttonClassesSubmit}
      buttonTextSubmit={buttonTextsSubmit}
      altButtonClick={handleOpenEditModal}
    >
      <div className="modal__label-container">
        <label className="modal__label">
          Name*
          <input
            className="modal__input"
            placeholder="Name"
            type="text"
            required
            name="name"
            id="input-name"
            minLength="2"
            maxLength="30"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </label>
        <label className="modal__label">
          Avatar
          <input
            className="modal__input"
            placeholder="Avatar URL"
            type="url"
            name="avatarUrl"
            id="input-avatarUrl"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          ></input>
        </label>
      </div>
    </ModalWithForm>
  );
};

export default EditProfileModal;
