import "../blocks/Profile.css";

import React, { useState } from "react";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import ItemCard from "./ItemCard";

const Profile = ({ items, onSelectCard, onCreateModal }) => {
  const handleCardClick = (x) => {
    onSelectCard(x);

    console.log("Selected item:", x);
  };

  return (
    <div className="profile">
      <div className="profile__container">
        <div className="profile__sidebar">
          <SideBar />
        </div>
        <div className="profile__clothes-section">
          <ClothesSection
            cards={items}
            onCardClick={handleCardClick}
            onAddClick={onCreateModal}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;

/* const Profile = ({ items, onCreateModal, onSelectCard }) => {
  const handleCardClick = (x) => {
    onSelectCard();

    console.log("Selected item:", x);
  };

  return (
    <div className="profile">
      <div className="profile__container">
        <div className="profile__sidebar">
          <SideBar />
        </div>
        <div className="profile__clothes-section">
          <ClothesSection
            cards={items}
            onCardClick={handleCardClick}
            onAddClick={onCreateModal}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
 */
