import { useState } from "react";
import { MdSearch, MdFilterList } from "react-icons/md";
import "./AgentSearch.css";

/**
 * Renders a search form for real estate agents based on location, specialization, and rating.
 * Uses a controlled component approach, storing all criteria in a single state object.
 *
 * @component
 * @param {Object} props - The component properties.
 * @param {Function} props.onSearch - Callback triggered when the form is submitted, receiving an
 *   object of search criteria (location, specialization, minRating, and minExperience).
 *
 * @example
 * // Example usage:
 * <AgentSearch onSearch={(criteria) => console.log(criteria)} />
 *
 * @returns {JSX.Element} A form for entering and submitting search criteria for agents.
 */
function AgentSearch({ onSearch }) {
  // State to hold all search criteria
  const [searchCriteria, setSearchCriteria] = useState({
    location: "", // Location search
    specialization: "", // Selected specialization
    minRating: 0, // Minimum required rating
    minExperience: 0, // Minimum years of experience
  });

  // List of possible specializations
  const specializations = [
    "Residential",
    "Commercial",
    "Luxury",
    "Investment",
    "New-Development",
  ];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    onSearch(searchCriteria); // Pass criteria to parent component
  };

  return (
    <form className="agent-search-form" onSubmit={handleSubmit}>
      <div className="search-inputs">
        <div className="input-group">
          <MdSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by location..."
            value={searchCriteria.location}
            onChange={(e) =>
              setSearchCriteria({
                ...searchCriteria,
                location: e.target.value,
              })
            }
          />
        </div>

        <div className="input-group">
          <MdFilterList className="filter-icon" />
          <select
            value={searchCriteria.specialization}
            onChange={(e) =>
              setSearchCriteria({
                ...searchCriteria,
                specialization: e.target.value,
              })
            }
          >
            <option value="">All Specializations</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="filter-inputs">
        <div className="range-group">
          <label>Minimum Rating:</label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={searchCriteria.minRating}
            onChange={(e) =>
              setSearchCriteria({
                ...searchCriteria,
                minRating: parseFloat(e.target.value),
              })
            }
          />
          <span>{searchCriteria.minRating}</span>
        </div>
      </div>

      <button type="submit" className="search-btn">
        Search Agents
      </button>
    </form>
  );
}

export default AgentSearch;
