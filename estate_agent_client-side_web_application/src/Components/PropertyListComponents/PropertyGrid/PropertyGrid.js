import PropertyCard from "../PropertyCard/PropertyCard";
import "./PropertyGrid.css";

function PropertyGrid({ properties }) {
  const grid = [];

  properties.forEach((property) => {
    grid.push(<PropertyCard property={property} key={property.id} />);
  });

  return <div className="property-grid">{grid}</div>;
}

export default PropertyGrid;
