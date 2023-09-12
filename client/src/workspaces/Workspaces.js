import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

function Workspaces() {

    const allWorkspaces = useSelector((state) => state.workspaces.entities)
    console.log(allWorkspaces)
    const currentUser = useSelector((state) => state.users.currentUser)
    const userWorkspaces = allWorkspaces.filter((workspace) => workspace.creator_id === currentUser.id)
    const userWorkspacesComps = userWorkspaces.map((workspace) => {
        return <NavLink to={`/workspaces/${workspace.id}`} key={workspace.id}>{workspace.name}</NavLink>
    })


    return(
        <div>
            Workspaces
            <br></br>
            {userWorkspacesComps}
        </div>
    )
}

export default Workspaces