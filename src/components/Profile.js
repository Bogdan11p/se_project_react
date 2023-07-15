import "../blocks/Profile.css";

import React from "react";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";

const Profile = ({
  items,
  onSelectCard,
  onCreateModal,
  isLoggedIn,
  handleOpenEditModal,
  logOut,
  onCardLike,

  currentUser,
}) => {
  const handleCardClick = (x) => {
    onSelectCard(x);

    console.log("Selected item:", x);
  };

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
          onCardClick={handleCardClick}
          onAddClick={onCreateModal}
          isLoggedIn={isLoggedIn}
          onCardLike={onCardLike}
        />
      </div>
    </div>
  );
};

export default Profile;
