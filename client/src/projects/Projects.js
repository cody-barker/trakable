//On the Projects page, I want to see a list of all the projects I am apart of
//On the Teams page I want to see all teams I am apart of
//Later on I'll handle seeing everyone else's projects and workspaces
//How do I render only projects which I belong to on this page?

import {useSelector} from 'react-redux'

function Projects() {

    const currentUser = useSelector((state) => state.users.currentUser)
    const userProjects = currentUser.projects.map((project) => {
        return project
    })
    const projectComps = userProjects.map((project) => {
        return <div key={project.id}>{project.name}</div>
    })
    // const projects = useSelector((state) => state.projects.entities)
    // const projectComps = projects.map((project) => {
    //     return <div key={project.id}>{project.name}</div>
    // })

    console.log(currentUser)
    console.log(userProjects)
    // const myProjects = currentUser.project

    return (
        <div>
            {projectComps}
        </div>
    )
}

export default Projects