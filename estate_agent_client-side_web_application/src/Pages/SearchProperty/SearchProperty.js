import { useEffect, useState } from "react";
import Navbar from "../../Components/NavbarComponent/Navbar";
// import PropertyCard from "../../Components/PropertyListComponents/PropertyCard/PropertyCard";
import PropertyGrid from "../../Components/PropertyListComponents/PropertyGrid/PropertyGrid";

function SearchProperty() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("/properties.json")
      .then((Response) => Response.json())
      .then((data) => setProperties(data.properties))
      .catch((error) => console.error("Error fetching properties", error));
  }, []);

  return (
    <>
      <Navbar />
      <PropertyGrid properties={properties} />
    </>
  );
}

export default SearchProperty;
