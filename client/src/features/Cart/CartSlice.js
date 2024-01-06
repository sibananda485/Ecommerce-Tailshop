import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteCartItem,
  getCartItemsByUserId,
  updateCart,
  resetCart,
} from "./CartAPI";

const initialState = {
  value: 0,
  status: "idle",
  items: [],
};

export const getCartItemsByUserIdAsync = createAsyncThunk(
  "cart/getCartItemsByUserId",
  async () => {
    const result = await getCartItemsByUserId();
    return result;
  }
);
export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const result = await addToCart(item);
    return result;
  }
);
export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (update) => {
    const result = await updateCart(update);
    return result;
  }
);

export const deleteCartItemAsync = createAsyncThunk(
  "cart/deleteCartItem",
  async (id) => {
    const result = await deleteCartItem(id);
    return result;
  }
);
export const resetCartAsync = createAsyncThunk("cart/resetCart", async (id) => {
  const result = await resetCart(id);
  return result;
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(getCartItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCartItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (value) => value.id === action.payload.id
        );
        state.items.splice(index, 1, {
          ...state.items[index],
          quantity: action.payload.quantity,
        });
      })
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (value) => value.id === action.payload
        );
        state.items.splice(index, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export const { increment } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
