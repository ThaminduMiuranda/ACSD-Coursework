import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Navbar from "../../Components/NavbarComponent/Navbar";
import "react-tabs/style/react-tabs.css";
import "./PropertyDetails.css";

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
      <Navbar />
      {property && (
        <>
          <h1>{property.type}</h1>
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
          <Tabs forceRenderTabPanel>
            <TabList>
              <Tab>Description</Tab>
              <Tab>Floor Plan</Tab>
              <Tab>Map</Tab>
            </TabList>
            <TabPanel>
              <p>{property.description}</p>
              <p>
                <strong>Location:</strong> {property.location}
              </p>
              <p>
                <strong>Price:</strong> £{property.price}
              </p>
              <p>
                <strong>Bedrooms:</strong> {property.bedrooms}
              </p>
              <p>
                <strong>Tenure:</strong> {property.tenure}
              </p>
            </TabPanel>
            <TabPanel>
              <img src={floorPlan} alt="Floor Plan" />
            </TabPanel>
            <TabPanel>
              {/* <iframe
                ref={mapRef}
                id="google-map"
                title="google-map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  property.location
                )}&output=embed`}
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              /> */}
              <iframe
                ref={mapRef}
                id="google-map"
                title="google-map"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </TabPanel>
          </Tabs>
        </>
      )}
      {/* <p>
        <strong>Location:</strong> {property.location}
      </p>
      <p>
        <strong>Price:</strong> £{property.price}
      </p>
      <p>
        <strong>Bedrooms:</strong> {property.bedrooms}
      </p>
      <p>
        <strong>Tenure:</strong> {property.tenure}
      </p> */}
    </div>
  );
}

export default PropertyDetails;
