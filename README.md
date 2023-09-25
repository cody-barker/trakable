
Outstanding issues:
1. Might need to find a way to validate that only a users projects need to have unique names
2. Ensure session user can only edit/delete things that belong to them
3. On page refresh, Team page is dependent on currentUser, so if there are no teams on currentUser, it renders "please add a task to this team" in order to see their tasks
4. Do we want to link projects or keep them specific to each user?
5. When using the app on render, page refreshes or url navigation to /projects renders the backend route, not the frontend route.
6. Now that the app is deployed, rails s will run the app, but it has the same issues as the live version. Using npm start --prefix client and rails s produces an error:

"Failed to load config "react-app" to extend from.
Referenced from: /home/cody/code/labs/phase-5/trakable/client/package.json"

What appears to be happening is that our backend and frontend routes are overlapping, so refreshing the page on /projects makes a GET request instead of navigating.



