import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./login/usersSlice";
import projectsReducer from "./projects/projectsSlice"

const store = configureStore({
  reducer: {
    users: usersReducer,
    projects: projectsReducer
  },
});

export default store;