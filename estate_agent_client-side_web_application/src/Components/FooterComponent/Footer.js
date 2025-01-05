import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>
            We are a leading real estate agency committed to providing the best
            services to our clients.
          </p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <Link className="link" to={"/home"}>
                <span>Home</span>
              </Link>
              {/* <a href="/home">Home</a> */}
            </li>
            <li>
              <Link className="link" to={"/search"}>
                <span>Search Properties</span>
              </Link>
              {/* <a href="/search">Search Properties</a> */}
            </li>
            <li>
              <Link className="link" to={"/find-agent"}>
                <span>Find Agents</span>
              </Link>
              {/* <a href="/find-agent">Find Agent</a> */}
            </li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>Email: info@realestate.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2023 Real Estate | All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;
