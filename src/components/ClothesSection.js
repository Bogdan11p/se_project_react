import React, { useContext } from "react";
import "../blocks/ClothesSection.css";
import ItemCard from "./ItemCard";
import CurrentUserContext from "../contexts/CurrentUserContext";

const ClothesSection = ({
  cards,
  onSelectCard,
  onAddClick,
  onCardLike,
  isLoggedIn,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const userItems = cards.filter((card) => card.owner === currentUser._id);
  return (
    <div className="clothes">
      <div className="clothes__container">
        <div className="clothes__title">Your items</div>
      </div>
      <button
        className="clothes__button"
        type="button"
        aria-label="Add"
        onClick={onAddClick}
      >
        + Add new
      </button>
      <ul className="clothes__list">
        {userItems.map((x) => (
          <ItemCard
            key={x._id || x.id}
            x={x}
            onSelectCard={onSelectCard}
            isLoggedIn={isLoggedIn}
            onCardLike={onCardLike}
            currentUser={currentUser}
          />
        ))}
      </ul>
    </div>
  );
};

export default ClothesSection;
