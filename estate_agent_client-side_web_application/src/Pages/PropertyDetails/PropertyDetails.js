import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Navbar from "../../Components/NavbarComponent/Navbar";
import "react-tabs/style/react-tabs.css";
import "./PropertyDetails.css";

function PropertyDetails() {
  const { id } = useParams(); // matches 'properties/:id.html'
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch("/properties.json")
      .then((response) => response.json())
      .then((data) => {
        const found = data.properties.find((p) => p.id === id);
        setProperty(found);
      })
      .catch((error) => console.error("Error fetching property data:", error));
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="property-page">
      <Navbar />
      <h1>{property.type}</h1>
      <div className="image-gallery">
        <img src={property.picture} alt="" srcset="" />
      </div>
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <p>{property.longDescription}</p>
        </TabPanel>
        <TabPanel>
          <img src={property.floorPlan} alt="Floor Plan" />
        </TabPanel>
        <TabPanel>
          <iframe
            title="google-map"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              property.location
            )}&output=embed`}
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          />
        </TabPanel>
      </Tabs>
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
    </div>
  );
}

export default PropertyDetails;
