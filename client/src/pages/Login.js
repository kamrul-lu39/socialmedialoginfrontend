import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { loginWithGoogle, user } = useAuth();

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Login</h2>
      {!user ? (
        <button onClick={loginWithGoogle} style={{ padding: "10px", fontSize: "16px" }}>
          Login with Google
        </button>
      ) : (
        <p>Welcome, {user.displayName}!</p>
      )}
    </div>
  );
};

export default Login;
