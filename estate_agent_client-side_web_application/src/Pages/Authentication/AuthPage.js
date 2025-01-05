import Login from "../../Components/AuthComponents/Login";
import Register from "../../Components/AuthComponents/Register";
import "./AuthPage.css";

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
