import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../users/usersSlice'


function NavBar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.users.currentUser)
    const {id, first_name} = currentUser

    function handleLogout() {
        dispatch(logoutUser())
        navigate("/")
    }

    return(
        <nav id="navbar">
            <NavLink className="nav-btn" to="/">{first_name}'s Tasks</NavLink>
            <NavLink className="nav-btn" to={`/users/${id}/projects`}>Projects</NavLink>
            <NavLink className="nav-btn" to={`/users/${id}/teams`}>Teams</NavLink>
            <button className="nav-btn-split" onClick={handleLogout}>
                Logout
            </button>
        </nav>
    )
}

export default NavBar