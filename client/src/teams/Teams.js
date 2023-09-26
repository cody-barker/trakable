// import { useSelector } from 'react-redux'
// import { NavLink } from 'react-router-dom'
// import { useState } from 'react'
// import TeamForm from './TeamForm'

// function Teams() {

//     const currentUser = useSelector((state) => state.users.currentUser)
//     const allTeams = useSelector((state) => state.teams.entities)
    
//     const userTeams = allTeams.filter((team) => team.creator_id === currentUser.id)
//     const userTeamsComps = userTeams.map((team) => {
//         return <NavLink to={`/teams/${team.id}`} key={team.id}>{team.name}</NavLink>
//     })

//     const [vis, setVis] = useState(false)
//     function handleVis() {
//         setVis(!vis)
//     }

//     return(
//         <div>
//             <button onClick={handleVis}>+ Add Team</button>
//             {vis ? <TeamForm vis={vis} setVis={setVis}/> : null}
//             <br></br>
//             <h4>Teams I've Created</h4>
//             {userTeamsComps}
//         </div>
//     )
// }

// export default Teams

import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import TeamForm from './TeamForm'

function Teams() {

    const [vis, setVis] = useState(false)
    const currentUser = useSelector((state) => state.users.currentUser)
    const allTeams = useSelector((state) => state.teams.entities)
    const userTeams = allTeams.filter((team) => team.auth_users.includes(currentUser.id))
    const userTeamsComps = userTeams.map((team) => {
        return <NavLink to={`/teams/${team.id}`} key={team.id}>{team.name}</NavLink>
    })

    function handleVis() {
        setVis(!vis)
    }

    return(
        <div>
            <button className="add-btn" onClick={handleVis}>+ Add Team</button>
            {vis ? <TeamForm vis={vis} setVis={setVis}/> : null}
            <br></br>
            <h4>My Teams</h4>
            {userTeamsComps}
        </div>
    )
}

export default Teams