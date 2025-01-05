import { MdBed, MdFavoriteBorder, MdLocationPin } from "react-icons/md";
import { Link } from "react-router-dom";
import "./PropertyCard.css";

/**
 * Renders a draggable card containing property details such as image, type, location, bedrooms,
 * truncated description, and pricing information. Provides functionality to add the property
 * to favorites and drag it to other components.
 *
 * @component
 * @param {object} props - The props for the PropertyCard component.
 * @param {object} props.property - The property object containing details to display.
 * @param {string|number} props.property.id - Unique identifier for the property.
 * @param {string} props.property.picture - URL or path for the property's image.
 * @param {string} props.property.type - Type of the property (e.g. "House", "Apartment").
 * @param {string} props.property.location - String indicating the property's address or area.
 * @param {number} props.property.bedrooms - Number of bedrooms in the property.
 * @param {string} props.property.description - A short text describing the property.
 * @param {number} props.property.price - Price or rental cost of the property.
 * @param {string} props.property.url - Link to a detailed page about the property.
 * @param {Function} props.onAdd - Callback that handles adding the property to favorites.
 * @returns {JSX.Element} The rendered PropertyCard component.
 */
function PropertyCard({ property, onAdd }) {
  // Handle drag start event to initiate dragging the property
  function handleDragStart(event) {
    event.dataTransfer.setData("drag-type", "property"); // Specify drag type
    event.dataTransfer.setData("property-id", property.id); // Include property ID in drag data
  }

  // Handle adding the property to favorites
  function handleAddFavorites() {
    onAdd(property); // Call the onAdd function passed as a prop
  }

  return (
    <div className="property-card" draggable onDragStart={handleDragStart}>
      <div className="content">
        <div
          className="property-image"
          style={{
            backgroundImage: `url(${property.picture})`,
            height: "238px",
            width: "307px",
            backgroundSize: "auto 238px",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="property-summary">
          <div className="property-heading">
            <span>{property.type}</span>
            <MdFavoriteBorder className="icon" onClick={handleAddFavorites} />
          </div>
          <div className="location">
            <MdLocationPin className="icon" />
            <span>{property.location}</span>
          </div>
          <div className="bedrooms">
            <MdBed className="icon" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="description">
            {/* Display property description (truncated to 50 characters) */}
            {property.description.substring(0, 50)}...
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

export default PropertyCard;
