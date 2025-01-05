import { useCallback, useEffect, useState } from "react";
import Navbar from "../../Components/NavbarComponent/Navbar";
import PropertyGrid from "../../Components/PropertyListComponents/PropertyGrid/PropertyGrid";
import SearchBar from "../../Components/SearchBarComponent/SearchBar";
import "./SearchProperties.css";
import FavoriteGrid from "../../Components/FavoriteListComponents/FavoriteGrid/FavoriteGrid";
import Footer from "../../Components/FooterComponent/Footer";

/**
 * SearchProperty component handles property search functionality and favorite property management.
 *
 * @component
 * @description
 * This component provides the following features:
 * - Loading and displaying property listings from a JSON file
 * - Filtering properties based on multiple search criteria including:
 *   - Property type
 *   - Price range
 *   - Number of bedrooms
 *   - Date range
 *   - Postcode
 * - Managing favorites functionality:
 *   - Adding properties to favorites
 *   - Removing properties from favorites
 *   - Clearing all favorites
 * - Persisting favorites in localStorage
 *
 * The component uses:
 * - useState for managing properties, filtered properties, and favorites
 * - useEffect for initial property data fetching
 * - useCallback for memoizing the search function
 * - Local storage for persisting favorite properties
 *
 * @returns {JSX.Element} A page containing a search bar, property grid, and favorites grid
 *                       wrapped in a layout with navbar and footer
 *
 * @example
 * <SearchProperty />
 */
function SearchProperty() {
  // Function to load favorites from localStorage
  function loadFavorites() {
    const data = localStorage.getItem("favorites"); // Retrieve "favorites" data
    return data ? JSON.parse(data) : []; // Parse JSON data or return an empty array
  }

  // State for managing favorites
  const [favorites, setFavorites] = useState(loadFavorites());
  // State for managing all properties and filtered properties
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  // Load properties data when the component mounts
  useEffect(() => {
    fetch("/properties.json") // Fetch data from a JSON file
      .then((Response) => Response.json())
      .then((data) => setProperties(data.properties)) // Update properties state
      .catch((error) => console.error("Error fetching properties", error)); // Handle errors
  }, []);

  // Extract the postcode from a property location string
  function extractPostcode(location) {
    const match = location.match(/\b[A-Z]{1,2}\d{1,2}[A-Z]?\b/); // Regex to find postcodes
    return match ? match[0] : ""; // Return the postcode or an empty string
  }

  // Add a property to favorites
  function addFavorite(property) {
    const existing = loadFavorites(); // Load current favorites
    const favoriteExists = existing.some(
      (fav) => fav.property.id === property.id
    ); // Check if the property is already a favorite
    if (!favoriteExists) {
      const updatedFavorites = [...existing, { property }]; // Add the property to favorites
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Save to localStorage
      setFavorites(updatedFavorites); // Update state
      console.log("Property is added to favorites.");
    } else {
      console.log("Property is already in favorites.");
    }
  }

  // Remove a property from favorites
  function removeFavorite(property) {
    const updatedFavorites = favorites.filter(
      (fav) => fav.property.id !== property.id
    ); // Filter out the property to remove
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Save updated favorites
    setFavorites(updatedFavorites); // Update state
    console.log("Property is removed from favorites.");
  }

  // Clear all favorite properties
  function clearAllFavorites() {
    setFavorites([]);
    localStorage.setItem("favorites", JSON.stringify([])); // Clear localStorage
  }

  // Handle search criteria and filter properties
  const handleSearch = useCallback(
    (criteria) => {
      const filtered = properties.filter((property) => {
        const postcode = extractPostcode(property.location); // Extract postcode from location

        // Map for converting month names to numbers
        const monthMap = {
          January: 0,
          February: 1,
          March: 2,
          April: 3,
          May: 4,
          June: 5,
          July: 6,
          August: 7,
          September: 8,
          October: 9,
          November: 10,
          December: 11,
        };

        // Construct the property's added date
        const propertyDate = new Date(
          property.added.year,
          monthMap[property.added.month], // Convert string month to numerical value
          property.added.day
        );

        // Check all search criteria
        return (
          (!criteria.type ||
            criteria.type === "Any" ||
            property.type === criteria.type) &&
          (!criteria.minPrice || property.price >= criteria.minPrice) &&
          (!criteria.maxPrice || property.price <= criteria.maxPrice) &&
          (!criteria.minBedrooms ||
            property.bedrooms >= criteria.minBedrooms) &&
          (!criteria.maxBedrooms ||
            property.bedrooms <= criteria.maxBedrooms) &&
          (!criteria.startDate ||
            propertyDate >= new Date(criteria.startDate)) &&
          (!criteria.endDate || propertyDate <= new Date(criteria.endDate)) &&
          (!criteria.postcode || postcode.startsWith(criteria.postcode))
        );
      });
      setFilteredProperties(filtered); // Update filtered properties state
    },
    [properties]
  );

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="search-main">
        <SearchBar className="search-section" onSearch={handleSearch} />
        <h3 className="properties">Properties</h3>
        <div className="grid">
          {filteredProperties.length > 0 ? (
            <PropertyGrid
              properties={filteredProperties} // Pass filtered properties
              onAdd={addFavorite} // Add to favorites handler
              onRemove={removeFavorite} // Remove from favorites handler
            />
          ) : (
            <div className="property-grid">
              <span className="no-results">No results found</span>
            </div>
          )}
          <FavoriteGrid
            favorites={favorites} // Pass favorite properties
            onRemove={removeFavorite} // Remove from favorites handler
            onAdd={addFavorite} // Add to favorites handler
            allProperties={properties} // Pass all properties
            onClearAll={clearAllFavorites} // Clear all favorites handler
          />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default SearchProperty;
