import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Action creators
export const fetchProjects = createAsyncThunk("users/fetchProjects", () => {
  return fetch("/projects").then((r) => r.json());
});

export const createProject = createAsyncThunk(
  "projects/createProject",
  (payload) => {
    return fetch("/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((r) => r.json());
  }
);

// Reducer
const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    status: "idle",
    entities: [],
    errors: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.status = "idle";
      })
      .addCase(createProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        if ("errors" in action.payload) {
          state.errors = [];
          state.errors.push(action.payload);
        } else {
          state.entities.push(action.payload);
          state.errors = [];
        }
        state.status = "idle";
      });
  },
});

export default projectsSlice.reducer;