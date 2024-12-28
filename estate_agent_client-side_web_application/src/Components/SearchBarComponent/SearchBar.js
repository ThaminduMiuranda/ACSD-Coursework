// import ReactDOM from "react-dom";
import { useState } from "react";
import DropdownList from "react-widgets/DropdownList";
import DatePicker from "react-widgets/DatePicker";
import "react-widgets/styles.css";

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

  function handleInputChange(e) {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(searchData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <DropdownList
        name="type"
        data={["House", "Flat", "Apartment", "Any"]}
        defaultValue={"Any"}
        onChange={(value) => setSearchData({ ...searchData, type: value })}
      />
      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="minBedrooms"
        placeholder="Min Bedrooms"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="maxBedrooms"
        placeholder="Max Bedrooms"
        onChange={handleInputChange}
      />
      <DatePicker
        name="startDate"
        onChange={(value) =>
          setSearchData({ ...searchData, startDate: value.toISOString() })
        }
      />
      <DatePicker
        name="endDate"
        onChange={(value) =>
          setSearchData({ ...searchData, endDate: value.toISOString() })
        }
      />
      <input
        type="text"
        name="postcode"
        placeholder="Postcode"
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
