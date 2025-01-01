import { useCallback, useEffect, useState } from "react";
import Navbar from "../../Components/NavbarComponent/Navbar";
import PropertyGrid from "../../Components/PropertyListComponents/PropertyGrid/PropertyGrid";
import SearchBar from "../../Components/SearchBarComponent/SearchBar";
import "./SearchProperties.css";
import FavoriteGrid from "../../Components/FavoriteListComponents/FavoriteGrid/FavoriteGrid";

function SearchProperty() {
  function loadFavorites() {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  }

  const [favorites, setFavorites] = useState(loadFavorites());

  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    fetch("/properties.json")
      .then((Response) => Response.json())
      .then((data) => setProperties(data.properties))
      .catch((error) => console.error("Error fetching properties", error));
  }, []);

  function extractPostcode(location) {
    const match = location.match(/\b[A-Z]{1,2}\d{1,2}[A-Z]?\b/);
    return match ? match[0] : "";
  }

  function addFavorite(property) {
    const existing = loadFavorites();
    const favoriteExists = existing.some(
      (fav) => fav.property.id === property.id
    );
    if (!favoriteExists) {
      const updatedFavorites = [...existing, { property }];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
      console.log("Property is added to favorites.");
    } else {
      console.log("Property is already in favorites.");
    }
  }

  function removeFavorite(property) {
    const updatedFavorites = favorites.filter(
      (fav) => fav.property.id !== property.id
    );
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites); // Update state to refresh the UI
    console.log("Property is removed from favorites.");
  }

  const handleSearch = useCallback(
    (criteria) => {
      const filtered = properties.filter((property) => {
        const postcode = extractPostcode(property.location);

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
      setFilteredProperties(filtered);
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
        <div className="grid">
          {filteredProperties.length > 0 ? (
            <PropertyGrid
              properties={filteredProperties}
              onAdd={addFavorite}
              onRemove={removeFavorite}
            />
          ) : (
            <div className="property-grid">
              <span className="no-results">No results found</span>
            </div>
          )}
          {/* {favorites.length > 0 ? (
            <FavoriteGrid
              favorites={favorites}
              onRemove={removeFavorite}
              onAdd={addFavorite}
              allProperties={properties}
            />
          ) : (
            <div className="fovorites-grid">
              <span className="no-results">No results found</span>
            </div>
          )} */}
          <FavoriteGrid
            favorites={favorites}
            onRemove={removeFavorite}
            onAdd={addFavorite}
            allProperties={properties}
          />
        </div>
      </main>
    </>
  );
}

export default SearchProperty;
