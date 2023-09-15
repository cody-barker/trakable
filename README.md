Standing Questions
1. How do I update other pieces of state like teams and projects, when a task is created?

For example:

If I create a new task by making a Post request to /tasks, and use user.tasks.create!, I can update currentUser.tasks with that payload. How do I then ensure the rest of my frontend state is appropriately updated? ie projects.tasks and teams.tasks should have this new task as well, right? Do I also need to update projects.users, projects.teams, teams.projects, and teams.users?

I don't believe I'm ever really calling on the full has_many relationship, ie user.projects

2. How do I fetch projects and users after a user is authorized? Currently I need to skip authorize action in order to get them.

3. Do I separate tasks and users slice?