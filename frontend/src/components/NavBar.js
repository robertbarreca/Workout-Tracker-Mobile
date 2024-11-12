import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <div className="container">
        <div className="nav-links">
          <Link to="/">
            <h1>Home</h1>
          </Link>
          <Link to="/addworkout">
            <h1>Add Workout</h1>
          </Link>
          <Link to="/feed">
            <h1>Feed</h1>
          </Link>
        </div>
        <nav className="auth-links">
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign Up</Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
