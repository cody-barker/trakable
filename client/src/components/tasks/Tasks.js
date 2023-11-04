import { useSelector } from 'react-redux';
import MyTaskCard from './MyTaskCard';
import { useState } from 'react';
import TaskForm from './TaskForm';

function Tasks() {
  const currentUser = useSelector((state) => state.users.currentUser)
  const projects = useSelector((state) => state.users.currentUser.projects);
  const tasks = projects.map((project) => project.tasks);
  const flattenedTasks = tasks.flat();
  const filteredTasks = flattenedTasks.filter((task) => task.user_id === currentUser.id)

  const [vis, setVis] = useState(false);
  function handleClick() {
    setVis(!vis);
  }

  const sortedTaskCards = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.due_date);
    const dateB = new Date(b.due_date);
    return dateA - dateB;
  });

  const table = (
    <table>
      <thead>
        <tr className="table-row">
        <th></th>
          <th>Task</th>
          <th>Due Date</th>
          <th>Project</th>
          <th>Team</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sortedTaskCards.map((task) => (
          <MyTaskCard key={task.id} task={task} />
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <button onClick={handleClick} className="add-btn">
        {!vis ? '+ Add Task' : 'Cancel'}
      </button>
      {vis ? <TaskForm vis={vis} setVis={setVis} /> : null}
      <br></br>
      {sortedTaskCards.length > 0 ? (
        table
      ) : (
        <div className="note">Please add a task.</div>
      )}
    </div>
  );
}

export default Tasks;