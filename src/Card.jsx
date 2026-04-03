import { useContext } from "react";
import { spaceContext } from "./SearchInput";
import bookmarkEmpty from "./assets/fav-empty.png";
import bookmarkFilled from "./assets/fav-filled.png";

function Card({ data, onCardClick }) {
  const { toggleFavorite, isFavorite } = useContext(spaceContext);

  const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${data.date.split(" ")[0].replaceAll("-", "/")}/png/${data.image}.png`;

  const isItemFavorite = isFavorite(data.identifier);

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(data);
  };

  return (
    <div className="card" onClick={() => onCardClick && onCardClick(data)}>
      <img
        className="card-image"
        src={imageUrl}
        alt={data.caption || data.identifier}
      />
      <div className="card-content">
        <p>
          <strong>Date:</strong> {data.date}
        </p>
        <p>
          <strong>ID:</strong> {data.identifier}
        </p>
        {data.caption && (
          <p>
            <strong>Caption:</strong> {data.caption}
          </p>
        )}
      </div>
      <img
        className="bookmark-icon"
        src={isItemFavorite ? bookmarkFilled : bookmarkEmpty}
        alt="bookmark"
        onClick={handleToggleFavorite}
      />
    </div>
  );
}

export default Card;
