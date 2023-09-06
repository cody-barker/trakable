import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../login/usersSlice'

function NavBar() {
    
    // const navigate = useNavigate()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLogout() {
        dispatch(logoutUser())
    }

    return(
        <nav id="navbar">   
            <NavLink className="nav-btn" to="/">My Tasks</NavLink>
            <button className="nav-btn-split" onClick={handleLogout}>
                Logout
            </button>
        </nav>
    )
}

export default NavBar