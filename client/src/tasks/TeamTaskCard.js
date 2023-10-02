import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteTask } from '../users/usersSlice'
import { useSelector } from 'react-redux'

function TeamTaskCard({ task }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        name,
        due_date,
        id,
        project_id,
        team_id,
        user_id
    } = task;

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

    const getDueDateTextAndColor = () => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const formattedToday = formatDate(today);
        const formattedYesterday = formatDate(yesterday);

        if (formattedToday === due_date) {
            return { text: 'Today', color: 'green' };
        } else if (formattedYesterday === due_date) {
            return { text: 'Yesterday', color: 'red' };
        } else if (new Date(due_date) < today) {
            return { text: due_date, color: 'red' };
        }

        return { text: due_date, color: '' };
    };

    const formatDate = (date) => {
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return `${yyyy}-${mm}-${dd}`;
    };

    const { text: dueDateText, color: dueDateColor } = getDueDateTextAndColor();

    return (
        <tr className="table-row">
            <td>
                {currentUser.id === user_id ? (
                <button className="icon-container" onClick={handleComplete}>
                    <img className="checkbox-icon" src="https://cdns.iconmonstr.com/wp-content/releases/preview/2018/240/iconmonstr-check-mark-circle-thin.png" />
                </button>
                ) : null}
            </td>
            <td>
                <NavLink className="task-card" to={`/tasks/${id}`}>
                {truncatedName}
                </NavLink>
            </td>
            <td>
                <span style={{ color: dueDateColor }}>{dueDateText}</span>
            </td>
            <td>{user.username}</td>
            <td>
                {user.title}
            </td>
            <td>
                {currentUser.id === user_id ? (
                <NavLink className="task-card" to={`/projects/${project.id}`}>
                    {project.name}
                </NavLink>
                ) : project.name}
            </td>
            <td>
                {currentUser.id === user_id ? (
                <button className="icon-container" onClick={handleEdit}>
                    <img className="edit-icon" src="https://cdns.iconmonstr.com/wp-content/releases/preview/7.8.0/240/iconmonstr-pencil-text-lined.png" />
                </button>
                ) : null}
            </td>
        </tr>
    );
}

export default TeamTaskCard;