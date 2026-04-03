import { useContext } from "react";
import { spaceContext } from "./SearchInput";
import Card from "./Card";

function Favorites({ onCardClick }) {
  const { favorites } = useContext(spaceContext);

  return (
    <>
      <div className="favorites-container">
        <h2>Favorites ({favorites.length})</h2>

        <div className="image-container">
          {favorites.map((el) => (
            <Card key={el.identifier} data={el} onCardClick={onCardClick} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Favorites;
