import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./users/usersSlice";
import projectsReducer from "./projects/projectsSlice"
import teamsReducer from "./teams/teamsSlice"

const store = configureStore({
  reducer: {
    users: usersReducer,
    projects: projectsReducer,
    teams: teamsReducer
  },
});

export default store;