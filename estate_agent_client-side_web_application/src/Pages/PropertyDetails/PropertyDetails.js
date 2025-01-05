import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom";

import Navbar from "../../Components/NavbarComponent/Navbar";
import "react-tabs/style/react-tabs.css";
import "./PropertyDetails.css";
import { MdBed, MdLocationPin } from "react-icons/md";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Footer from "../../Components/FooterComponent/Footer";

/**
 * @component PropertyDetails
 * @description Renders a detailed view of a property with images, information, floor plan, and location map.
 * The component fetches property data based on URL parameters and manages the display of multiple property images,
 * tabbed content sections, and an interactive Google Maps embed.
 *
 * @uses {useParams} - React Router hook to get property ID from URL
 * @uses {useState} - React hook for managing component state
 * @uses {useEffect} - React hook for handling side effects
 * @uses {useRef} - React hook for maintaining references
 *
 * State Management:
 * - property: Stores the fetched property data
 * - activeImage: Tracks which property image is currently displayed
 *
 * Features:
 * - Image gallery with thumbnails
 * - Property details display (type, location, bedrooms, price)
 * - Tabbed interface for:
 *   - Property description
 *   - Interactive floor plan with zoom capability
 *   - Google Maps location view
 * - Responsive map sizing
 * - Buy/Rent button based on property type
 *
 * @returns {JSX.Element} A comprehensive property details page including images,
 * details, description, floor plan, and location map
 *
 * @example
 * <PropertyDetails />
 */
function PropertyDetails() {
  const { id } = useParams(); // matches 'properties/:id.html'
  const [property, setProperty] = useState(null);
  const mapRef = useRef(null);

  // Track which image is active (key matches images object)
  const [activeImage, setActiveImage] = useState("mainimage");

  useEffect(() => {
    fetch("/properties.json")
      .then((response) => response.json())
      .then((data) => {
        const found = data.properties.find((p) => p.id === id);
        setProperty(found);
      })
      .catch((error) => console.error("Error fetching property data:", error));
  }, [id]);

  useEffect(() => {
    // Load map when component mounts
    if (!property) return;
    const mapElement = mapRef.current;
    if (mapElement) {
      mapElement.src = `https://www.google.com/maps?q=${encodeURIComponent(
        property.location
      )}&output=embed`;
      console.log("Map loaded");
    }

    // Unload map on page exit
    return () => {
      if (mapElement) {
        // mapElement.src = "";
        console.log("Map unloaded");
      }
    };
  }, [property]);

  useEffect(() => {
    const adjustMapSize = () => {
      const mapElement = mapRef.current;
      if (mapElement) {
        mapElement.style.height = window.innerWidth < 640 ? "300px" : "450px";
      }
    };

    window.addEventListener("resize", adjustMapSize);
    adjustMapSize(); // Initial adjustment

    return () => window.removeEventListener("resize", adjustMapSize);
  }, []);

  const images = {
    mainimage: `/img/${id}.jpg`,
    livingroom: `/img/${id}/livingroom.jpg`,
    kitchen: `/img/${id}/kitchen.jpg`,
    bedroom: `/img/${id}/bedroom.jpg`,
    bathroom: `/img/${id}/bathroom.jpg`,
  };

  const floorPlan = `/img/floorplans/${id}.jpg`;

  if (!property) {
    return <div>Loading...</div>;
  }

  // Handle thumbnail click
  function handleImageClick(imageKey) {
    setActiveImage(imageKey);
  }

  return (
    <div className="property-page">
      <div>
        <header>
          <Navbar />
        </header>
        <main className="property-main">
          {property && (
            <div className="details-wrapper">
              <div className="sub-details-wrapper">
                <div className="image-gallery">
                  <div
                    className="mainimage"
                    style={{
                      backgroundImage: `url(${images[activeImage]})`,
                    }}
                  />
                  <div className="side-panel">
                    {Object.keys(images).map((key) => (
                      <div
                        key={key}
                        className={`side-image ${
                          activeImage === key ? "active" : ""
                        }`}
                        style={{
                          backgroundImage: `url(${images[key]})`,
                        }}
                        onClick={() => handleImageClick(key)}
                      />
                    ))}
                  </div>
                </div>
                <div className="sub-details">
                  <div className="general">
                    <h1>{property.type}</h1>
                    <div className="location-and-bed">
                      <p className="location-p">
                        <MdLocationPin className="icon" /> {property.location}
                      </p>
                      <p className="bedroom-p">
                        <MdBed className="icon" /> {property.bedrooms}
                      </p>
                    </div>
                    <div className="day">
                      <strong>Date added:</strong>
                      <span>{property.added.day}</span>
                      <span>{property.added.month}</span>
                      <span>{property.added.year}</span>
                    </div>
                  </div>
                  <p className="tenure-p">
                    <span>Tenure:</span> {property.tenure}
                  </p>
                  <div className="price-details">
                    <span className="price-type">
                      {property.type === "House" ? "Price:" : "Rent:"}
                    </span>
                    <span className="price">
                      £{property.price}
                      <span>{property.type === "House" ? "" : "/ night"}</span>
                    </span>
                  </div>
                  <Link className="buy-button" to={""}>
                    {property.type === "House" ? "Buy" : "Rent"}
                  </Link>
                </div>
              </div>
              <Tabs forceRenderTabPanel>
                <TabList>
                  <Tab>Description</Tab>
                  <Tab>Floor Plan</Tab>
                  <Tab>Map</Tab>
                </TabList>
                <TabPanel>
                  <div className="description-div">
                    <span>Property Description</span>
                    <p className="property-description">
                      {property.description}
                    </p>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="floor-plan-container">
                    <div className="topic">
                      <span>Floor Plan of the </span>
                      <span>scroll to zoom in</span>
                    </div>
                    <div>
                      <TransformWrapper
                        initialScale={1}
                        initialPositionX={0}
                        initialPositionY={0}
                        wheel={{ step: 0.1 }}
                        pinch={{ step: 5 }}
                      >
                        <TransformComponent>
                          <img
                            className="floor-plan"
                            src={floorPlan}
                            alt="Floor Plan"
                          />
                        </TransformComponent>
                      </TransformWrapper>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel>
                  <iframe
                    ref={mapRef}
                    id="google-map"
                    className="map"
                    title="google-map"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                </TabPanel>
              </Tabs>
            </div>
          )}
        </main>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default PropertyDetails;
