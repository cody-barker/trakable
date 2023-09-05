import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

//Action Creators
// export const fetchUsers = createAsyncThunk("users/fetchUsers", () => {
//     return fetch("/users")
//     .then((r) => r.json())
//     .then((users) => users)
// })

export const fetchCurrentUser = createAsyncThunk("users/fetchCurrentUser", () => {
    return fetch("/me")
    .then((r) => r.json())
    .then((data) => data)
})

export const loginUser = createAsyncThunk("users/loginUser", () => {
    return fetch("/login", {
        method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(action.payload)
    })
    .then((r) => {
        if (r.ok) {
            r.json().then((user) => user)
        } else {
            r.json().then((err) => err.errors)
        }
    })
})

//Reducer
const usersSlice = createSlice({
    name: "users",
    initialState: {
        entities: [],
        status: "idle",
        currentUser: {}
    },
    reducers: {

    },
    extraReducers: {
        // [fetchUsers.pending](state) {
        //     state.status = "loading";
        // },
        // [fetchUsers.fulfilled](state, action) {
        //     state.entities = action.payload;
        //     state.status = "idle"
        // },
        [fetchCurrentUser.pending](state) {
            state.status = "loading";
        },
        [fetchCurrentUser.fulfilled](state, action) {
            state.currentUser = action.payload;
            state.status = "idle"
        },
    },
});

export default usersSlice.reducer;