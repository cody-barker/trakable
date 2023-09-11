import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createProject } from '../projects/projectsSlice'

//Action Creators
export const fetchCurrentUser = createAsyncThunk("users/fetchCurrentUser", () => {
    return fetch("/me")
    .then((r) => r.json())
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
        currentUser: null,
        errors: []
    },
    reducers: {

    },
    extraReducers: {
        //fetchCurrentUser
        [fetchCurrentUser.pending](state) {
            state.status = "loading";
        },
        [fetchCurrentUser.fulfilled](state, action) {
            state.currentUser = action.payload;
            state.status = "idle";
            state.errors = []
        },
        //loginUser
        [loginUser.pending](state) {
            state.status = "loading";
        },
        [loginUser.fulfilled](state, action) {
            if ('errors' in action.payload) {
                state.errors = [];
                state.errors.push(action.payload);
            } else {
                state.currentUser = action.payload;
                state.errors = [];
            }
            state.status = "idle";
        },
        [loginUser.rejected](state, action) {
            state.errors = action.payload;
            state.status = "idle"
        },
        //signupUser
        [signupUser.pending](state) {
            state.status = "loading";
        },
        [signupUser.fulfilled](state, action) {
            if ('errors' in action.payload) {
                state.errors = [];
                state.errors.push(action.payload);
            } else {
                state.currentUser = action.payload;
                state.errors = [];
            }
            state.status = "idle";
        },
        //logoutUser
        [logoutUser.pending](state) {
            state.status = "loading";
        },
        [logoutUser.fulfilled](state) {
            state.status = "idle";
            state.currentUser = null;
        },
        //createTask
        [createTask.pending](state) {
            state.status = "loading";
        },
        [createTask.fulfilled](state, action) {
            state.status = "idle";
            state.currentUser.tasks.push(action.payload)
        },
        //deleteTask
        [deleteTask.pending](state) {
            state.status = "loading";
        },
        [deleteTask.fulfilled](state, action) {
            state.status = "idle";
            state.currentUser.tasks = state.currentUser.tasks.filter((task) => {
                return action.payload.id !== task.id
            })
        },
        //updateTask
        [updateTask.pending](state) {
            state.status = "loading";
        },
        [updateTask.fulfilled](state, action) {
            state.status = "idle";
            state.currentUser.tasks = state.currentUser.tasks.map((task) => {
                if (task.id === action.payload.id) {
                    return action.payload
                } else {
                    return task
                }
            })
        },
    },
});

export default usersSlice.reducer;