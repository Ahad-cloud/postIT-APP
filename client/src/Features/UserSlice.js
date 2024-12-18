import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UsersData } from "../Exampledata"; // Assuming this is a mock data file

const initialState = {
  value: UsersData,
  user: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  msg: null,
};

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
    const response = await axios.post("http://localhost:3001/registerUser", userData);
    return response.data.user; // Return the new user
  }
);

export const login = createAsyncThunk("users/login", async (userData) => {
  const response = await axios.post("http://localhost:3001/login", userData);
  return response.data.user; // Return the logged-in user
});

export const logout = createAsyncThunk("users/logout", async () => {
  await axios.post("http://localhost:3001/logout");
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.value = state.value.filter(user => user.email !== action.payload);
    },
    updateUser: (state, action) => {
      const user = state.value.find(user => user.email === action.payload.email);
      if (user) {
        user.name = action.payload.name;
        user.password = action.payload.password;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = {};
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;