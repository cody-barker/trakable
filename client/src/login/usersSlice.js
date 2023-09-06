import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

//Action Creators
export const fetchCurrentUser = createAsyncThunk("users/fetchCurrentUser", () => {
    return fetch("/me")
    .then((r) => r.json())
    .then((data) => data)
})

export const loginUser = createAsyncThunk("users/loginUser", (payload) => {
    return fetch("/login", {
        method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
    })
    .then((r) => r.json())
})

export const signupUser = createAsyncThunk("users/signupUser", (payload) => {
    return fetch("/signup", {
        method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
    })
    .then((r) => r.json())
})

//Reducer
const usersSlice = createSlice({
    name: "users",
    initialState: {
        entities: [],
        status: "idle",
        currentUser: {},
        errors: []
    },
    reducers: {

    },
    extraReducers: {
        //fetchCurrentUser
        [fetchCurrentUser.pending](state) {
            state.status = "loading";
        },
        [fetchCurrentUser.fulfilled](state, action) {
            state.currentUser = action.payload;
            state.status = "idle";
            state.errors = []
        },
        //loginUser
        [loginUser.pending](state) {
            state.status = "loading";
        },
        [loginUser.fulfilled](state, action) {
            if ('error' in action.payload) {
                state.errors = [];
                state.errors.push(action.payload);
            } else {
                state.currentUser = action.payload;
                state.errors = [];
            }
            state.status = "idle";
        },
        [loginUser.rejected](state, action) {
            state.errors = action.payload;
            state.status = "idle"
        },
        //signupUser
        [signupUser.pending](state) {
            state.status = "loading";
        },
        [signupUser.fulfilled](state, action) {
            if ('error' in action.payload) {
                state.errors = [];
                state.errors.push(action.payload);
            } else {
                state.currentUser = action.payload;
                state.errors = [];
            }
            state.status = "idle";
        },
        [signupUser.rejected](state, action) {
            state.errors = action.payload;
            state.status = "idle"
        },
    },
});

export default usersSlice.reducer;