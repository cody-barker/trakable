
Concerns:
1. Ensure session user can only edit/delete things that belong to them
2. On page refresh, Team page is dependent on currentUser, so if there are no teams on currentUser, it renders "please add a task to this team" in order to see their tasks. Might iterate over all users to find teams where the user is included in auth_users.
3. Do we want to link projects or keep them specific to each user?
4. How to debug locally since it appears the production build doesn't update automatically. It does on render, just not locally.





