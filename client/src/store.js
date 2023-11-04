import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./state/usersSlice";
import projectsReducer from "./state/projectsSlice"
import teamsReducer from "./state/teamsSlice"

const store = configureStore({
  reducer: {
    users: usersReducer,
    projects: projectsReducer,
    teams: teamsReducer
  },
});

export default store;