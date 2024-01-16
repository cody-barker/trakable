import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../../state/usersSlice';
import circleCheckBtn from '../../assets/circle-check-btn.svg'
import editBtn from '../../assets/edit-btn.svg'

function TaskCard({ task }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    name,
    due_date,
    id,
    project_id,
    team_id
  } = task;

  const currentUser = useSelector((state) => state.users.currentUser);

  if (!currentUser) {
    return <tr><td>"Loading..."</td></tr>;
  }

  const project = currentUser.projects.find((p) => p.id === project_id);
  const team = currentUser.teams.find((t) => t.id === team_id);

  const handleComplete = () => {
    dispatch(deleteTask(id));
  };

  const handleEdit = () => {
    navigate(`/tasks/${id}/edit`);
  };

  function formatDueDate(dueDate) {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
  
    const formattedToday = formatDate(today);
    const formattedYesterday = formatDate(yesterday);
  
    let dueDateText = dueDate;
    let dueDateColor = '';
  
    if (formattedToday === dueDate) {
      dueDateText = 'Today';
      dueDateColor = 'green';
    } else if (formattedYesterday === dueDate) {
      dueDateText = 'Yesterday';
      dueDateColor = 'red';
    } else if (new Date(dueDate) < today) {
      dueDateColor = 'red';
    }
  
    return { dueDateText, dueDateColor };
  }
  
  function formatDate(date) {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
  
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
  
    return yyyy + '-' + mm + '-' + dd;
  }

  const { dueDateText, dueDateColor } = formatDueDate(due_date);

  return (
    <tr className="table-row">
      <td>
          <button className="icon-container" onClick={handleComplete}>
            <img
              className="checkbox-icon"
              src={circleCheckBtn}
            />
          </button>
      </td>
      <td>
        <NavLink className="task-link" to={`/tasks/${id}`}>
          {name}
        </NavLink>
      </td>
      <td>
        <span style={{ color: dueDateColor }}>{dueDateText}</span>
      </td>
      <td className="no-right-border">
          <button className="icon-container" onClick={handleEdit}>
            <img
              className="edit-icon"
              src={editBtn}
            />
          </button>
      </td>
    </tr>
  );
}

export default TaskCard;