import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../data/simulatedDatabase";

/**
 * Login component that handles user authentication.
 *
 * @component
 * @example
 * return (
 *   <Login />
 * )
 *
 * @returns {JSX.Element} The rendered login form component.
 *
 * @function
 * @name Login
 *
 * @description
 * This component renders a login form with fields for username and password.
 * It handles form submission, user input changes, and displays messages based on login success or failure.
 *
 * @property {string} username - The username input value.
 * @property {function} setUsername - Function to update the username state.
 * @property {string} password - The password input value.
 * @property {function} setPassword - Function to update the password state.
 * @property {string} message - The message to display after login attempt.
 * @property {function} setMessage - Function to update the message state.
 * @property {function} navigate - Function to navigate to different routes.
 *
 * @function handleLogin
 * @description Handles the form submission for login. Calls the loginUser function and updates the message state based on the result.
 * @param {Event} event - The form submission event.
 *
 * @function handleUsernameChange
 * @description Updates the username state when the input value changes.
 * @param {Event} event - The input change event.
 *
 * @function handlePasswordChange
 * @description Updates the password state when the input value changes.
 * @param {Event} event - The input change event.
 */
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    try {
      const result = loginUser(username, password);

      setMessage(result.message);
      if (result.success) {
        localStorage.setItem("loggedInUser", username); // Sotres the currently logged in user.
        setTimeout(() => {
          navigate("/home");
        }, 2000); // to imitate an api request
      } else {
      }
    } catch (error) {
      setMessage("An error occurred during login. Please try again.");
      console.error("Login error:", error);
    }
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

/**
 * Exporting the Login component as the default export.
 * This allows the component to be imported without specifying its name.
 */
export default Login;
