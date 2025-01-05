import PropertyCard from "../PropertyCard/PropertyCard";
import "./PropertyGrid.css";

/**
 * PropertyGrid Component
 *
 * Renders a grid of property cards, allowing users to add or remove properties.
 * Supports drag-and-drop functionality to handle favorite properties.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.properties - An array of property objects to display. Each property should have a unique `id` and relevant property details.
 * @param {Function} props.onAdd - Callback function invoked when a property is added. Receives the property object as an argument.
 * @param {Function} props.onRemove - Callback function invoked when a property is removed. Receives the property object as an argument.
 *
 * @returns {JSX.Element} A div containing a grid of PropertyCard components.
 *
 * @function
 *
 * @example
 * const properties = [
 *   { id: '1', ... },
 *   { id: '2', ... },
 * ];
 *
 * const handleAdd = (property) => {
 *   // Add property to favorites
 * };
 *
 * const handleRemove = (property) => {
 *   // Remove property from favorites
 * };
 *
 * <PropertyGrid properties={properties} onAdd={handleAdd} onRemove={handleRemove} />
 */
function PropertyGrid({ properties, onAdd, onRemove }) {
  // Handle drop event when a favorite property is dragged and dropped onto the grid
  function handleDrop(event) {
    event.preventDefault(); // Prevent default browser behavior

    const dragType = event.dataTransfer.getData("drag-type"); // Get drag type
    const propertyId = event.dataTransfer.getData("property-id"); // Get dragged property's id

    if (dragType === "favorite") {
      // Find the property by ID from the list of properties
      const property = properties.find(
        (property) => property.id === propertyId
      );
      if (property) {
        onRemove(property); // Call the onRemove function to remove the property
      }
    }
  }

  // Allow drag-over behavior to enable drop
  function handleDragOver(event) {
    event.preventDefault();
  }

  // Create a grid of PropertyCard components
  const grid = [];

  properties.forEach((property) => {
    grid.push(
      <PropertyCard property={property} onAdd={onAdd} key={property.id} />
    );
  });

  return (
    <div
      className="property-grid"
      onDrop={handleDrop} // Attach drop handler
      onDragOver={handleDragOver} // Attach drag-over handler
    >
      {grid} {/* Render the grid of PropertyCard components */}
    </div>
  );
}

export default PropertyGrid;
