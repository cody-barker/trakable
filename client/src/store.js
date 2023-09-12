import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./users/usersSlice";
import projectsReducer from "./projects/projectsSlice"
import workspacesReducer from "./workspaces/workspacesSlice"

const store = configureStore({
  reducer: {
    users: usersReducer,
    projects: projectsReducer,
    workspaces: workspacesReducer
  },
});

export default store;