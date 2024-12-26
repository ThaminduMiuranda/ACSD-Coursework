// const simulatedDatabase = {
//   users: [
//     {
//       username: "thamindu",
//       password: "2003",
//     },
//   ],
// };

function loadDatabase() {
  const data = localStorage.getItem("users");
  return data ? JSON.parse(data) : [];
}

function saveDatabase(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

export function registerUser(username, password) {
  const users = loadDatabase();

  const userExists = users.some((user) => user.username === username);

  if (userExists) {
    return { success: false, message: "User already exists." };
  }

  users.push({ username, password });
  saveDatabase(users);

  return { success: true, message: "Registration successful." };
}

export function loginUser(username, password) {
  const users = loadDatabase();
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  return user
    ? { success: true, message: "Login successful." }
    : { success: false, message: "Invalid username or password." };
}
