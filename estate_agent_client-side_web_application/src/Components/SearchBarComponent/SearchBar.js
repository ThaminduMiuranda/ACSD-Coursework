// import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import DropdownList from "react-widgets/DropdownList";
import DatePicker from "react-widgets/DatePicker";
import "react-widgets/styles.css";
import "./SearchBar.css";

/**
 * A search form component that allows users to filter property listings.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onSearch - Callback function triggered when search parameters change or form is submitted
 *
 * @example
 * // Usage
 * <SearchBar onSearch={(searchParams) => handleSearch(searchParams)} />
 *
 * @property {Object} searchData - State object containing all search parameters
 * @property {string} searchData.type - Property type filter (House/Flat/Apartment/Any)
 * @property {string} searchData.minPrice - Minimum price filter
 * @property {string} searchData.maxPrice - Maximum price filter
 * @property {string} searchData.minBedrooms - Minimum number of bedrooms filter
 * @property {string} searchData.maxBedrooms - Maximum number of bedrooms filter
 * @property {string} searchData.startDate - Start date for availability filter (ISO string)
 * @property {string} searchData.endDate - End date for availability filter (ISO string)
 * @property {string} searchData.postcode - Postcode location filter
 *
 * @returns {JSX.Element} A form containing property search filters including type dropdown,
 *                       price range, bedroom range, date range, and postcode input
 */
function SearchBar({ onSearch }) {
  // State to store the search data entered by the user
  const [searchData, setSearchData] = useState({
    type: "", // Property type
    minPrice: "", // Minimum price
    maxPrice: "", // Maximum price
    minBedrooms: "", // Minimum bedrooms
    maxBedrooms: "", // Maximum bedrooms
    startDate: "", // Start date for availability
    endDate: "", // End date for availability
    postcode: "", // Postcode for filtering
  });

  // Effect to trigger the onSearch callback whenever searchData changes
  useEffect(() => {
    onSearch(searchData);
  }, [onSearch, searchData]);

  // Handle changes in input fields and update searchData
  function handleInputChange(e) {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value }); // Update the corresponding field in searchData
  }

  // Handle form submission to trigger the search
  function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission
    onSearch(searchData); // Trigger the onSearch callback with current searchData
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label className="type-list-field">
        <span className="label-name">Type:</span>
        <DropdownList
          className="type-list-input"
          name="type"
          data={["House", "Flat", "Apartment", "Any"]} // Options for property type
          defaultValue={"Any"}
          onChange={(value) => setSearchData({ ...searchData, type: value })} // Update type on selection
        />
      </label>
      <div className="filter">
        <label className="min-price-field">
          <span className="label-name">Min Price:</span>
          <input
            className="min-price-input"
            type="number"
            name="minPrice"
            placeholder="Min Price"
            onChange={handleInputChange}
          />
        </label>
        <label className="max-price-field">
          <span className="label-name">Max Price:</span>
          <input
            className="max-price-input"
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="filter">
        <label className="min-bedrooms-field">
          <span className="label-name">Min Bedrooms:</span>
          <input
            className="min-bedrooms-input"
            type="number"
            name="minBedrooms"
            placeholder="Min Bedrooms"
            onChange={handleInputChange}
          />
        </label>
        <label className="max-bedrooms-field">
          <span className="label-name">Max Bedrooms:</span>
          <input
            className="max-bedrooms-input"
            type="number"
            name="maxBedrooms"
            placeholder="Max Bedrooms"
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="filter">
        <label className="start-date-field">
          <span className="label-name">Start Date:</span>
          <DatePicker
            className="start-date-input"
            name="startDate"
            onChange={(value) =>
              setSearchData({
                ...searchData,
                startDate: value ? value.toISOString() : (value = null), // Convert date to ISO string
              })
            }
          />
        </label>
        <label className="end-date-field">
          <span className="label-name">End Date:</span>
          <DatePicker
            className="end-date-input"
            name="endDate"
            onChange={(value) =>
              setSearchData({
                ...searchData,
                endDate: value ? value.toISOString() : (value = null), // Convert date to ISO string
              })
            }
          />
        </label>
      </div>
      <div className="postcode-and-button">
        <label className="postcode-field">
          <span className="label-name">Postcode:</span>
          <input
            className="postcode-input"
            type="text"
            name="postcode"
            placeholder="Postcode"
            onChange={handleInputChange} // Update postcode in searchData
          />
        </label>

        {/* <button type="submit">Search</button> */}
      </div>
    </form>
  );
}

export default SearchBar;
