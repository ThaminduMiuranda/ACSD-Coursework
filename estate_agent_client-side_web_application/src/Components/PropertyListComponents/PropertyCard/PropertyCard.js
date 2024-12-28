import { MdBed, MdFavoriteBorder, MdLocationPin } from "react-icons/md";
import { Link } from "react-router-dom";
import "./PropertyCard.css";

function PropertyCard({ property }) {
  return (
    <div className="property-card">
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
            <MdFavoriteBorder className="icon" />
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
            {property.description.substring(0, 80)}...
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
