
function TaskCard({task}) {

    const {
        name,
        due_date,
        description
    } = task

    return(
        <div>
            {name} {due_date}
        </div>
    )
}

export default TaskCard