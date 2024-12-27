import { useEffect, useState } from "react";
import "./ThemeToggle.css";

/**
 * ThemeToggle component that allows users to toggle between light and dark modes.
 *
 * @component
 * @example
 * return (
 *   <ThemeToggle />
 * )
 *
 * @returns {JSX.Element} The rendered theme toggle button component.
 *
 * @function
 * @name ThemeToggle
 *
 * @description
 * This component renders a button that toggles between light and dark modes.
 * It uses the `useState` hook to manage the toggle state and the `useEffect` hook to apply the dark mode class to the body element.
 *
 * @property {boolean} toggled - The state that indicates whether dark mode is enabled.
 * @property {function} setToggled - Function to update the toggled state.
 *
 * @function handleToggle
 * @description Toggles the dark mode state. Adds or removes the "dark-mode" class from the body element based on the toggled state.
 */
function ThemeToggle() {
  // State variable to track whether dark mode is enabled
  const [toggled, setToggled] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme === "true";
  });

  // When the ThemeToggle component is first rendered (mounted), the useEffect hook runs after the initial render. Since the dependency array contains [toggled], the effect will run whenever the toggled state changes.
  useEffect(() => {
    localStorage.setItem("darkMode", toggled);
    if (toggled) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [toggled]);

  return (
    <button
      type="button"
      className={`toggle-btn ${toggled ? "toggled" : ""}`}
      onClick={() => setToggled(!toggled)} // Toggle the state when the button is clicked
    >
      <div className="thumb"></div>
    </button>
  );
}

export default ThemeToggle;
