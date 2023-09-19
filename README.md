Standing Questions
1. How do I update other pieces of state like teams and projects, when a task is created?

For example:

If I create a new task by making a Post request to /tasks, and use user.tasks.create!, I can update currentUser.tasks with that payload. How do I then ensure the rest of my frontend state is appropriately updated? ie projects.tasks and teams.tasks should have this new task as well, right? Do I also need to update projects.users, projects.teams, teams.projects, and teams.users?

I don't believe I'm ever really calling on the full has_many relationship, ie user.projects

--Consider importing other dispatch into a slice so you can dispatch the payload
--When creating a task, return it nested in currentUser.projects.tasks and currentUser.teams.tasks instead of currentUser.tasks which isn't very helpful since it's an unorganized list of every task


2. How do I fetch projects and users after a user is authorized? Currently I need to skip authorize action in order to get them.

3. Do I separate tasks and users slice?




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



Handling undefined projects and teams when updating state with new tasks
1. Pass the project and the team as an object in the params object, alongside project_id and team_id.
2. Do this by setting state changes when an option changes, which in the background also updates two more params which get set to the object and not just the id.
2. This way, you have the project_id and the team_id for creating the task, you also have the objects in the payload so if they aren't currently associated, you can push them into user.projects and user.teams and then add the tasks to each of those
3. Check if the project and team are already passed back in the payload