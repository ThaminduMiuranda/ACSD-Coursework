import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/NavbarComponent/Navbar";
import "./LandingPage.css";
import FavoriteGrid from "../../Components/FavoriteListComponents/FavoriteGrid/FavoriteGrid";
import Footer from "../../Components/FooterComponent/Footer";
import PropertyCard from "../../Components/PropertyListComponents/PropertyCard/PropertyCard";
import { MdArrowForward } from "react-icons/md";

function LandingPage() {
  function loadFavorites() {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  }

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("/properties.json")
      .then((Response) => Response.json())
      .then((data) => setProperties(data.properties))
      .catch((error) => console.error("Error fetching properties", error));
  }, []);

  const [favorites, setFavorites] = useState(loadFavorites());

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
        <section className="about">
          <h2>About Us</h2>
          <p>
            We are a leading real estate agency committed to providing the best
            services to our clients. Our mission is to help you find your dream
            home with ease and confidence.
          </p>
        </section>
        <section className="featured-properties">
          <h2>Featured Properties</h2>
          <div className="property-cards">
            {properties.slice(0, 3).map((property) => (
              <PropertyCard
                property={property}
                onAdd={addFavorite}
                onRemove={removeFavorite}
              />
            ))}
          </div>
        </section>
        <section className="favorites">
          <FavoriteGrid
            favorites={favorites}
            onAdd={addFavorite}
            onRemove={removeFavorite}
            allProperties={properties}
            onClearAll={clearAllFavorites}
            horizontal={true}
          />
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default LandingPage;
