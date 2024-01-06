import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUser, updateUser } from "./userAPI";

const initialState = { 
  status: "idle",
  userInfo: null,
  fetchUserInfoLoading: true,
};

export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async () => {
    const response = await fetchLoggedInUser();
    return response;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (data) => {
    const response = await updateUser(data);
    return response;
  }
);

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    logOutUserInfoRed: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      }) 
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
        state.fetchUserInfoLoading = false;
      });
  },
});

export const { logOutUserInfoRed } = counterSlice.actions;

export const selectOrders = (state) => state.user.orderItems;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserInfoLoading = (state) => state.user.fetchUserInfoLoading;

export default counterSlice.reducer;
