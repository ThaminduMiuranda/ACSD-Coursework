import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import FindAgent from "./Pages/FindAgent/FindAgent";
import SearchProperty from "./Pages/SearchProperty/SearchProperty";
import AuthPage from "./Pages/Authentication/AuthPage";
import PropertyDetails from "./Pages/PropertyDetails/PropertyDetails";

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
