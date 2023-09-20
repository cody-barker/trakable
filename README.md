




How to View Team Tasks
1. When creating a Team, push the session[:user_id] into a column called auth_users that takes an array of integers
2. Use a button on the team page to invite users via email to the team and push their id into the auth_users array
3. Render a list of user names from the auth_users array to the page to see all team members
4. Find all the users by their ids in the auth_users array
5. For each user, filter their tasks where the task.team_id === team.id and render those to the page
6. Ensure the team tasks include the user's name



Outstanding issues:
1. Might need to find a way to validate that only a users projects need to have unique names
2. App doesn't refetch when new user signs in
3. How do I fetch projects, teams and users after a user is authorized? Currently I need to skip authorize action in order to get them.
4. Ensure session user can only edit/delete things that belong to them
5. On page refresh, Team page is dependent on currentUser, so if there are no teams on currentUser, it renders "please add a task to this team" in order to see their tasks
6. Do we want to link projects or keep them specific to each user?