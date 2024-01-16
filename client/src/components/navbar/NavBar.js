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
      <div className="navbar__primary">
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
      <div className ="navbar__secondary">
        <button className="nav-btn blue right" onClick={handleLogout}>
            Logout
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
