import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/NavbarComponent/Navbar";
import "./LandingPage.css";
import FavoriteGrid from "../../Components/FavoriteListComponents/FavoriteGrid/FavoriteGrid";

function LandingPage() {
  function loadFavourites() {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  }

  const [favorites, setFavorites] = useState(loadFavourites());

  function removeFavorite(property) {
    const updatedFavorites = favorites.filter(
      (fav) => fav.property.id !== property.id
    );
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites); // Update state to refresh the UI
    console.log("Property is removed from favorites.");
  }

  function clearAllFavorites() {
    setFavorites([]);
    localStorage.setItem("favorites", JSON.stringify([]));
  }

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <section
          className="hero"
          style={{
            backgroundImage: "url(/img/heroimage.jpg)",
          }}
        >
          <div className="hero-text">
            <span className="text-1">
              Where Every House <span>Becomes a Home</span>
            </span>
            <span className="text-2">
              Explore hundreds of properties <span>at your fingertips.</span>
            </span>
          </div>
          <div className="hero-button">
            <Link className="search-button" to={"/search"}>
              <span className="search-text">Search properties</span>
            </Link>
          </div>
        </section>
        <section className="favorites">
          <FavoriteGrid
            favorites={favorites}
            onRemove={removeFavorite}
            onClearAll={clearAllFavorites}
          />
        </section>
        <section className="about"></section>
      </main>
      <footer></footer>
    </>
  );
}

export default LandingPage;
