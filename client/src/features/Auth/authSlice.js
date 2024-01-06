import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, logOut, getUserFromTOken } from "./authAPI";

const initialState = {
  checked: false,
  loggedInUser: null,
  error: null,
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const result = await createUser(userData);
    return result;
  }
);
export const logOutAsync = createAsyncThunk("user/logout", async (id) => {
  const result = await logOut(id);
  return result;
});

export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (userInfo) => {
    const result = await checkUser(userInfo);
    return result;
  }
);

export const getUserFromTOkenAsync = createAsyncThunk(
  "user/getUserFromTOken",
  async () => {
    const result = await getUserFromTOken();
    return result;
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    logOutRed: (state) => {
      state.loggedInUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(logOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = null;
      })
      .addCase(getUserFromTOkenAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserFromTOkenAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        state.checked = true;
      })
      .addCase(getUserFromTOkenAsync.rejected, (state, action) => {
        state.status = "idle";
        state.checked = true;
        state.loggedInUser = null;
      });
  },
});

export const { logOutRed } = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;
export const selectTokenCheck = (state) => state.auth.checked;

export default authSlice.reducer;
