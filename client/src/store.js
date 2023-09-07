import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./login/usersSlice";
import tasksReducer from "./tasks/tasksSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    tasks: tasksReducer,
  },
});

export default store;