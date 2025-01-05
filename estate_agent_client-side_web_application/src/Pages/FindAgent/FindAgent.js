import { useState, useEffect } from "react";
import Navbar from "../../Components/NavbarComponent/Navbar";
import Footer from "../../Components/FooterComponent/Footer";
import AgentSearch from "../../Components/AgentComponents/AgentSearch/AgentSearch";
import "./FindAgent.css";
import AgentGrid from "../../Components/AgentComponents/AgentGrid.css/AgentGrid";

/**
 * Renders the FindAgent page of the real estate application.
 *
 * This component maintains two state variables:
 * 1. `agents` holding the original list of agent objects.
 * 2. `filteredAgents` storing the filtered list displayed in the UI.
 *
 * Upon the first render, the useEffect hook simulates fetching a static array of
 * agent data and saves it to `agents` and `filteredAgents`.
 *
 * The filtering logic in `handleSearch` compares user-defined criteria (location
 * substring match, specialization match, and minimum rating threshold) against the
 * stored `agents` to produce an updated `filteredAgents` list.
 *
 * The returned JSX includes:
 * - A header with page title and a navigation bar.
 * - A main section displaying a heading, a brief description, and a search form via the AgentSearch component.
 * - A grid of agents displayed through the AgentGrid component, populated using `filteredAgents`.
 * - A footer at the bottom of the page.
 *
 * @returns {JSX.Element} The JSX content for the FindAgent page, including the heading, search form, and agent grid.
 */
function FindAgent() {
  // 'agents' holds the entire agent list; 'filteredAgents' holds agents after filtering
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);

  useEffect(() => {
    // Simulated data fetched on component mount
    const Agents = [
      {
        id: "1",
        name: "Sarah Johnson",
        specialization: "Residential",
        location: "London",
        rating: 4.8,
        properties: 24,
        experience: "8 years",
      },
      {
        id: "2",
        name: "James Wilson",
        specialization: "Commercial",
        location: "Manchester",
        rating: 4.6,
        properties: 31,
        experience: "12 years",
      },
      {
        id: "3",
        name: "Emma Thompson",
        specialization: "Luxury",
        location: "Edinburgh",
        rating: 4.9,
        properties: 18,
        experience: "15 years",
      },
      {
        id: "4",
        name: "Michael Chen",
        specialization: "Investment",
        location: "Birmingham",
        rating: 4.7,
        properties: 42,
        experience: "10 years",
      },
      {
        id: "5",
        name: "Sophie Carter",
        specialization: "Residential",
        location: "Bristol",
        rating: 4.5,
        properties: 27,
        experience: "5 years",
      },
      {
        id: "6",
        name: "David O'Connor",
        specialization: "New-Development",
        location: "Glasgow",
        rating: 4.8,
        properties: 35,
        experience: "9 years",
      },
    ];
    // Store data in state
    setAgents(Agents);
    setFilteredAgents(Agents);
  }, []);

  // Filters agents by matching location, specialization, and minimum rating
  const handleSearch = (criteria) => {
    const filtered = agents.filter(
      (agent) =>
        (!criteria.location ||
          agent.location
            .toLowerCase()
            .includes(criteria.location.toLowerCase())) &&
        (!criteria.specialization ||
          agent.specialization === criteria.specialization) &&
        agent.rating >= criteria.minRating
    );
    setFilteredAgents(filtered);
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="find-agent-main">
        <div className="agents-header">
          <h1>Find Your Perfect Agent</h1>
          <p>Connect with experienced real estate professionals</p>
        </div>

        <section className="agent-search">
          <AgentSearch onSearch={handleSearch} />
        </section>

        <section className="agent-grid">
          <AgentGrid agents={filteredAgents} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default FindAgent;
