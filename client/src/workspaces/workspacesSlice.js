import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

//action creators
export const fetchWorkspaces = createAsyncThunk("workspaces/fetchWorkspaces", () => {
    return fetch("/workspaces")
    .then((r) => r.json())
})

export const createWorkspace = createAsyncThunk("projects/createWorkspace", (payload) => {
    return fetch("/workspaces", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then((r) => r.json())
})


//reducer
const workspacesSlice = createSlice({
    name: "workspaces",
    initialState: {
        status: "idle",
        entities: [],
    },
    reducers: {

    },
    extraReducers: {
        //fetchworkspaces
        [fetchWorkspaces.pending](state) {
            state.status = "loading";
        },
        [fetchWorkspaces.fulfilled](state, action) {
            state.entities = action.payload;
            state.status = "idle";
        },
        //createProject
        [createWorkspace.pending](state) {
            state.status = "loading";
        },
        [createWorkspace.fulfilled](state, action) {
            state.status = "idle";
            state.entities.push(action.payload);
        }
    }
})


export default workspacesSlice.reducer;