
Concerns:
1. Navigate away from task edit form if no errors
2. Navigate away from creates if there are no errors
3. When updating a task to a new project or team, if the user doesn't have any tasks on that project or team yet, they aren't able to switch them.

usersSlice.js:263 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'id')
    at tasks/updateTask/fulfilled (usersSlice.js:263:1)

4. Refactor




