import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../state/usersSlice";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout() {
    dispatch(logoutUser());
    navigate("/");
  }

  return (
    <nav id="navbar">
      <div className="flex-container">
        <div className="nav-items__primary">
          <NavLink className="nav-btn orange" to="/">
            Tasks
          </NavLink>
          <NavLink className="nav-btn green" to={`/projects`}>
            Projects
          </NavLink>
          <NavLink className="nav-btn yellow" to={`/teams`}>
            Teams
          </NavLink>
        </div>
        <div className="nav-items__secondary">
          <button className="nav-btn blue" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
