import {NavLink, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {deleteTask} from '../users/usersSlice'
import { useSelector } from 'react-redux'

function TeamTaskCard({task}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        name,
        due_date,
        id,
        project_id,
        team_id,
        user_id
    } = task

    //limit characters for task name
    const maxCharacters = 40;
    const truncatedName = name.length > maxCharacters ? `${name.substring(0, maxCharacters)}...` : name;
    
    const users = useSelector((state) => state.users.entities)
    const currentUser = useSelector((state) => state.users.currentUser)
    const user = users.find((u) => u.id === user_id)
    if (!user) {
        return <tr><td>"Loading..."</td></tr>
    }
    const project = user.projects.find((p) => p.id === project_id)
    const team = user.teams.find((t) => t.id === team_id)
    function handleComplete() {
        dispatch(deleteTask(id))
    }

    function handleEdit() {
        navigate(`/tasks/${id}/edit`)
    }

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); 

    // Format today's date
    const yyyyToday = today.getFullYear();
    let mmToday = today.getMonth() + 1;
    let ddToday = today.getDate();

    if (ddToday < 10) ddToday = '0' + ddToday;
    if (mmToday < 10) mmToday = '0' + mmToday;
    const formattedToday = yyyyToday + "-" + mmToday + "-" + ddToday;

    // Format yesterday's date
    const yyyyYesterday = yesterday.getFullYear();
    let mmYesterday = yesterday.getMonth() + 1;
    let ddYesterday = yesterday.getDate();

    if (ddYesterday < 10) ddYesterday = '0' + ddYesterday;
    if (mmYesterday < 10) mmYesterday = '0' + mmYesterday;
    const formattedYesterday = yyyyYesterday + "-" + mmYesterday + "-" + ddYesterday;

    let dueDateText = due_date;
    let dueDateColor = ''; // Empty string for default color

    if (formattedToday === due_date) {
        dueDateText = 'Today';
        dueDateColor = 'green'; // Apply green color for today
    } else if (formattedYesterday === due_date) {
        dueDateText = 'Yesterday';
        dueDateColor = 'red'; // Apply red color for yesterday
    } else if (new Date(due_date) < today) {
        dueDateColor = 'red'; // Apply red color for dates earlier than today
    }
    
    return(
        <tr className="table-row">
            <td>{user.username}</td>
            <td><NavLink className="task-card" to={`/tasks/${id}`}>{truncatedName}</NavLink></td>
            <td><span style={{ color: dueDateColor }}>{dueDateText}</span></td>
            <td><NavLink className="task-card" to={`/projects/${project.id}`}>{project.name}</NavLink></td>
            <td>
                {currentUser.id === user_id ? <button className="icon-container" onClick={handleComplete}><img className="checkbox-icon" src="https://cdns.iconmonstr.com/wp-content/releases/preview/2018/240/iconmonstr-check-mark-circle-thin.png"/></button> : null}
                {currentUser.id === user_id ? <button className="icon-container" onClick={handleEdit}><img className="edit-icon" src="https://cdns.iconmonstr.com/wp-content/releases/preview/7.8.0/240/iconmonstr-pencil-text-lined.png"/></button> : null}
            </td>
        </tr>
    )
}

export default TeamTaskCard