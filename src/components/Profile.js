import React from "react";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
/* import ItemCard from "./ItemCard"; */
import "../blocks/Profile.css";
import "../blocks/Page.css";

const Profile = ({ items, onSelectCard }) => {
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
          <ClothesSection cards={items} onCardClick={handleCardClick} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
