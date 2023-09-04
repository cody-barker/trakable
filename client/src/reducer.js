import { combineReducers } from "redux";
import usersReducer from "./login/usersSlice";

const rootReducer = combineReducers({
  users: usersReducer,
});

export default rootReducer;
