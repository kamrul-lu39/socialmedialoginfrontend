import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "10px", background: "#333", color: "white" }}>
      <Link to="/" style={{ margin: "10px", color: "white" }}>Home</Link>
      <Link to="/dashboard" style={{ margin: "10px", color: "white" }}>Dashboard</Link>
      {!user ? (
        <Link to="/login" style={{ margin: "10px", color: "white" }}>Login</Link>
      ) : (
        <button onClick={logout} style={{ margin: "10px", color: "white" }}>Logout</button>
      )}
    </nav>
  );
};

export default Navbar;
