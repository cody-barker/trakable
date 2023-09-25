import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

//action creators
export const fetchProjects = createAsyncThunk("users/fetchProjects", () => {
    return fetch("api//projects")
    .then((r) => r.json())
})

export const createProject = createAsyncThunk("projects/createProject", (payload) => {
    return fetch("api//projects", {
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
        errors: []
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
        [createProject.pending](state) {
            state.status = "loading";
        },
        [createProject.fulfilled](state, action) {
            if ('errors' in action.payload) {
                state.errors = [];
                state.errors.push(action.payload);
            } else {
                state.entities.push(action.payload);
                state.errors = [];
            }
            state.status = "idle";
        }
    }
})


export default projectsSlice.reducer;