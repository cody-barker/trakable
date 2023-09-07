import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./login/usersSlice";
import tasksReducer from "./tasks/tasksSlice";
import projectsReducer from "./projects/projectsSlice"

const store = configureStore({
  reducer: {
    users: usersReducer,
    tasks: tasksReducer,
    projects: projectsReducer,
  },
});

export default store;