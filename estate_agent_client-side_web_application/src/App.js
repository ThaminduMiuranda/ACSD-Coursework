import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import FindAgent from "./Pages/FindAgent/FindAgent";
import SearchProperty from "./Pages/SearchProperty/SearchProperty";
import AuthPage from "./Pages/Authentication/AuthPage";
import PropertyDetails from "./Pages/PropertyDetails/PropertyDetails";

/**
 * Main routing component for the estate agent web application.
 * Sets up browser routing and defines paths to different pages in the application.
 * Routes include:
 * - /auth: Authentication page
 * - /: Landing page (redirects to home)
 * - /home: Landing page
 * - /search: Property search page
 * - /find-agent: Agent finder page
 * - /search/properties/:id.html: Property details page accessed from search
 * - /home/properties/:id.html: Property details page accessed from home
 * @returns {JSX.Element} A BrowserRouter component containing all application routes
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        {/* redirect the default route to /home */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/search" element={<SearchProperty />} />
        <Route path="/find-agent" element={<FindAgent />} />
        <Route
          path="/search/properties/:id.html"
          element={<PropertyDetails />}
        />
        <Route path="/home/properties/:id.html" element={<PropertyDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
