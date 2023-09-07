// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

// export const fetchProjects = createAsyncThunk("projects/fetchProjects", () => {
//     return fetch("/projects")
//     .then((r) => r.json())
// })


// //Reducer
// const projectsSlice = createSlice({
//     name: "projects",
//     initialState: {
//         entities: [],
//         status: "idle",
//         errors: []
//     },
//     reducers: {

//     },
//     extraReducers: {
//         [fetchProjects.pending] (state) {
//             state.status = "loading"
//         },
//         [fetchProjects.fulfilled] (state, action) {
//             state.status = "idle";
//             state.entities = action.payload
//         }
//     }
// })

// export default projectsSlice.reducer;