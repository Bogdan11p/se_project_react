import "../blocks/ItemCard.css";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext } from "react";

const ItemCard = ({
  x,
  name,
  weather,
  onSelectCard,
  _id,
  link,
  imageUrl,
  onCardLike,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const isLiked = x.likes.some((user) => user === currentUser._id);
  const itemLikeButtonClassName = `cards__like ${
    isLiked ? "cards__like_active" : "cards__like_inactive"
  }`;

  const handleCardLike = () => {
    onCardLike(x._id, isLiked);
  };

  return (
    <div className="card">
      <div key={x._id || x.id} className="card__container">
        <div>
          <img
            src={x.link || x.imageUrl}
            alt={x.name}
            className="card__image"
            onClick={() => onSelectCard(x, name, weather, _id, link, imageUrl)}
          />
        </div>
        <div className="cards__description">
          <div className="card__name"> {x.name} </div>
          <button
            className={itemLikeButtonClassName}
            type="button"
            onClick={handleCardLike}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
