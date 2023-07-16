import notLiked from "../images/like-logo.svg";
import liked from "../images/like-active.svg";
import "../blocks/ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const ItemCard = ({
  x,
  /* name,
  weather, */
  onSelectCard,
  _id,
  /*  link,
  imageUrl, */
  onCardLike,
  isLoggedIn,
}) => {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = x.likes.some((user) => user === currentUser._id);
  const itemLikeButtonClassName = `cards__like ${
    isLoggedIn ? "cards__like_active" : "cards__like_inactive"
  }`;

  /* const handleCardLike = () => {
    onCardLike(x._id, isLiked);
  }; */

  const renderNotLiked = () => {
    console.log(isLoggedIn);
    return (
      <button
        className={itemLikeButtonClassName}
        onClick={() => onCardLike(x._id, isLiked)}
      >
        <img
          className="card__heart"
          src={notLiked}
          alt="item card is liked, solid heart icon"
        />
      </button>
    );
  };

  const renderLiked = () => {
    return (
      <button
        className={itemLikeButtonClassName}
        onClick={() => onCardLike(x._id, isLiked)}
      >
        <img
          className="card__heart"
          src={liked}
          alt="item card is liked, solid heart icon"
        />
      </button>
    );
  };

  return (
    <div className="card">
      <div key={x._id || x.id} className="card__container">
        <div>
          <img
            src={x.link || x.imageUrl}
            alt={x.name}
            className="card__image"
            onClick={() => onSelectCard(x, isLiked)}
          />
        </div>
        <div className="cards__description">
          <div className="card__name"> {x.name} </div>
          {isLiked ? renderLiked() : renderNotLiked()}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
