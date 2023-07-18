import "../blocks/Profile.css";
import CurrentUserContext from "../contexts/CurrentUserContext";
import React, { useContext } from "react";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";

const Profile = ({
  items,
  onSelectCard,
  onCreateModal,
  handleOpenEditModal,
  logOut,

  isLoggedIn,
  onCardLike,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="profile">
      <div className="profile__sidebar">
        <SideBar
          handleOpenEditModal={handleOpenEditModal}
          logOut={logOut}
          currentUser={currentUser}
        />
      </div>
      <div className="profile__clothes-section">
        <ClothesSection
          cards={items}
          onAddClick={onCreateModal}
          currentUser={currentUser}
          isLoggedIn={isLoggedIn}
          onCardLike={onCardLike}
          onSelectCard={onSelectCard}
        />
      </div>
    </div>
  );
};

export default Profile;
