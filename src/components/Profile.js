import "../blocks/Profile.css";

import React from "react";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";

const Profile = ({
  items,
  onSelectCard,
  onCreateModal,
  handleOpenEditModal,
  logOut,
  currentUser,
  isLoggedIn,
  onCardLike,
}) => {
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
          onSelectCard={onSelectCard}
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
