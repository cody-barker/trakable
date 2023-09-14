<!--

How to Associate Projects, Workspaces, Users and Tasks

Options:
1. When a User creates a task, they select a project and workspace from the list via selects
    Those selects have values of the project_id and the workspace_id
    This creates the has_many relationship between models bc now the task has all 3 ids

2. A user must first navigate to a workspace, and then a project in order to create a task
    In this way, the URL params contain the workspace_id and the project_id which can be passed
    in the task post request as state

-----------------------------------------------------------------------------------------------

How does a User create a project or Workspace and view a list of only those projects and          workspaces they created?

1.  When creating a project or workspace, include a creator_id column that passes the session   [:user_id]
    When rendering list of projects or workspaces, do so by filtering over state.projects.entities and returning only those
    whose creator_id === session[:user_id]

>


Troubleshooting Rendering Uniq Projects

Issues:

Trying to Display Only User Projects with Tasks
1. When a user creates a task and selects a new project, the new task persists in the db, but frontend state doesn't rerender the new project on the project page under My Projects with Tasks.
Same happens when a user completes a task, it isn't removed until a refresh.


When a task is created with a project the team has not used yet, and navigating to a Team's page of projects, it won't display the new project until refreshed.
- When the task is submitted, team state isn't updated
- When a task is submitted, update currentUser.tasks, and also ensure that the project is added to the teams state

When a task is submitted:
1. 


Standing Questions
1. How do I update other pieces of state like teams and projects, when a task is created?
2. How do I fetch projects and users after a user is authorized? Currently I need to skip authorize action in order to get them.
3. Do I separate tasks and users slice?