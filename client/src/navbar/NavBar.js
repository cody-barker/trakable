import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../users/usersSlice'

function NavBar() {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLogout() {
        dispatch(logoutUser())
        navigate("/")
    }

    return(
        <nav id="navbar">   
            <NavLink className="nav-btn" to="/">My Tasks</NavLink>
            <NavLink className="nav-btn" to="/projects">Projects</NavLink>
            <NavLink className="nav-btn" to="/teams">Teams</NavLink>
            <button className="nav-btn-split" onClick={handleLogout}>
                Logout
            </button>
        </nav>
    )
}

export default NavBar