import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../data/simulatedDatabase";

/**
 * Login component handles the user login functionality.
 *
 * This component maintains state variables for the username, password, and message.
 * It provides handlers for form submission and input changes.
 * On successful login, it stores the username in local storage and navigates to the home page.
 *
 * @component
 * @example
 * return (
 *   <Login />
 * )
 *
 * @returns {JSX.Element} The rendered login component.
 *
 * @function
 * @name Login
 *
 * @description
 * - Uses `useState` to manage state for username, password, and message.
 * - Uses `useNavigate` from `react-router-dom` for navigation.
 *
 * @function handleLogin
 * Handles the login form submission.
 * @param {Event} event - The form submission event.
 * @returns {void}
 *
 * @function handleUsernameChange
 * Updates the username state on input change.
 * @param {Event} event - The input change event.
 * @returns {void}
 *
 * @function handlePasswordChange
 * Updates the password state on input change.
 * @param {Event} event - The input change event.
 * @returns {void}
 */
function Login() {
  // State variables for username password and message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  // Handle login form submission
  function handleLogin(event) {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const result = loginUser(username, password); // Attempt to log in with entered credentials
      setMessage(result.message); // Display the result message

      if (result.success) {
        localStorage.setItem("loggedInUser", username); // Sotres the currently logged in user.

        // Redirect to home page after a delay to simulate API response time
        setTimeout(() => {
          navigate("/home");
        }, 2000); // to imitate an api request
      } else {
      }
    } catch (error) {
      // Handle errors and update message
      setMessage("An error occurred during login. Please try again.");
      console.error("Login error:", error);
    }
  }

  // Update the username state on input change
  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  // Update the password state on input change
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <div className="auth-section">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            autoComplete="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="password"
          />
        </div>
        <button type="submit" className="auth-button">
          Login
        </button>
      </form>
      {message && (
        <p
          className={`message ${
            message.includes("successful") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default Login;
