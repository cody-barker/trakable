import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../users/usersSlice'


function NavBar() {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLogout() {
        dispatch(logoutUser())
        navigate("/")
    }

    const currentUser = useSelector((state) => state.users.currentUser)
    const {id} = currentUser

    return(
        <nav id="navbar">
            <NavLink className="nav-btn" to="/">{currentUser.first_name}'s Tasks</NavLink>
            <NavLink className="nav-btn" to={`/users/${id}/projects`}>Projects</NavLink>
            <NavLink className="nav-btn" to={`/users/${id}/teams`}>Teams</NavLink>
            <button className="nav-btn-split" onClick={handleLogout}>
                Logout
            </button>
        </nav>
    )
}

export default NavBar