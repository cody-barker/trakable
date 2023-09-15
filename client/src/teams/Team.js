import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import TaskCard from "../tasks/TaskCard"

function Team() {

    let {id} = useParams();
    id = parseInt(id)
    const allTeams = useSelector((state) => state.teams.entities)
    const currentUser = useSelector((state) => state.users.currentUser)
    const team = allTeams.find((team) => team.id === id)
    const teamTasks = currentUser.tasks.filter((task) => task.team_id === id)
    const teamTaskComps = teamTasks.map((task) => <TaskCard key={task.id} task={task}/>)

    // const uniqueProjects = new Set()
    // team.projects.forEach((project) => {
    //     uniqueProjects.add(project.name)
    // })
    // //need to create an array of uniq projects from the Team.projects
    // const projects = Array.from(uniqueProjects).map((projectName) => {
    //     const project = team.projects.find((project) => project.name === projectName)
    //     return (<NavLink to={`/projects/${project.id}`} key={project.id}>{project.name}</NavLink>)
    // })

    return(
        <div>
            {team.name} Team
            <br></br>
            Tasks
            {teamTaskComps}
            {/* Projects<br></br>
            {projects} */}
        </div>
    )
}

export default Team