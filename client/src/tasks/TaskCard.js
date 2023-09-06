
function TaskCard({task}) {

    const {
        name,
        due_date,
        description
    } = task
    
    return(
        <li>
            {name}
        </li>
    )
}

export default TaskCard