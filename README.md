
Concerns:
1. Navigate away from task edit form if no errors
2. Consider allowing team members to view other users task details page and/or projects associated with that team
3. Change frontend routes for teams and projects to be like users/2/projects/1 with conditional rendering so if you go to that route and its not your project, you get an unauthorized message
4. 


4. When a user gets invited, create a default task for that user
5. Broke something after changing team tasks
6. Prevent users from accessing API on Render
7. Do I actually need a creator_id? Can I just use user_id?


Vue has a watcher to see if user_id or other attr change to fetch that for the new user




