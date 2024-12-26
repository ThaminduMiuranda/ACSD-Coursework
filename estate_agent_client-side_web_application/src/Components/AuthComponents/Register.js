import { useState } from "react";
import { registerUser } from "../../data/simulatedDatabase";
import { useNavigate } from "react-router-dom";

/**
 * Register component that handles user registration.
 *
 * @component
 * @example
 * return (
 *   <Register />
 * )
 *
 * @returns {JSX.Element} The rendered register form component.
 *
 * @function
 * @name Register
 *
 * @description
 * This component renders a registration form with fields for creating a username and password.
 * It handles form submission, user input changes, and displays messages based on registration success or failure.
 *
 * @property {string} username - The username input value.
 * @property {function} setUsername - Function to update the username state.
 * @property {string} password - The password input value.
 * @property {function} setPassword - Function to update the password state.
 * @property {string} message - The message to display after registration attempt.
 * @property {function} setMessage - Function to update the message state.
 * @property {function} navigate - Function to navigate to different routes.
 *
 * @function handleRegister
 * @description Handles the form submission for registration. Calls the registerUser function and updates the message state based on the result.
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
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleRegister(event) {
    event.preventDefault();

    try {
      const result = registerUser(username, password);

      setMessage(result.message);

      if (result.success) {
        setUsername("");
        setPassword("");

        setTimeout(() => {
          navigate("/home");
        }, 2000); //The delay is used to simulate server response time and provide a better user experience.
      }
    } catch (error) {
      setMessage("An error occurred during registration. Please try again.");
      console.error("Registration error:", error);
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
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="create-username">Create Username:</label>
          <input
            id="create-username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="create-password">Create Password:</label>
          <input
            id="create-password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
