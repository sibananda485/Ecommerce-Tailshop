import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOrder, getAllOrder, updateOrder,getOrdersByUserId } from "./orderAPI";

const initialState = {
  items: [],
  currentOrder: false,
  status: "idle",
  totalResult: 0,
};

export const addOrderAsync = createAsyncThunk(
  "counter/addOrder",
  async (orderDetails) => {
    const response = await addOrder(orderDetails);
    return response;
  }
);

export const getOrdersByUserIdAsync = createAsyncThunk(
  "counter/getOrdersByUserId",
  async () => {
    const response = await getOrdersByUserId();
    return response;
  }
);

export const updateOrderAsync = createAsyncThunk(
  "counter/updateOrder",
  async (data) => {
    const response = await updateOrder(data);
    return response;
  }
);
export const getAllOrderAsync = createAsyncThunk(
  "counter/getAllOrder",
  async (filter) => {
    const response = await getAllOrder(filter);
    return response;
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    emptyCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(getAllOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.totalResult = action.payload.total;
        state.items = action.payload.data;
      })
      .addCase(getOrdersByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrdersByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (value) => value.id === action.payload.id
        );
        state.items.splice(index, 1, action.payload);
      });
  },
});

export const { emptyCurrentOrder } = counterSlice.actions;

// export const getProducts = (state) => state.products.products;
export const selectOrders = (state) => state.orders.items;
export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectTotalResult = (state) => state.orders.totalResult;

export default counterSlice.reducer;
