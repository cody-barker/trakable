import { useParams, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Workspace() {

    let {id} = useParams();
    id = parseInt(id)
    const allWorkspaces = useSelector((state) => state.workspaces.entities)
    const workspace = allWorkspaces.find((workspace) => workspace.id === id)
    const uniqueProjects = new Set()
    workspace.projects.forEach((project) => {
        uniqueProjects.add(project.name)
    })
    console.log(uniqueProjects)
    //need to create an array of uniq projects from the workspace.projects
    const projects = Array.from(uniqueProjects).map((projectName) => {
        const project = workspace.projects.find((project) => project.name === projectName)
        return (<NavLink to={`/projects/${project.id}`} key={project.id}>{project.name}</NavLink>)
    })

    return(
        <div>
            {workspace.name} Workspace
            <br></br>
            Projects<br></br>
            {projects}
        </div>
    )
}

export default Workspace