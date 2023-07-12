import React, { useContext } from "react";

import "../blocks/SideBar.css";
import CurrentUserContext from "../contexts/CurrentUserContext";

const SideBar = ({ handleOpenEditModal, logOut }) => {
  const currentUser = useContext(CurrentUserContext);
  const { name, avatar } = currentUser;

  return (
    <div className="sidebar">
      <div className="sidebar__container-top">
        <img src={avatar} className="sidebar__avatar" alt="avatar" />
        <div className="sidebar__name">{name}</div>
      </div>
      <div className="sidebar__container-bottom">
        <button className="sidebar__button-edit" onClick={handleOpenEditModal}>
          Change profile data
        </button>
        <button className="sidebar__button-logout" onClick={logOut}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
