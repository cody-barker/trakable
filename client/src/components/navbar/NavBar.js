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

  function toggleNav() {
    const menu = document.querySelector('.menu')
    const hamburgerBtn = document.querySelector('.hamburger-btn')
    const topNav = document.querySelector(".top-nav")
    if (menu.classList.contains("hidden-menu")) {
      menu.classList.add("responsive-menu");
      menu.classList.remove("hidden-menu")
      topNav.classList.add("flex-col")
      hamburgerBtn.innerHTML = "X"
    }
    else {
      menu.classList.add("hidden-menu")
      menu.classList.remove("responsive-menu")
      hamburgerBtn.innerHTML = "☰";
    }
  }

  return (
    <nav id="navbar">
      <div className="flex-container top-nav">
        <button className="hamburger-btn" onClick={toggleNav}>
          ☰
        </button>
        <div className="menu hidden-menu">
          <NavLink className="nav-btn orange" to="/">
            Tasks
          </NavLink>
          <NavLink className="nav-btn green" to={`/projects`}>
            Projects
          </NavLink>
          <NavLink className="nav-btn yellow" to={`/teams`}>
            Teams
          </NavLink>
          <button className="nav-btn blue" onClick={handleLogout}>
            Logout
          </button>
        </div>
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
