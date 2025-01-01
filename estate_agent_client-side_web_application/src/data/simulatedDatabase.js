// const simulatedDatabase = {
//   users: [
//     {
//       username: "thamindu",
//       password: "2003",
//     },
//   ],
// };

function loadUsers() {
  const data = localStorage.getItem("users");
  return data ? JSON.parse(data) : [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

export function registerUser(username, password) {
  const users = loadUsers();

  const userExists = users.some((user) => user.username === username);

  if (userExists) {
    return { success: false, message: "User already exists." };
  }

  users.push({ username, password });
  saveUsers(users);

  return { success: true, message: "Registration successful." };
}

export function loginUser(username, password) {
  const users = loadUsers();
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  return user
    ? { success: true, message: "Login successful." }
    : { success: false, message: "Invalid username or password." };
}
