import { MdStar, MdHome, MdAccessTime, MdVerified } from "react-icons/md";
import "./AgentCard.css";

/**
 * AgentCard component displays detailed information about a real estate agent.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.agent - The agent data to be displayed.
 * @param {string} props.agent.name - The full name of the agent.
 * @param {number} props.agent.rating - The agent's rating, used to display a "Top Agent" badge if >= 4.8.
 * @param {string} props.agent.specialization - The agent's area of specialization (e.g., Residential, Commercial).
 * @param {string} props.agent.location - The geographical location of the agent.
 * @param {number} props.agent.properties - The number of properties sold by the agent.
 * @param {number} props.agent.experience - The years of experience the agent has in the real estate industry.
 *
 * @returns {JSX.Element} A styled card component displaying the agent's information, including their initials,
 * rating, specialization, location, properties sold, experience, and a contact button.
 *
 * @example
 * const agent = {
 *   name: "John Doe",
 *   rating: 4.9,
 *   specialization: "Residential",
 *   location: "New York",
 *   properties: 50,
 *   experience: 10
 * };
 *
 * <AgentCard agent={agent} />
 */
function AgentCard({ agent }) {
  return (
    <div className="agent-card">
      <div className="agent-header">
        <div className="agent-initials">
          {agent.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        {agent.rating >= 4.8 && (
          <div className="verified-badge">
            <MdVerified />
            <span>Top Agent</span>
          </div>
        )}
      </div>
      <div className="agent-info">
        <h3>{agent.name}</h3>
        <div
          className={`specialization-badge ${agent.specialization.toLowerCase()}`}
        >
          {agent.specialization}
        </div>
        <p className="location">{agent.location}</p>
        <div className="stats">
          <div className="rating">
            <MdStar className="icon" />
            <span>{agent.rating}</span>
          </div>
          <div className="properties-sold">
            <MdHome className="icon" />
            <span>{agent.properties}</span>
          </div>
          <div className="experience">
            <MdAccessTime className="icon" />
            <span>{agent.experience}</span>
          </div>
        </div>
        <button className="contact-btn">Contact Agent</button>
      </div>
    </div>
  );
}

export default AgentCard;
