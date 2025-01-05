import { useState } from "react";
import { registerUser } from "../../data/simulatedDatabase";
import { useNavigate } from "react-router-dom";

/**
 * Register component handles user registration.
 *
 * This component maintains state variables for username, password, and message.
 * It provides form submission handling, input change handling, and user feedback.
 *
 * @component
 * @example
 * return (
 *   <Register />
 * )
 *
 * @returns {JSX.Element} The rendered Register component.
 *
 * @function
 * @name Register
 *
 * @description
 * The Register component renders a registration form with fields for username and password.
 * It handles form submission, attempts to register the user, and provides feedback messages.
 * On successful registration, it stores the username in localStorage and redirects to the home page.
 *
 * @hook
 * @name useState
 * @description Manages state variables for username, password, and message.
 *
 * @hook
 * @name useNavigate
 * @description Provides navigation functionality to redirect users.
 *
 * @function
 * @name handleRegister
 * @description Handles the registration form submission.
 * @param {Event} event - The form submission event.
 *
 * @function
 * @name handleUsernameChange
 * @description Updates the username state on input change.
 * @param {Event} event - The input change event.
 *
 * @function
 * @name handlePasswordChange
 * @description Updates the password state on input change.
 * @param {Event} event - The input change event.
 */
function Register() {
  // State variables for username, password, and message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  // Handle registration form submission
  function handleRegister(event) {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const result = registerUser(username, password); // Attempt to register the user

      setMessage(result.message); // Display the result message

      if (result.success) {
        localStorage.setItem("loggedInUser", username); // Store registered user in localStorage

        // Clear the form fields
        setUsername("");
        setPassword("");

        // Redirect to home page after a delay to simulate server response time
        setTimeout(() => {
          navigate("/home");
        }, 2000); //The delay is used to simulate server response time and provide a better user experience.
      }
    } catch (error) {
      // Handle errors and update message
      setMessage("An error occurred during registration. Please try again.");
      console.error("Registration error:", error);
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
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="create-username">Create Username:</label>
          <input
            id="create-username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            autoComplete="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="create-password">Create Password:</label>
          <input
            id="create-password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="new-password"
          />
        </div>
        <button type="submit" className="auth-button">
          Register
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

export default Register;
