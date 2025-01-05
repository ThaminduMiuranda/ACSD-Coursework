import { MdClose, MdMenu } from "react-icons/md";
import { useEffect, useState } from "react";
import FavoriteCard from "../FavoriteCard/FavoriteCard";
import "./FavoriteGrid.css";

/**
 * A component that displays and manages a grid of favorite properties with drag-and-drop functionality.
 *
 * @component
 * @param {Object} props - The component props
 * @param {Array} props.favorites - List of favorite properties to display in the grid
 * @param {Function} props.onRemove - Callback function to handle removal of a property from favorites
 * @param {Function} props.onAdd - Callback function to add a property to favorites
 * @param {Array} props.allProperties - List of all available properties
 * @param {Function} props.onClearAll - Callback function to clear all favorites
 * @param {boolean} props.horizontal - Flag to determine if the grid should be displayed horizontally
 *
 * @example
 * <FavoriteGrid
 *   favorites={favoritesList}
 *   onRemove={(property) => handleRemove(property)}
 *   onAdd={(property) => handleAdd(property)}
 *   allProperties={properties}
 *   onClearAll={() => handleClearAll()}
 *   horizontal={false}
 * />
 *
 * @returns {JSX.Element} A grid component displaying favorite properties with drag-and-drop support,
 *                        expand/collapse functionality, and clear all option
 */
function FavoriteGrid({
  favorites, // List of favorite properties
  onRemove, // Function to handle removal of a favorite
  onAdd, // Function to add a property to favorites
  allProperties, // List of all properties
  onClearAll, // Function to clear all favorites
  horizontal, // Boolean to determine the layout (horizontal/vertical)
}) {
  // Handle drop event when a property is dragged and dropped onto the grid
  function handleDrop(event) {
    event.preventDefault(); // Prevent default browser behavior
    const dragType = event.dataTransfer.getData("drag-type"); // Get drag type
    const propertyId = event.dataTransfer.getData("property-id"); // Get dragged property's id

    if (dragType === "property") {
      // Find the property by ID from the list of all properties
      const property = allProperties.find(
        (property) => property.id === propertyId
      );
      if (property) {
        onAdd(property); // Add the property to favorites
      }
    }
  }

  // Allow drag-over behavior to enable drop
  function handleDragOver(event) {
    event.preventDefault();
  }

  // Handle clearing all favorites
  function handleClearFavorites(event) {
    if (onClearAll) {
      onClearAll(); // Call the clear-all function if provided
    }
  }

  // State to control whether the favorite menu is expanded
  const [favoriteMenuExpanded, setfavoriteMenuExpanded] = useState(false);

  // Ensure the menu resets or maintains its state on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setfavoriteMenuExpanded(true); // Expand menu on wider screens
      }
    };

    window.addEventListener("resize", handleResize); // Add resize event listener
    handleResize(); // Initial check for screen width

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        className={`favorites-grid ${
          favoriteMenuExpanded ? "expanded" : "collapsed" // Toggle class based on menu state
        } ${horizontal ? "horizontal" : ""}`} // Add horizontal layout class if applicable
        onDrop={handleDrop} // Attach drop handler
        onDragOver={handleDragOver} // Attach drag-over handler
      >
        <h3 className={`favorites-heading ${horizontal ? "horizontal" : ""}`}>
          Favorites
        </h3>
        <div className={`favorites-list ${horizontal ? "horizontal" : ""}`}>
          {favorites.length === 0 ? (
            <span className="no-favorites">No favorites added</span>
          ) : (
            favorites.map((fav) => (
              <FavoriteCard
                property={fav.property} // Pass property data to FavoriteCard
                key={fav.property.id} // Unique key for each favorite
                onRemove={onRemove} // Pass remove handler to FavoriteCard
              />
            ))
          )}
        </div>
        <button
          type="button"
          className="clear-favorites"
          onClick={handleClearFavorites} // Attach clear-all handler
        >
          <span className="button-text">Clear Favorites</span>
        </button>
      </div>

      <MdMenu
        className={`favorites-open ${favoriteMenuExpanded ? "open" : ""} ${
          horizontal ? "horizontal" : ""
        }`}
        onClick={() => setfavoriteMenuExpanded(true)}
      />
      <MdClose
        className={`favorites-close ${favoriteMenuExpanded ? "close" : ""} ${
          horizontal ? "horizontal" : ""
        }`}
        onClick={() => setfavoriteMenuExpanded(false)}
      />
    </>
  );
}

export default FavoriteGrid;
