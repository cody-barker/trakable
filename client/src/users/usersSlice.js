import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

//Action Creators
export const fetchCurrentUser = createAsyncThunk("users/fetchCurrentUser", () => {
    return fetch("/me")
    .then((r) => r.json())
})

export const fetchUsers = createAsyncThunk("users/fetchUsers", () => {
    return fetch("/users")
    .then((r) =>r.json())
})

export const loginUser = createAsyncThunk("users/loginUser", (payload) => {
    return fetch("/login", {
        method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
    })
    .then((r) => r.json())
})

export const signupUser = createAsyncThunk("users/signupUser", (payload) => {
    return fetch("/signup", {
        method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
    })
    .then((r) => r.json())
})

export const logoutUser = createAsyncThunk("users/logoutUser", () => {
    return fetch("/logout", {
        method: "DELETE"
    })
    .then((r) => {
        if (!r.ok) {
            throw new Error("Logout request failed");
        }
        return { success: true };
    })
})

export const createTask = createAsyncThunk("tasks/createTask", (payload) => {
    return fetch("/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then((r) => r.json())
})

export const deleteTask = createAsyncThunk("tasks/deleteTask", (payload) => {
    return fetch(`/tasks/${payload}`, {
        method: "DELETE"
    })
    .then((r) => r.json())
})

export const updateTask = createAsyncThunk("tasks/updateTask", (payload) => {
    return fetch(`/tasks/${payload.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then((r) => r.json())
})

//Reducer
const usersSlice = createSlice({
    name: "users",
    initialState: {
        status: "idle",
        entities: [],
        currentUser: {
            projects: [],
            teams: []
        },
        errors: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        //fetchCurrentUser
        .addCase(fetchCurrentUser.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.status = "idle";
            state.errors = [];
        })
        //fetchUsers
        .addCase(fetchUsers.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.entities = action.payload;
            state.status = "idle";
            state.errors = [];
        })
        //loginUser
        .addCase(loginUser.pending, (state) => {
            state.status = "loading";
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            if ('errors' in action.payload) {
                state.errors = [];
                state.errors.push(action.payload);
            } else {
                state.currentUser = action.payload;
                state.errors = [];
            }
            state.status = "idle";
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.errors = action.payload;
            state.status = "idle"
        })
        //signupUser
        .addCase(signupUser.pending, (state) => {
            state.status = "loading";
        })
        .addCase(signupUser.fulfilled, (state, action) => {
            if ('errors' in action.payload) {
                state.errors = [];
                state.errors.push(action.payload);
            } else {
                state.currentUser = action.payload;
                state.errors = [];
            }
            state.status = "idle";
        })
        //logoutUser
        .addCase(logoutUser.pending, (state) => {
            state.status = "loading";
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.status = "idle";
            state.currentUser = null;
        })
        //createTask
        .addCase(createTask.pending, (state) => {
            state.status = "loading";
        })
        .addCase(createTask.fulfilled, (state, action) => {
            if (action.payload?.errors) {
                state.errors = [];
                state.errors.push(action.payload);
            } else {
                //update currentUser
                const cUproject = state.currentUser.projects.find((p) => p.id === action.payload.project_id);
                const cUteam = state.currentUser.teams.find((t) => t.id === action.payload.team_id);
                if (cUproject) {
                    cUproject.tasks.push(action.payload);
                }
                if (cUteam) {
                    cUteam.tasks.push(action.payload);
                }
                if (!cUproject) {
                    state.currentUser.projects = [...state.currentUser.projects, action.payload.project];
                }
                if (!cUteam) {
                    state.currentUser.teams = [...state.currentUser.teams, action.payload.team];
                }
                //update user in entities
                const userEntity = state.entities.find((u) => u.id === state.currentUser.id)
                const entityProject = userEntity.projects.find((p) => p.id === action.payload.project_id);
                const entityTeam = userEntity.teams.find((t) => t.id === action.payload.team_id);
                if (entityProject) {
                    entityProject.tasks.push(action.payload);
                }
                if (entityTeam) {
                    entityTeam.tasks.push(action.payload);
                }
                if (!entityProject) {
                    userEntity.projects = [...userEntity.projects, action.payload.project];
                }
                if (!entityTeam) {
                    userEntity.teams = [...userEntity.teams, action.payload.team];
                }
                state.errors = [];
            }
            state.status = "idle";

        })
        //deleteTask
        .addCase(deleteTask.pending, (state) => {
            state.status = "loading";
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
            //update currentUser
            state.status = "idle";
            const project = state.currentUser.projects.find((p) => p.id === action.payload.project_id)
            const team = state.currentUser.teams.find((t) => t.id === action.payload.team_id)
            project.tasks = project.tasks.filter((t) => t.id !== action.payload.id)
            team.tasks = team.tasks.filter((t) => t.id !== action.payload.id)
            if(!project.tasks) {
                project.tasks = []
            }
            if(!team.tasks) {
                team.tasks = []
            }
            //update user entity
            const user = state.entities.find((u) => u.id === action.payload.user_id)
            const userProject = user.projects.find((p) => p.id === action.payload.project_id)
            const userTeam = user.teams.find((t) => t.id === action.payload.team_id)
            userProject.tasks.filter((t) => t.id !== action.payload.id)
            userTeam.tasks = userTeam.tasks.filter((t) => t.id !== action.payload.id)
            if(!userProject.tasks) {
                userProject.tasks = []
            }
            if(!userTeam.tasks) {
                userTeam.tasks = []
            }
        })
        //updateTask
        .addCase(updateTask.pending, (state) => {
            state.status = "loading";
        })
        .addCase(updateTask.fulfilled, (state, action) => {
            if (action.payload?.errors) {
                state.errors = [];
                state.errors.push(action.payload);
            } else {
                //update currentUser
                state.status = "idle";
                state.errors = [];
                const project = state.currentUser.projects.find((p) => p.id === action.payload.project_id)
                const team = state.currentUser.teams.find((t) => t.id === action.payload.team_id)
                project.tasks = project.tasks.map((t) => {
                    if (t.id === action.payload.id) {
                        return action.payload
                    } else {
                        return t
                    }
                })
                team.tasks = team.tasks.map((t) => {
                    if (t.id === action.payload.id) {
                        return action.payload
                    } else {
                        return t
                    }
                })
                //update user in entities
                const userEntity = state.entities.find((u) => u.id === action.payload.user_id)
                const entProject = userEntity.projects.find((p) => p.id === action.payload.project_id)
                const entTeam = userEntity.teams.find((t) => t.id === action.payload.team_id)
                entProject.tasks = entProject.tasks.map((t) => {
                    if (t.id === action.payload.id) {
                        return action.payload
                    } else {
                        return t
                    }
                })
                entTeam.tasks = entTeam.tasks.map((t) => {
                    if (t.id === action.payload.id) {
                        return action.payload
                    } else {
                        return t
                    }
                })
            }
        })
    }
})

export default usersSlice.reducer;