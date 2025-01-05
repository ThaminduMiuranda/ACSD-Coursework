import "./Navbar.css";
import { Link } from "react-router-dom";
import {
  MdLogin,
  MdMenu,
  MdClose,
  MdOutlinePersonSearch,
  MdRealEstateAgent,
  MdSearch,
  MdBrightness4,
  MdLogout,
  MdOutlineAccountCircle,
} from "react-icons/md";
import { useEffect, useState } from "react";
import ThemeToggle from "../ThemeToggleComponet/ThemeToggle";

/**
 * Navbar component that renders the navigation bar for the estate agent web application.
 * It includes links to different pages, a theme toggle, and user authentication controls.
 *
 * @component
 * @example
 * return (
 *   <Navbar />
 * )
 *
 * @returns {JSX.Element} The rendered Navbar component.
 *
 * @description
 * The Navbar component has the following features:
 * - Displays links to "Home", "Search Property", and "Find Agent" pages.
 * - Shows the logged-in user's name and a logout button if the user is logged in.
 * - Provides a login link if the user is not logged in.
 * - Includes a theme toggle button.
 * - Adapts to mobile view with a collapsible menu.
 *
 * @function
 * @name Navbar
 */
function Navbar() {
  // State to control whether the mobile menu is expanded
  const [menuExpanded, setMenuExpanded] = useState(false);

  // State to store the logged-in user initialized from localStorage
  const [loggedInUser, setLoggedInUser] = useState(() =>
    localStorage.getItem("loggedInUser")
  );

  // State to control whether the user menu is open
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Handle logout by clearing logged-in user data from localStorage
  function handleLogout(params) {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  }

  // Synchronize the logged-in user state with localStorage changes
  useEffect(() => {
    function handleStorageChange(params) {
      setLoggedInUser(localStorage.getItem("loggedInUser"));
    }
    // Listen for storage changes
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      <nav>
        <div className="default-nav">
          <div className="start">
            <Link className="link" to={"/home"}>
              <MdRealEstateAgent />
              <span>Dwello</span>
            </Link>
          </div>
          <div className="middle">
            <Link className="link" to={"/search"}>
              Search Property
            </Link>
            <Link className="link" to={"/find-agent"}>
              Find Agent
            </Link>
          </div>
          <div className="end">
            {loggedInUser ? (
              <div className="user-menu">
                <span
                  className="link"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  {loggedInUser}
                </span>
                {userMenuOpen && (
                  <button onClick={handleLogout}>Log out</button>
                )}
              </div>
            ) : (
              <Link className="link" to={"/auth"}>
                Log in
              </Link>
            )}

            <div className="theme-toggle">
              <MdBrightness4 style={{ color: "rgb(var(--gray-950))" }} />
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="mobile-nav">
          <div className="start">
            <Link className="link" to={"/home"}>
              <MdRealEstateAgent />
              <span>Dwello</span>
            </Link>
          </div>
          <div className="expanding-menu">
            <div
              className={`mobile-menu-icon ${menuExpanded ? "expanded" : ""}`}
            >
              <MdMenu
                className="menu"
                // style={{ color: "var(--color-foreground)" }}
                onClick={() => setMenuExpanded(!menuExpanded)}
              />
            </div>
            <div
              className={`mobile-close-icon ${menuExpanded ? "expanded" : ""}`}
            >
              <MdClose
                className="close"
                // style={{ color: "var(--color-foreground)" }}
                onClick={() => setMenuExpanded(!menuExpanded)}
              />
            </div>
            <div className={`mobile-links ${menuExpanded ? "expanded" : ""}`}>
              <Link className="link" to={"/search"}>
                <MdSearch />
                <span>Search Property</span>
              </Link>
              <Link className="link" to={"/find-agent"}>
                <MdOutlinePersonSearch />
                <span>Find Agent</span>
              </Link>

              {loggedInUser ? (
                <div className="user-menu">
                  <span
                    className="link"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <MdOutlineAccountCircle />
                    <span>{loggedInUser}</span>
                  </span>
                  {userMenuOpen && (
                    <button onClick={handleLogout}>
                      <MdLogout />
                      <span>Log out</span>
                    </button>
                  )}
                </div>
              ) : (
                <Link className="link" to={"/auth"}>
                  <MdLogin />
                  <span>Log in</span>
                </Link>
              )}

              {/* <Link className="link" to={"/auth"}>
                <MdLogin />
                <span>Log in</span>
              </Link> */}
              <div className="theme-toggle">
                <MdBrightness4 />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
