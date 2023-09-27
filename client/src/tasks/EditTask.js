import {useParams, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {useState} from 'react'
import {updateTask} from '../users/usersSlice'

function EditTask() {

    let {id} = useParams();
    id = parseInt(id);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const currentUser = useSelector((state) => state.users.currentUser)
    const projects = useSelector((state) => state.users.currentUser.projects)
    const tasks = projects.map((project) => project.tasks)
    const flattenedTasks = tasks.flat()
    const task = flattenedTasks.find((t) => t.id === id)
    const errors = useSelector((state) => state.users.errors)

    const allTeams = useSelector((state) => state.teams.entities)
    const allProjects = useSelector((state) => state.projects.entities)

    const userProjects = allProjects.filter((project) => project.creator_id === currentUser.id)
    const projectOptions = userProjects.map((project) => {
        return <option key={project.id} value={project.id}>{project.name}</option>
    })

    const userTeams = allTeams.filter((t) => t.auth_users.includes(currentUser.id))
    const teamOptions = userTeams.map((team) => {
        return <option key={team.id} value={team.id} name={team.name}>{team.name}</option>
    })

    const [inputState, setInputState] = useState({
        name: task.name,
        due_date: task.due_date,
        description: task.description,
        id: task.id
    });

    const {
        name,
        due_date,
        description,
    } = inputState;

    console.log(task)

    const [projectID, setProjectID] = useState(task.project_id)
    const [teamID, setTeamID] = useState(task.team_id)

    function onInputChange(e){
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        });
    };

    let formData = {
        id,
        name,
        due_date,
        description,
        project_id: projectID,
        team_id: teamID,
        user_id: currentUser.id
    }

    const errorComps = errors.map((userErrors, userIndex) => (
        <ul key={userIndex}>
          {userErrors.errors.map((error, index) => (
            <li className="error" key={index}>{error}</li>
          ))}
        </ul>
      ));

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(updateTask(formData));
    }

    function onProjectChange(e) {
        setProjectID(parseInt(e.target.value))
    }

    function onTeamChange(e) {
        setTeamID(parseInt(e.target.value))
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                {errorComps}
            <label>
                Task Name
                <input
                name="name"
                type="text"
                autoComplete="off"
                value={name}
                onChange={onInputChange}
                />
            </label>
            <label>
                Due Date
                <input
                name="due_date"
                type="date"
                autoComplete="off"
                value={due_date}
                onChange={onInputChange}
                />
            </label>
            <label>
                Description
                <input
                name="description"
                type="text"
                autoComplete="off"
                value={description}
                onChange={onInputChange}
                />
            </label>
            <label>
                Team
                <select onChange={onTeamChange} value={teamID}>
                    <option name="" value="">---Select a Team---</option>
                    {teamOptions}
                </select>
            </label>
            <label>Project
            <select onChange={onProjectChange} value={projectID}>
                    <option name="" value="">---Select a Project---</option>
                    {projectOptions}
                </select>
            </label>
            <button className="add-btn" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditTask