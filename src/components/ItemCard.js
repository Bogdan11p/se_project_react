import "../blocks/ItemCard.css";

const ItemCard = ({ x, name, weather, onSelectCard, _id, id, link }) => {
  return (
    <div className="card_container">
      <div>
        <img
          src={x.link}
          alt={x.name}
          className="card_image"
          onClick={() => onSelectCard(x, name, weather, _id, id, link)}
        />
      </div>
      <div className="card_name"> {x.name} </div>
    </div>
  );
};

export default ItemCard;
