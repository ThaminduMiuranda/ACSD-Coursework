import { MdClose, MdMenu } from "react-icons/md";
import { useEffect, useState } from "react";
import FavoriteCard from "../FavoriteCard/FavoriteCard";
import "./FavoriteGrid.css";

function FavoriteGrid({ favorites, onRemove, onAdd, allProperties }) {
  function handleDrop(event) {
    event.preventDefault();
    const dragType = event.dataTransfer.getData("drag-type");
    const propertyId = event.dataTransfer.getData("property-id");
    if (dragType === "property") {
      const property = allProperties.find(
        (property) => property.id === propertyId
      );
      if (property) {
        onAdd(property);
      }
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  const [favoriteMenuExpanded, setfavoriteMenuExpanded] = useState(false);

  // Reset or maintain open state on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setfavoriteMenuExpanded(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        className={`favorites-grid ${
          favoriteMenuExpanded ? "expanded" : "collapsed"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <h3 className="favorites-heading">Favorites</h3>
        {favorites.length === 0 ? (
          <span className="no-favorites">No favorites added</span>
        ) : (
          favorites.map((fav) => (
            <FavoriteCard
              property={fav.property}
              key={fav.property.id}
              onRemove={onRemove}
            />
          ))
        )}
      </div>
      <MdMenu
        className={`favorites-open ${favoriteMenuExpanded ? "open" : ""}`}
        onClick={() => setfavoriteMenuExpanded(true)}
      />
      <MdClose
        className={`favorites-close ${favoriteMenuExpanded ? "close" : ""}`}
        onClick={() => setfavoriteMenuExpanded(false)}
      />
    </>
  );
}

export default FavoriteGrid;
