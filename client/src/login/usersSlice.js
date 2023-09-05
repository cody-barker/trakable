import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

//Action Creators
export const fetchUsers = createAsyncThunk("users/fetchUsers", () => {
    return fetch("/users")
    .then((r) => r.json())
    .then((users) => users)
})

//Reducer
const usersSlice = createSlice({
    name: "users",
    initialState: {
        entities: [],
        status: "idle"
    },
    reducers: {

    },
    extraReducers: {
        [fetchUsers.pending](state) {
            state.status = "loading";
        },
        [fetchUsers.fulfilled](state, action) {
            state.entities = action.payload;
            state.status = "idle"
        },
    },
});

export default usersSlice.reducer;