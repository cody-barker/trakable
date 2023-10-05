import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import ProjectForm from './ProjectForm';

function Projects() {
  const currentUser = useSelector((state) => state.users.currentUser);
  const userFirstName = currentUser.first_name;
  const userNamePossessive = userFirstName.endsWith('s')
    ? `${userFirstName}'`
    : `${userFirstName}'s`;

  const projectComps = currentUser.projects.map((project) => {
    if (project.tasks.length > 0) {
      return (
        <NavLink
              className="nav-links"
              to={`/projects/${project.id}`}
              key={project.id}
            >
              {project.name}
        </NavLink>
      )
    }
  })

  const [vis, setVis] = useState(false);

  const toggleVisibility = () => {
    setVis(!vis);
  };

  return (
    <div>
      <button className="add-btn" onClick={toggleVisibility}>
        {!vis ? "+ Add Project" : "Cancel"}
      </button>
      <div className="links-container">
        {vis && <ProjectForm vis={vis} setVis={setVis} />}
        <h4>{userNamePossessive} Projects</h4>
        {projectComps}
      </div>
    </div>
  );
}

export default Projects;