import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-title">Event Platform</div>

      <div className="navbar-links">
        <Link to="/">Events</Link>

        {token ? (
          <>
            <Link to="/create">Create</Link>
            <Link to="/my-dashboard">Dashboard</Link>
            <a href="#" onClick={handleLogout}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
