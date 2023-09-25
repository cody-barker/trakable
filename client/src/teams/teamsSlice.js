import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

//action creators
export const fetchTeams = createAsyncThunk("teams/fetchTeams", () => {
    return fetch("api//teams")
    .then((r) => r.json())
})

export const createTeam = createAsyncThunk("teams/createTeam", (payload) => {
    return fetch("api//teams", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then((r) => r.json())
})

export const updateTeam = createAsyncThunk("teams/updateTeam", (payload) => {
    return fetch(`api//teams/${payload.id}`, {
        method: "PATCH",
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
        errors: []
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
            if ('errors' in action.payload) {
                state.errors = [];
                state.errors.push(action.payload)
            } else {
                state.entities.push(action.payload);
                state.errors = [];
            }
        },
        //updateTeam
        [updateTeam.pending](state) {
            state.status = "loading"
        },
        [updateTeam.fulfilled](state, action) {
            state.status = "idle"
            if ('errors' in action.payload) {
                state.errors = [];
                state.errors.push(action.payload)
            } else {
                state.entities = state.entities.map((t) => {
                    if (t.id === action.payload.id) {
                        return action.payload
                    } else {
                        return t
                    }
                })
                state.errors = [];
            }
        },
    }
})

export default teamsSlice.reducer;