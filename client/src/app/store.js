import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/Product/ProductSlice";
import counterReducer from "../features/counter/counterSlice";
import authSlice from "../features/Auth/authSlice";
import CartReducer from "../features/Cart/CartSlice";
import OrderReducer from "../features/order/orderSlice";
import UserReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authSlice,
    counter: counterReducer,
    cart: CartReducer,
    orders: OrderReducer,
    user: UserReducer,
  },
});
