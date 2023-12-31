import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteTask } from '../../state/usersSlice'
import { useSelector } from 'react-redux'
import circleCheckBtn from '../../assets/circle-check-btn.svg'
import editBtn from '../../assets/edit-btn.svg'

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

    const currentUser = useSelector((state) => state.users.currentUser)
    const users = useSelector((state) => state.users.entities)
    const user = users.find((u) => u.id === user_id)

    if (!user) {
        return <tr><td>"Loading..."</td></tr>
    }

    const project = user.projects.find((p) => p.id === project_id)

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
                    <img className="checkbox-icon" src={circleCheckBtn} />
                </button>
                ) : null}
            </td>
            <td>
                <NavLink className="task-link" to={`/tasks/${id}`}>
                {name}
                </NavLink>
            </td>
            <td><span style={{ color: dueDateColor }}>{dueDateText}</span></td>
            <td>{user.username}</td>
            <td>
                <NavLink className="task-link" to={`/projects/${project.id}`}>
                    {project.name}
                </NavLink>
            </td>
            <td className="no-right-border">
                {currentUser.id === user_id ? (
                <button className="icon-container" onClick={handleEdit}>
                    <img className="edit-icon" src={editBtn} />
                </button>
                ) : null}
            </td>
        </tr>
    );
}

export default TeamTaskCard;