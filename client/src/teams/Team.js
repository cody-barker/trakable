import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TeamTaskCard from '../tasks/TeamTaskCard';

function Team() {
  const { id } = useParams();
  const teamId = parseInt(id);

  const currentUser = useSelector((state) => state.users.currentUser);
  const team = currentUser.teams.find((t) => t.id === teamId);
  const tasks = team ? team.tasks.map((t) => t) : [];

  if (!team) {
    return <div>Please create a task for this team to view it's tasks.</div>;
  }

  const taskComps = tasks.map((task) => (
    <TeamTaskCard key={task.id} task={task} />
  ));

  // Sort tasks based on due_date
  const sortedTaskComps = [...taskComps].sort((a, b) => {
    const dateA = new Date(a.props.task.due_date);
    const dateB = new Date(b.props.task.due_date);
    return dateA - dateB;
  });

  return (
    <div>
      <h4 className="title">Team: {team.name}</h4>
      <p className="title">Description: {team.description}</p>
      {sortedTaskComps.length > 0 && (
        <table>
          <thead>
            <tr className="table-row">
              <th></th>
              <th>Task</th>
              <th>Due Date</th>
              <th>Assignee</th>
              <th>Title</th>
              <th>Project</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{sortedTaskComps}</tbody>
        </table>
      )}
    </div>
  );
}

export default Team;