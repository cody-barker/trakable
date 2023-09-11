import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

//action creators
export const fetchProjects = createAsyncThunk("users/fetchProjects", () => {
    return fetch("/projects")
    .then((r) => r.json())
})

export const createProject = createAsyncThunk("projects/createProject", (payload) => {
    return fetch("/projects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then((r) => r.json())
})


//reducer
const projectsSlice = createSlice({
    name: "projects",
    initialState: {
        status: "idle",
        entities: [],
    },
    reducers: {

    },
    extraReducers: {
        //fetchProjects
        [fetchProjects.pending](state) {
            state.status = "loading";
        },
        [fetchProjects.fulfilled](state, action) {
            state.entities = action.payload;
            state.status = "idle";
        },
        //createProject
         //createProject
         [createProject.pending](state) {
            state.status = "loading";
        },
        [createProject.fulfilled](state, action) {
            state.status = "idle";
            state.entities.push(action.payload)
        }
    }
})


export default projectsSlice.reducer;