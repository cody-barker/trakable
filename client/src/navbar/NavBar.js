import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../login/usersSlice'

function NavBar() {
    
    const dispatch = useDispatch()

    function handleLogout() {
        dispatch(logoutUser())
    }

    return(
        <nav id="navbar">   
            <NavLink className="nav-btn" to="/">My Tasks</NavLink>
            <NavLink className="nav-btn" to="/projects">Projects</NavLink>
            <button className="nav-btn-split" onClick={handleLogout}>
                Logout
            </button>
        </nav>
    )
}

export default NavBar