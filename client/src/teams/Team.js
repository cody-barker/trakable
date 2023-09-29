import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TeamTaskCard from '../tasks/TeamTaskCard';
import { useState } from 'react';
import InviteForm from './InviteForm';

function Team() {
  let { id } = useParams();
  id = parseInt(id);
  const [vis, setVis] = useState(false);

  const users = useSelector((state) => state.users.entities);
  const currentUser = useSelector((state) => state.users.currentUser)
  const allTeams = useSelector((state) => state.teams.entities);
  const entTeam = allTeams.find((t) => t.id === id)
  const team = currentUser.teams.find((t) => t.id === id);
  const tasks = team ? team.tasks.map((t) => t) : [];

  const taskComps = tasks.map((task) => (
    <TeamTaskCard key={task.id} task={task} />
  ));

  if (entTeam && !entTeam.auth_users.includes(currentUser.id)) {
    return <div>Unauthorzied.</div>
  }

  if (!entTeam) {
    return <div>Team not found.</div>
  }

  if (!team) {
    return <div>Please add a task to this team.</div>;
  }

  const memberTeam = allTeams.find((t) => t.id === id);
  if (!memberTeam) {
    return <div>Loading...</div>;
  }

  const teamMembers = users.filter((u) =>
    memberTeam.auth_users.includes(u.id)
  );

  function handleVis() {
    setVis(!vis);
  }

  // Sort tasks based on due_date
  const sortedTaskComps = [...taskComps].sort((a, b) => {
    const dateA = new Date(a.props.task.due_date);
    const dateB = new Date(b.props.task.due_date);
    return dateA - dateB;
  });

  const table = (
    <table>
      <thead>
        <tr className="table-row">
          <th></th>
          <th>Task</th>
          <th>Due Date</th>
          <th>Assignee</th>
          <th>Project</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{sortedTaskComps ? sortedTaskComps : null}</tbody>
    </table>
  );

  return (
    <div>
      <h4 className="title">Team: {team.name}</h4>
      <p className="title">Description: {team.description}</p>
      <h4 className="title">
        Team Members{' '}
        {teamMembers.map((u) => (
          <li key={u.id}>{u.username}</li>
        ))}
      </h4>
      <button className="add-btn" onClick={handleVis}>
        {!vis ? 'Invite a Teammate' : 'Cancel'}
      </button>
      {vis ? <InviteForm /> : null}
      {sortedTaskComps.length > 0 ? table : null}
    </div>
  );
}

export default Team;