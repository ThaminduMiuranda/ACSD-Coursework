import { useEffect, useState } from "react";
import Navbar from "../../Components/NavbarComponent/Navbar";
import PropertyGrid from "../../Components/PropertyListComponents/PropertyGrid/PropertyGrid";
import SearchBar from "../../Components/SearchBarComponent/SearchBar";
import "./SearchProperties.css";

function SearchProperty() {
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

  function handleSearch(criteria) {
    const filtered = properties.filter((property) => {
      const postcode = extractPostcode(property.location);
      return (
        (!criteria.type ||
          criteria.type === "Any" ||
          property.type === criteria.type) &&
        (!criteria.minPrice || property.price >= criteria.minPrice) &&
        (!criteria.maxPrice || property.price <= criteria.maxPrice) &&
        (!criteria.minBedrooms || property.bedrooms >= criteria.minBedrooms) &&
        (!criteria.maxBedrooms || property.bedrooms <= criteria.maxBedrooms) &&
        (!criteria.startDate ||
          new Date(
            property.added.year,
            property.added.month - 1,
            property.added.day
          ) >= new Date(criteria.startDate)) &&
        (!criteria.endDate ||
          new Date(
            property.added.year,
            property.added.month - 1,
            property.added.day
          ) <= new Date(criteria.endDate)) &&
        (!criteria.postcode || postcode.startsWith(criteria.postcode))
      );
    });
    setFilteredProperties(filtered);
  }

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="search-main">
        <SearchBar onSearch={handleSearch} />
        {filteredProperties.length > 0 ? (
          <PropertyGrid properties={filteredProperties} />
        ) : (
          <div className="property-grid">
            <span className="no-results">No results found</span>
          </div>
        )}
      </main>
    </>
  );
}

export default SearchProperty;
