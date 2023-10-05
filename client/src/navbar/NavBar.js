import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../users/usersSlice'


function NavBar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.users.currentUser)
    const {id, first_name} = currentUser
    const userFirstName = first_name;
    const userNamePossessive = userFirstName.endsWith('s') ? `${userFirstName}'` : `${userFirstName}'s`;

    function handleLogout() {
        dispatch(logoutUser())
        navigate("/")
    }

    return(
        <nav id="navbar">
            <NavLink className="nav-btn" to="/">{userNamePossessive} Tasks</NavLink>
            <NavLink className="nav-btn" to={`/projects`}>Projects</NavLink>
            <NavLink className="nav-btn" to={`/teams`}>Teams</NavLink>
            <button className="nav-btn-split" onClick={handleLogout}>
                Logout
            </button>
        </nav>
    )
}

export default NavBar