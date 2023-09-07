import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

//Action Creators
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

//Reducer
const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        status: "idle",
        errors: []
    },
    reducers: {

    },
    extraReducers: {}
})

export default tasksSlice.reducer;
