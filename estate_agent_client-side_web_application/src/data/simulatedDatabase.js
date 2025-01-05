// Load users from localStorage
function loadUsers() {
  const data = localStorage.getItem("users"); // Retrieve "users" data from localStorage
  return data ? JSON.parse(data) : []; // Parse the data if it exists, otherwise return an empty array
}

// Save users to localStorage
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users)); // Convert the users array to a JSON string and save it
}

/**
 * Registers a new user in the system.
 * @param {string} username - The username for the new user.
 * @param {string} password - The password for the new user.
 * @returns {Object} An object containing:
 *   - success {boolean} - Indicates if the registration was successful
 *   - message {string} - A descriptive message about the registration result
 * @throws {Error} If there's an error accessing or saving to the users storage
 */
export function registerUser(username, password) {
  const users = loadUsers(); // Load the existing users from localStorage

  // Check if the user already exists
  const userExists = users.some((user) => user.username === username);

  if (userExists) {
    // If the user exists, return a failure message
    return { success: false, message: "User already exists." };
  }

  // Add the new user to the users array
  users.push({ username, password });
  saveUsers(users); // Save the updated users array to localStorage

  // Return a success message
  return { success: true, message: "Registration successful." };
}

/**
 * Authenticates a user by checking their credentials against the stored users.
 *
 * @param {string} username - The username of the user trying to login
 * @param {string} password - The password of the user trying to login
 * @returns {Object} An object containing:
 *                   - success {boolean} - Indicates if the login was successful
 *                   - message {string} - A message describing the result of the login attempt
 */
export function loginUser(username, password) {
  const users = loadUsers(); // Load the existing users from localStorage

  // Find a user matching the provided username and password
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  // Return success if the user is found, otherwise return a failure message
  return user
    ? { success: true, message: "Login successful." }
    : { success: false, message: "Invalid username or password." };
}
