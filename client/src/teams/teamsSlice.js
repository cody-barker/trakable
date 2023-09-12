import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

//action creators
export const fetchTeams = createAsyncThunk("teams/fetchTeams", () => {
    return fetch("/teams")
    .then((r) => r.json())
})

export const createTeam = createAsyncThunk("teams/createTeam", (payload) => {
    return fetch("/teams", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then((r) => r.json())
})


//reducer
const teamsSlice = createSlice({
    name: "teams",
    initialState: {
        status: "idle",
        entities: [],
    },
    reducers: {

    },
    extraReducers: {
        //fetchteams
        [fetchTeams.pending](state) {
            state.status = "loading";
        },
        [fetchTeams.fulfilled](state, action) {
            state.entities = action.payload;
            state.status = "idle";
        },
        //createTeam
        [createTeam.pending](state) {
            state.status = "loading";
        },
        [createTeam.fulfilled](state, action) {
            state.status = "idle";
            state.entities.push(action.payload);
        }
    }
})


export default teamsSlice.reducer;