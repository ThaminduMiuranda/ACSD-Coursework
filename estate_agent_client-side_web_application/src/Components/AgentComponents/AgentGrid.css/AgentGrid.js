import AgentCard from "../AgentCard/AgentCard";
import "./AgentGrid.css";

/**
 * Renders a grid of agent cards or a no-results message based on the provided agents array.
 *
 * @param {Object[]} agents - An array of agent objects to be displayed.
 * @returns {JSX.Element} A JSX element representing either a grid of AgentCard components or a no-results message.
 */
function AgentGrid({ agents }) {
  // If no agents match the criteria
  if (!agents.length) {
    return (
      <div className="no-results">
        <h3>No agents found</h3>
        <p>Try adjusting your search criteria</p>
      </div>
    );
  }

  // Render a grid of agent cards
  return (
    <div className="agents-grid">
      {agents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
}

export default AgentGrid;
