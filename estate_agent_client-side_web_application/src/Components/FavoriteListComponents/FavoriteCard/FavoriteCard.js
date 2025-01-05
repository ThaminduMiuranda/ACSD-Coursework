import { MdLocationPin, MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import "./FavoriteCard.css";

function FavoriteCard({ property, onRemove }) {
  function handleDragStart(event) {
    event.dataTransfer.setData("drag-type", "favorite");
    event.dataTransfer.setData("property-id", property.id);
  }

  function handleRemoveFavorites() {
    onRemove(property);
  }

  function handleDragEnd(event) {
    if (event.dataTransfer.dropEffect === "none") {
      onRemove(property);
    }
  }

  return (
    <div
      className="favorite-card"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="content">
        <div
          className="favorite-image"
          style={{
            backgroundImage: `url(${property.picture})`,
            height: "140px",
            // width: "200px",
            aspectRatio: "307/238",
            backgroundSize: "auto 140px",
            // backgroundSize: "200px auto",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="favorite-summary">
          <div className="favorite-heading">
            <span>{property.type}</span>
            <MdOutlineDelete className="icon" onClick={handleRemoveFavorites} />
          </div>
          <div className="location">
            <MdLocationPin className="icon" />
            <span>{property.location}</span>
          </div>
          {/* <div className="bedrooms">
            <MdBed className="icon" />
            <span>{property.bedrooms}</span>
          </div> */}
          {/* <div className="description">
            {property.description.substring(0, 80)}...
          </div> */}
          <div className="price-details">
            <span className="price-type">
              {property.type === "House" ? "Price:" : "Rent:"}
            </span>
            <span className="price">
              £{property.price}
              <span>{property.type === "House" ? "" : "/ night"}</span>
            </span>
          </div>
          <Link className="view-more" to={property.url}>
            View More Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FavoriteCard;
