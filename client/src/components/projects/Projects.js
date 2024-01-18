import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import ProjectForm from './ProjectForm';

function Projects() {
  const currentUser = useSelector((state) => state.users.currentUser);

  const projectComps = currentUser.projects.map((project) => {
    if (project.tasks.some(task => task.user_id === currentUser.id)) {
      return (
        <div key={project.id} className="card green">
          <NavLink className="nav-links" to={`/projects/${project.id}`}>
            {project.name}
          </NavLink>
        </div>
      );
    } else {
      return null
    }
  })

  const [vis, setVis] = useState(false);

  const toggleVisibility = () => {
    setVis(!vis);
  };

  return (
    <div className="flex-container">
      <button className="add-btn" onClick={toggleVisibility}>
        {!vis ? '+' : '-'}
      </button>
      <div className="links-container">
        {vis && <ProjectForm vis={vis} setVis={setVis} />}
        <h4>Projects</h4>
        {projectComps}
      </div>
    </div>
  );
}

export default Projects;