
Concerns:
1. Navigate away from task edit form if no errors
2. Change frontend routes for teams and projects to be like users/2/projects/1 with conditional rendering so if you go to that route and its not your project, you get an unauthorized message
3. When a user gets invited, consider creating a default task for that user
4. Might've broken something on render after changing team tasks
5. Prevent users from accessing API on Render
6. Fix async issues in MyTaskCard


Vue has a watcher to see if user_id or other attr change to fetch that for the new user




