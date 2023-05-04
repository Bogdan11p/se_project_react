import "../ItemCard/ItemCard.css";

const ItemCard = ({ x, onSelectCard }) => {
  return (
    <div className="card_container">
      <div>
        <img
          src={x.link}
          className="card_image"
          onClick={() => onSelectCard(x)}
        />
      </div>
      <div className="card_name"> {x.name} </div>
    </div>
  );
};

export default ItemCard;
