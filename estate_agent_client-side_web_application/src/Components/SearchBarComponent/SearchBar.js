// import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import DropdownList from "react-widgets/DropdownList";
import DatePicker from "react-widgets/DatePicker";
import "react-widgets/styles.css";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [searchData, setSearchData] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    startDate: "",
    endDate: "",
    postcode: "",
  });

  useEffect(() => {
    onSearch(searchData);
  }, [onSearch, searchData]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(searchData);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label className="type-list-field">
        <span className="label-name">Type:</span>
        <DropdownList
          className="type-list-input"
          name="type"
          data={["House", "Flat", "Apartment", "Any"]}
          defaultValue={"Any"}
          onChange={(value) => setSearchData({ ...searchData, type: value })}
        />
      </label>
      <div className="price-filter">
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
      <div className="bedroom-filter">
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
      <div className="date-filter">
        <label className="start-date-field">
          <span className="label-name">Start Date:</span>
          <DatePicker
            className="start-date-input"
            name="startDate"
            onChange={(value) =>
              setSearchData({
                ...searchData,
                startDate: value ? value.toISOString() : (value = null),
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
              setSearchData({ ...searchData, endDate: value.toISOString() })
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
            onChange={handleInputChange}
          />
        </label>

        {/* <button type="submit">Search</button> */}
      </div>
    </form>
  );
}

export default SearchBar;
