
Concerns:
1. Ensure session user can only edit/delete things that belong to them
2. On page refresh, Team page is dependent on currentUser, so if there are no teams on currentUser, it renders "please add a task to this team" in order to see their tasks. Might iterate over all users to find teams where the user is included in auth_users.
3. Do we want to link projects or keep them specific to each user?
4. How to debug locally since it appears the production build doesn't update automatically. It does on render, just not locally.


When trying to use rails s and npm start --prefix client
Failed to compile.

Failed to load config "react-app" to extend from.
Referenced from: /home/cody/code/labs/phase-5/trakable/client/package.json

Otherwise rails s works, but the build is outdated.




