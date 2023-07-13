import React, { useContext } from "react";
import "../blocks/ClothesSection.css";
import ItemCard from "./ItemCard";
import CurrentUserContext from "../contexts/CurrentUserContext";

const ClothesSection = ({ cards, onCardClick, onAddClick, onCardLike }) => {
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
            onSelectCard={onCardClick}
            name={x.name}
            weather={x.weather}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </div>
  );
};

export default ClothesSection;
