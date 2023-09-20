import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import TaskCard from "../tasks/TaskCard"
import { useState } from 'react'
import InviteForm from './InviteForm'

function Team() {

    let {id} = useParams();
    id = parseInt(id)
    const [vis, setVis] = useState(false)
    const teams = useSelector((state) => state.users.currentUser.teams)
    const team = teams.find((p) => p.id === id)
    const tasks = team ? team.tasks.map((t) => t) : []
    const taskComps = tasks.map((task) => <TaskCard key={task.id} task={task}/>)

    function handleVis() {
        setVis(!vis)
    }
   
    if (!team) {
        return <div>Please add your first task to this team.</div>
    }

    return(
        <div>   
            <h4>{team.name}</h4>
            <button onClick={handleVis}>Invite a Teammate</button>
            {vis ? <InviteForm /> : null}
            {taskComps.length === 0 ? null : taskComps}
        </div>
    )
}

export default Team