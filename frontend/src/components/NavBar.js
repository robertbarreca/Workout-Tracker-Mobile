import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const NavBar = () => {
  const {logout} = useLogout()
  const handleClick = () => {
    logout()
  }

  const {user} = useAuthContext()
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
          {user && (
            <div>
            <span>{user.username} </span>
            <button onClick={handleClick}>Logout</button>
            </div>
          )}

          {!user && (
            <div>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
