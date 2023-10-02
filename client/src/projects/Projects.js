import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import ProjectForm from './ProjectForm';

function Projects() {
  const currentUser = useSelector((state) => state.users.currentUser);
  const allProjects = useSelector((state) => state.projects.entities);
  const userFirstName = currentUser.first_name;
  const userNamePossessive = userFirstName.endsWith('s')
    ? `${userFirstName}'`
    : `${userFirstName}'s`;

  const createdProjects = allProjects.filter(
    (project) => project.creator_id === currentUser.id
  );

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
        {createdProjects.length > 0 ? (
          createdProjects.map((project) => (
            <NavLink
              className="nav-links"
              to={`/projects/${project.id}`}
              key={project.id}
            >
              {project.name}
            </NavLink>
          ))
        ) : (
          <p>Please create a project.</p>
        )}
      </div>
    </div>
  );
}

export default Projects;