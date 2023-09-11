import {useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {useState} from 'react'
import ProjectForm from './ProjectForm'

function Projects() {

    // //user projects
    const currentUser = useSelector((state) => state.users.currentUser)
    // const userProjects = currentUser.projects.map((project) => {
    //     return project
    // })
    // const uniqUserProjects = []
    // const map = new Map();
    // for (const project of userProjects) {
    //     if(!map.has(project.id)) {
    //         map.set(project.id, true);
    //         uniqUserProjects.push({
    //             id: project.id,
    //             name: project.name,
    //             description: project.description,
    //             creator_id: project.creator_id
    //         })
    //     }
    // }
    // const userProjectComps = uniqUserProjects.map((project) => {
    //     return <NavLink to={`/projects/${project.id}`} key={project.id}>{project.name}</NavLink>
    // // })

    //all projects
    const allProjects = useSelector((state) => state.projects.entities)
    // const allProjectComps = allProjects.map((project) => {
    //     return <NavLink to={`/projects/${project.id}`} key={project.id}>{project.name}</NavLink>
    // })
    console.log(allProjects)
    //projects the current user has created
    const createdProjects = allProjects.filter((project) => project.creator_id === currentUser.id)
    const createdProjectComps = createdProjects.map((project) => {
        return <NavLink to={`/projects/${project.id}`} key={project.id}>{project.name}</NavLink>
    })

    const [vis, setVis] = useState(false)

    function handleClick() {
        setVis(!vis)
    }

    return (
        <div>
            <button onClick={handleClick}>+ Add Project</button>
            {vis ? <ProjectForm /> : null}
            {/* <h4>My Projects with Tasks</h4>
            {userProjectComps} */}
            <h4>Projects I've Created</h4>
            {createdProjectComps}
            {/* <h4>All Projects</h4>
            {allProjectComps} */}
        </div>
    )
}

export default Projects