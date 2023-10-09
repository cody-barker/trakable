import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProjectTaskCard from '../tasks/ProjectTaskCard';

function Project() {
  const { id } = useParams();
  const projectId = parseInt(id);

  const currentUser = useSelector((state) => state.users.currentUser);
  const project = currentUser.projects.find((p) => p.id === projectId);
  const tasks = project ? project.tasks : [];
  const sortedTasks = tasks.slice().sort((a, b) => {
    const dateA = new Date(a.due_date);
    const dateB = new Date(b.due_date);
    return dateA - dateB;
  });

  const notFoundMessage = <div>Project not found.</div>;

  if (!project) {
    return notFoundMessage;
  }

  const taskComps = sortedTasks.map((task) => (
    <ProjectTaskCard key={task.id} task={task} />
  ));

  return (
    <div>
      <h4 className="title">Project: {project.name}</h4>
      <p className="title">Description: {project.description}</p>
      {taskComps.length > 0 && (
        <table>
          <thead>
            <tr className="table-row">
              <th></th>
              <th>Task</th>
              <th>Due Date</th>
              <th>Assignee</th>
              <th>Title</th>
              <th>Team</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{taskComps}</tbody>
        </table>
      )}
    </div>
  );
}

export default Project;