import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  comments: [],
  likes: [],
  status: 'idle', // Added to track loading status
  error: null,    // Added to track errors
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(savePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(savePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.unshift(action.payload); // Add new post to the beginning
      })
      .addCase(savePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload; // Set posts to fetched data
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Async actions
export const savePost = createAsyncThunk("posts/savePost", async (postData) => {
  const response = await axios.post("http://localhost:3001/savePost", postData);
  return response.data.post; // Return the new post
});

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const response = await axios.get("http://localhost:3001/getPosts");
  return response.data.posts; // Return the fetched posts
});

export default postSlice.reducer;