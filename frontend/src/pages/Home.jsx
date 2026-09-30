import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to Hometown Hub</h1>

      <p>Connect with your hometown community.</p>

      <Link to="/login">
        <button>Login</button>
      </Link>

      <Link to="/register">
        <button>Register</button>
      </Link>

      <Link to="/dashboard">
        <button>Dashboard</button>
      </Link>
    </div>
  );
}

export default Home;