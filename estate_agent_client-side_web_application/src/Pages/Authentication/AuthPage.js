import Login from "../../Components/AuthComponents/Login";
import Register from "../../Components/AuthComponents/Register";
import "./AuthPage.css";

/**
 * Authentication page component that renders login and registration forms
 * @component
 * @returns {JSX.Element} A container with login and registration forms
 */
function AuthPage() {
  return (
    <div className="auth-container">
      <div className="auth-forms">
        <Login />
        <Register />
      </div>
    </div>
  );
}

export default AuthPage;
