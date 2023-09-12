import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

function Teams() {

    const allTeams = useSelector((state) => state.teams.entities)
    console.log(allTeams)
    const currentUser = useSelector((state) => state.users.currentUser)
    const userTeams = allTeams.filter((team) => team.creator_id === currentUser.id)
    const userTeamsComps = userTeams.map((team) => {
        return <NavLink to={`/Teams/${team.id}`} key={team.id}>{team.name}</NavLink>
    })


    return(
        <div>
            Teams
            <br></br>
            {userTeamsComps}
        </div>
    )
}

export default Teams