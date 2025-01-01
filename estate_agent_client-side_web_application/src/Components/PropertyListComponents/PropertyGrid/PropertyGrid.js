import PropertyCard from "../PropertyCard/PropertyCard";
import "./PropertyGrid.css";

function PropertyGrid({ properties, onAdd, onRemove }) {
  function handleDrop(event) {
    event.preventDefault();

    const dragType = event.dataTransfer.getData("drag-type");
    const propertyId = event.dataTransfer.getData("property-id");

    if (dragType === "favorite") {
      const property = properties.find(
        (property) => property.id === propertyId
      );
      if (property) {
        onRemove(property);
      }
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  const grid = [];

  properties.forEach((property) => {
    grid.push(
      <PropertyCard property={property} onAdd={onAdd} key={property.id} />
    );
  });

  return (
    <div
      className="property-grid"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {grid}
    </div>
  );
}

export default PropertyGrid;
