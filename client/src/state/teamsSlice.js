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

export const updateTeam = createAsyncThunk("teams/updateTeam", (payload) => {
    return fetch(`/teams/${payload.id}`, {
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
      errors: [],
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchTeams.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchTeams.fulfilled, (state, action) => {
          state.entities = action.payload;
          state.status = "idle";
        })
        .addCase(createTeam.pending, (state) => {
          state.status = "loading";
        })
        .addCase(createTeam.fulfilled, (state, action) => {
          state.status = "idle";
          if ("errors" in action.payload) {
            state.errors = [];
            state.errors.push(action.payload);
          } else {
            state.entities.push(action.payload);
            state.errors = [];
          }
        })
        .addCase(updateTeam.pending, (state) => {
          state.status = "loading";
        })
        .addCase(updateTeam.fulfilled, (state, action) => {
          state.status = "idle";
          if ("errors" in action.payload) {
            state.errors = [];
            state.errors.push(action.payload);
          } else {
            state.entities = state.entities.map((t) => {
              if (t.id === action.payload.id) {
                return action.payload;
              } else {
                return t;
              }
            });
            state.errors = [];
            }
        },
        )
    }
})

export default teamsSlice.reducer;