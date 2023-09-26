import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TaskCard from '../tasks/TaskCard';
import { useState } from 'react';
import InviteForm from './InviteForm';

function Team() {
  let { id } = useParams();
  id = parseInt(id);
  const [vis, setVis] = useState(false);

  const users = useSelector((state) => state.users.entities);
  const teams = useSelector((state) => state.users.currentUser.teams);
  const allTeams = useSelector((state) => state.teams.entities);

  const team = teams.find((t) => t.id === id);
  const tasks = team ? team.tasks.map((t) => t) : [];

  const taskComps = tasks.map((task) => (
    <TaskCard key={task.id} task={task} />
  ));

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
          <th>Assignee</th>
          <th>Task</th>
          <th>Due Date</th>
          <th>Project</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{sortedTaskComps ? sortedTaskComps : null}</tbody>
    </table>
  );

  return (
    <div>
      <h4 className="title">{team.name}</h4>
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

// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import TaskCard from "../tasks/TaskCard";
// import { useState } from 'react';
// import InviteForm from './InviteForm';

// function Team() {
//     let { id } = useParams();
//     id = parseInt(id);
//     const [vis, setVis] = useState(false);
//     const users = useSelector((state) => state.users.entities);
//     const teams = useSelector((state) => state.teams.entities);
//     const currentUser = useSelector((state) => state.users.currentUser);

//     const team = teams.find((t) => t.id === id);
//     if (!team) {
//         return <div>Please add a task to this team.</div>;
//     }

//     //Find the team members
//     //to render the team members, we need to use the updated Team entity to find auth_users
//     const teamMembers = users.filter((u) => team.auth_users.includes(u.id));

//     //to render the teams tasks, we need to find all of the teams tasks and reduce them to unique tasks
//     const tasksByTeamMember = teamMembers.map((member) => {
//         const userTeam = member.teams.find((t) => t.id === id);
//         return userTeam ? userTeam.tasks : [];
//     });

//     // Flatten the tasks into a single array
//     const allTasks = [].concat(...tasksByTeamMember);

//     // Use a Set to store unique tasks
//     const uniqueTasks = new Set(allTasks);

//     // Convert the Set back to an array
//     const uniqueTasksArray = Array.from(uniqueTasks);

//     // Map tasks to TaskCard components
//     const taskComps = uniqueTasksArray.map((task) => (
//         <TaskCard key={task.id} task={task} />
//     ));
//     // const userTeam = currentUser.teams.find((t) => t.id === id)
//     // const tasksCreatedByTeamMembers = userTeam.tasks
    
//     // // Map tasks to TaskCard components
//     // const taskComps = tasksCreatedByTeamMembers.map((task) => (
//     //     <TaskCard key={task.id} task={task} />
//     // ));

//     function handleVis() {
//         setVis(!vis);
//     }

//     return (
//         <div>
//             <h4>{team.name}</h4>
//             <h4>Team Members {teamMembers.map((u) => <li key={u.id}>{u.username}</li>)}</h4>
//             {currentUser.id === team.creator_id ? <button onClick={handleVis}>Invite a Team Member</button> : null}
//             {vis ? <InviteForm /> : null}
//             <br />
//             {taskComps.length === 0 ? null : taskComps}
//         </div>
//     );
// }

// export default Team;

// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import TaskCard from "../tasks/TaskCard";
// import { useState } from 'react';
// import InviteForm from './InviteForm';

// function Team() {
//     let { id } = useParams();
//     id = parseInt(id);
//     const [vis, setVis] = useState(false);
//     const users = useSelector((state) => state.users.entities);
//     const teams = useSelector((state) => state.teams.entities);
//     const currentUser = useSelector((state) => state.users.currentUser);

//     const team = teams.find((t) => t.id === id);
//     if (!team) {
//         return <div>Please add a task to this team.</div>;
//     }

//     // Find the team members
//     const teamMembers = users.filter((u) => team.auth_users.includes(u.id));

//     // Find tasks for each team member
//     const tasksByTeamMember = teamMembers.map((member) => {
//         const userTeam = member.teams.find((t) => t.id === id);
//         return userTeam ? userTeam.tasks : [];
//     });

//     // Flatten the tasks into a single array
//     const allTasks = [].concat(...tasksByTeamMember);

//     // Use a Set to store unique task IDs
//     const uniqueTaskIds = new Set();

//     // Filter tasks to only include unique ones based on their IDs
//     const uniqueTasksArray = allTasks.filter((task) => {
//         if (!uniqueTaskIds.has(task.id)) {
//             uniqueTaskIds.add(task.id);
//             return true;
//         }
//         return false;
//     });

//     // Map tasks to TaskCard components
//     const taskComps = uniqueTasksArray.map((task) => (
//         <TaskCard key={task.id} task={task} />
//     ));

//     function handleVis() {
//         setVis(!vis);
//     }

//     return (
//         <div>
//             <h4>{team.name}</h4>
//             <h4>Team Members {teamMembers.map((u) => <li key={u.id}>{u.username}</li>)}</h4>
//             {currentUser.id === team.creator_id ? <button onClick={handleVis}>Invite a Team Member</button> : null}
//             {vis ? <InviteForm /> : null}
//             <br />
//             {taskComps.length === 0 ? null : taskComps}
//         </div>
//     );
// }

// export default Team;
