

1. How do I fetch projects, teams and users after a user is authorized? Currently I need to skip authorize action in order to get them.


Creating Teams
*make an initial fetch request for all users when app mounts
*when a team is created, pass the currentUser.id as a param and add it to the team.auth_users array

1. add_column :teams, :auth_users, :id, array: true, default: []
2. create a "team invite button" on any team you've created
3. when clicked, that button opens a form asking for a users email
4. email input and team id are controlled. the team id is grabbed from params
        
        let id = useParams()
        id = parseInt(id)        //this is the team id
        const [email, setEmail] = useState(")
        const teams = useSelector((state) => state.teams.entities)
        const [team, setTeam] = useState(null)
        const users = useSelector((state) => state.users.entities)
        let user = users.find((u) => u.email === email)

        handleSubmit(e){
            e.preventDefault()
            setTeam(teams.find((t) => t.id === id))
            const updatedTeam = {
                ...team,
                auth_users: [...team.auth_users, user.id]
            }
            setTeam(updatedTeam)
            dispatch(inviteUser(updatedTeam))
        }

5. in the teamsSlice, create an async action creator:

        export const inviteUser = createAsyncThunk("teams/inviteUser", (payload) => {
            return fetch(`/teams/${payload.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            .then((r) => r.json())
        })

6. in the teams reducer:

    [inviteUser.pending](state) {
        state.status = "loading";
        },
    [inviteUser.fulfilled](state, action) {
        state.status = "idle";
        const team = state.entities.find((t) => t.id === action.payload.id)
        const team = action.payload
        }


How to View Team Tasks
1. When creating a Team, push the session[:user_id] into a column called auth_users that takes an array of integers
2. Use a button on the team page to invite users via email to the team and push their id into the auth_users array
3. Render a list of user names from the auth_users array to the page to see all team members
4. Find all the users by their ids in the auth_users array
5. For each user, filter their tasks where the task.team_id === team.id and render those to the page
6. Ensure the team tasks include the user's name



Outstanding issues:
1. Might need to find a way to validate that only a users projects need to have unique names
2. Users can now invite members to teams, but need to render the user names and tasks to the page
3. Errors persist on the page when a user invites a teammate
4. App doesn't refetch when new user signs in