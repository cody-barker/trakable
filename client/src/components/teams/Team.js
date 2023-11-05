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
    <div className="margin-left-10">
      <div className="card yellow">
        <h4 className="title">{team.name}</h4>
        <p className="title">{team.description}</p>
      </div>
      {sortedTaskComps.length > 0 && (
        <table>
          <thead>
            <tr className="table-row">
              <th className="blue"></th>
              <th className="orange">Task</th>
              <th className="pink">Due</th>
              <th className="yellow">Assignee</th>
              <th className="green">Project</th>
              <th className="blue"></th>
            </tr>
          </thead>
          <tbody>{sortedTaskComps}</tbody>
        </table>
      )}
    </div>
  );
}

export default Team;