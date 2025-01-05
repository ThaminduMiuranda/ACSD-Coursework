import { MdLocationPin, MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import "./FavoriteCard.css";

/**
 * FavoriteCard component represents a card displaying a favorite property.
 * It supports drag-and-drop functionality and allows removing the property from favorites.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.property - The property object containing details of the favorite property.
 * @param {string} props.property.id - The unique identifier of the property.
 * @param {string} props.property.picture - The URL of the property's picture.
 * @param {string} props.property.type - The type of the property (e.g., "House", "Apartment").
 * @param {string} props.property.location - The location of the property.
 * @param {number} props.property.price - The price or rent of the property.
 * @param {string} props.property.url - The URL to view more details about the property.
 * @param {Function} props.onRemove - The function to call when the property is removed from favorites.
 *
 * @returns {JSX.Element} The FavoriteCard component.
 *
 * @example
 * const property = {
 *   id: '1',
 *   picture: 'https://example.com/image.jpg',
 *   type: 'House',
 *   location: 'London',
 *   price: 500000,
 *   url: 'https://example.com/property/1'
 * };
 * const handleRemove = (property) => {
 *   console.log('Remove property:', property);
 * };
 * <FavoriteCard property={property} onRemove={handleRemove} />
 */
function FavoriteCard({ property, onRemove }) {
  // Handle the drag start event
  function handleDragStart(event) {
    // Set data for drag event
    event.dataTransfer.setData("drag-type", "favorite"); // Drag type is "favorite"
    event.dataTransfer.setData("property-id", property.id); // Include property ID in drag data
  }

  // Handle removing the property from favorites
  function handleRemoveFavorites() {
    onRemove(property); // Call the onRemove function passed as a prop
  }

  // Handle the drag end event
  function handleDragEnd(event) {
    // If the drop was unsuccessful, remove the property
    if (event.dataTransfer.dropEffect === "none") {
      onRemove(property);
    }
  }

  return (
    <div
      className="favorite-card"
      draggable // Make the card draggable
      onDragStart={handleDragStart} // Attach drag start handler
      onDragEnd={handleDragEnd} // Attach drag end handler
    >
      <div className="content">
        <div
          className="favorite-image"
          style={{
            backgroundImage: `url(${property.picture})`,
            height: "140px",
            aspectRatio: "307/238",
            backgroundSize: "auto 140px",
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
