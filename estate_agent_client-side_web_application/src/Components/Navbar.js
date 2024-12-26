import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to={"/home"}>Dwello</Link>
      <Link to={"/search"}>Search Property</Link>
      <Link to={"/find-agent"}>Find Agent</Link>
      <Link to={"/auth"}>Login</Link>
    </nav>
  );
}

export default Navbar;
