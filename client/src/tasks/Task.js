// import { useSelector} from 'react-redux'
// import { useParams, NavLink, useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { deleteTask } from '../users/usersSlice'

// function Task() {
    
//     let {id} = useParams()
//     id = parseInt(id)
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const users = useSelector((state) => state.users.entities)
//     const currentUser = useSelector((state) => state.users.currentUser)
//     const user = users.find((u) => u.id === currentUser.id)
//     if (!user) {
//         return <div>"Loading..."</div>
//     }
//     const teams = user.teams
//     const tasks = teams.map((team) => team.tasks)
//     const flattenedTasks = tasks.flat()
//     const task = flattenedTasks.find((t) => t.id === id)
//     if (!task) {
//         return <div>You are not authorized to view this task.</div>
//     }

//     const {
//         name,
//         description,
//         due_date,
//         project_id,
//         team_id,
//         user_id
//     } = task
 
//     const project = user.projects.find((p) => p.id === project_id)
//     const team = user.teams.find((t) => t.id === team_id)
//     const taskUser = users.find((u) => u.id === task.user_id)

//     const today = new Date();
//     const yesterday = new Date();
//     yesterday.setDate(yesterday.getDate() - 1); 

//     // Format today's date
//     const yyyyToday = today.getFullYear();
//     let mmToday = today.getMonth() + 1;
//     let ddToday = today.getDate();

//     if (ddToday < 10) ddToday = '0' + ddToday;
//     if (mmToday < 10) mmToday = '0' + mmToday;
//     const formattedToday = yyyyToday + "-" + mmToday + "-" + ddToday;

//     // Format yesterday's date
//     const yyyyYesterday = yesterday.getFullYear();
//     let mmYesterday = yesterday.getMonth() + 1;
//     let ddYesterday = yesterday.getDate();

//     if (ddYesterday < 10) ddYesterday = '0' + ddYesterday;
//     if (mmYesterday < 10) mmYesterday = '0' + mmYesterday;
//     const formattedYesterday = yyyyYesterday + "-" + mmYesterday + "-" + ddYesterday;

//     let dueDateText = due_date;
//     let dueDateColor = ''; // Empty string for default color

//     if (formattedToday === due_date) {
//         dueDateText = 'Today';
//         dueDateColor = 'green';
//     } else if (formattedYesterday === due_date) {
//         dueDateText = 'Yesterday';
//         dueDateColor = 'red';
//     } else if (new Date(due_date) < today) {
//         dueDateColor = 'red';
//     }

//     function handleComplete() {
//         dispatch(deleteTask(id))
//         navigate(-1)
//     }

//     function handleEdit() {
//         navigate(`/tasks/${id}/edit`)
//     }
   
//     return (
//         <div className="task-container">
//             <div>
//                 {currentUser.id === user_id ? <button className="btn" onClick={handleComplete}>Complete Task</button> : null} &nbsp;
//                 {currentUser.id === user_id ? <button className="btn" onClick={handleEdit}>Edit Task</button> : null}
//             </div>
//             <div className="task-attr">{taskUser.username}</div>
//             <div className="task-attr">
//                 {name}
//             </div>
//             <div><span className="task-attr">Due: </span><span style={{ color: dueDateColor }}>
//                 {dueDateText}
//             </span></div>
//             {project ? <div className="task-attr">Project: <NavLink className="task-card" to={`/projects/${project.id}`}>{project.name}</NavLink></div> : null}
//             <div className="task-attr">Team: <NavLink className="task-card" to={`/teams/${team.id}`}>{team.name}</NavLink></div>
//             <div className="task-attr">Description: {description} </div>
//         </div>
//     )
// }

// export default Task

import { useSelector} from 'react-redux'
import { useParams, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteTask } from '../users/usersSlice'

function Task() {
    
    let {id} = useParams()
    id = parseInt(id)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users.entities)
    const currentUser = useSelector((state) => state.users.currentUser)
    const teams = currentUser.teams
    const tasks = teams.map((team) => team.tasks)
    const flattenedTasks = tasks.flat()
    const task = flattenedTasks.find((t) => t.id === id)
    if (!task) {
        return <div>You are not authorized to view this task.</div>
    }

    const {
        name,
        description,
        due_date,
        project_id,
        team_id,
        user_id
    } = task
 
    const project = currentUser.projects.find((p) => p.id === project_id)
    const team = currentUser.teams.find((t) => t.id === team_id)
    const taskUser = users.find((u) => u.id === task.user_id)

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); 

    // Format today's date
    const yyyyToday = today.getFullYear();
    let mmToday = today.getMonth() + 1;
    let ddToday = today.getDate();

    if (ddToday < 10) ddToday = '0' + ddToday;
    if (mmToday < 10) mmToday = '0' + mmToday;
    const formattedToday = yyyyToday + "-" + mmToday + "-" + ddToday;

    // Format yesterday's date
    const yyyyYesterday = yesterday.getFullYear();
    let mmYesterday = yesterday.getMonth() + 1;
    let ddYesterday = yesterday.getDate();

    if (ddYesterday < 10) ddYesterday = '0' + ddYesterday;
    if (mmYesterday < 10) mmYesterday = '0' + mmYesterday;
    const formattedYesterday = yyyyYesterday + "-" + mmYesterday + "-" + ddYesterday;

    let dueDateText = due_date;
    let dueDateColor = ''; // Empty string for default color

    if (formattedToday === due_date) {
        dueDateText = 'Today';
        dueDateColor = 'green';
    } else if (formattedYesterday === due_date) {
        dueDateText = 'Yesterday';
        dueDateColor = 'red';
    } else if (new Date(due_date) < today) {
        dueDateColor = 'red';
    }

    function handleComplete() {
        dispatch(deleteTask(id))
        navigate(-1)
    }

    function handleEdit() {
        navigate(`/tasks/${id}/edit`)
    }
   
    return (
        <div className="task-container">
            <div>
                {currentUser.id === user_id ? <button className="btn" onClick={handleComplete}>Complete Task</button> : null} &nbsp;
                {currentUser.id === user_id ? <button className="btn" onClick={handleEdit}>Edit Task</button> : null}
            </div>
            <div className="task-attr">{taskUser.username}</div>
            <div className="task-attr">
                {name}
            </div>
            <div><span className="task-attr">Due: </span><span style={{ color: dueDateColor }}>
                {dueDateText}
            </span></div>
            {project ? <div className="task-attr">Project: <NavLink className="task-card" to={`/projects/${project.id}`}>{project.name}</NavLink></div> : null}
            <div className="task-attr">Team: <NavLink className="task-card" to={`/teams/${team.id}`}>{team.name}</NavLink></div>
            <div className="task-attr">Description: {description} </div>
        </div>
    )
}

export default Task