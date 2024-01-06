import React, { useEffect } from "react";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import ErrorPage from "./Pages/404";
import ProfilePage from "./Pages/ProfilePage";
import MyOrderPage from "./Pages/MyOrderPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartPage from "./Pages/CartPage";
import CheckOut from "./Pages/CheckOut";
import ProductDetailPage from "./Pages/ProductDetailPage";
import Protected from "./features/Auth/Component/Protected";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserFromTOkenAsync,
  selectLoggedInUser,
  selectTokenCheck,
} from "./features/Auth/authSlice";
import { getCartItemsByUserIdAsync } from "./features/Cart/CartSlice";
import OrderSuccess from "./Pages/OrderSuccess";
import {
  fetchLoggedInUserAsync,
  selectUserInfo,
  selectUserInfoLoading,
} from "./features/user/userSlice";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import AdminHome from "./Pages/AdminHome";
import AdminProductDetailPage from "./Pages/AdminProductDetailPage";
import ProtectedAdmin from "./features/Auth/Component/ProtectedAdmin";
import ProductFormPage from "./Pages/ProductFormPage";
import AdminOrderPage from "./Pages/AdminOrderPage";
import About from "./Pages/About";
import Navbar from "./features/Navbar/Navbar";
import Loader from "./features/common/Loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/productform",
    element: (
      <ProtectedAdmin>
        <ProductFormPage></ProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrderPage></AdminOrderPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/productform/:id",
    element: (
      <ProtectedAdmin>
        <ProductFormPage></ProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "signup",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "load",
    element: <Loader></Loader>,
  },
  {
    path: "cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "checkout",
    element: (
      <Protected>
        <CheckOut></CheckOut>
      </Protected>
    ),
  },
  {
    path: "productdetail/:id",
    element: <ProductDetailPage></ProductDetailPage>,
  },
  {
    path: "admin/productdetail/:id",
    element: (
      <Protected>
        <AdminProductDetailPage></AdminProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "orderplaced/:id",
    element: <OrderSuccess></OrderSuccess>,
  },
  {
    path: "orders",
    element: (
      <Protected>
        <MyOrderPage></MyOrderPage>
      </Protected>
    ),
  },
  {
    path: "profile",
    element: (
      <Protected>
        <ProfilePage></ProfilePage>
      </Protected>
    ),
  },
  {
    path: "about",
    element: (
      <>
        {" "}
        <Navbar></Navbar>
        <About></About>
      </>
    ),
  },
  {
    path: "forgotpassword",
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const loader = useSelector(selectTokenCheck);
  const userInfo = useSelector(selectUserInfo);
  useEffect(() => {
    if (user) {
      dispatch(getCartItemsByUserIdAsync());
      dispatch(fetchLoggedInUserAsync());
    }
  }, [user, dispatch]);
  useEffect(() => {
    dispatch(getUserFromTOkenAsync());
  }, []);
  return (
    <>
      {loader ? (
        user && !userInfo ? (
          <Loader></Loader>
        ) : (
          <RouterProvider router={router}></RouterProvider>
        )
      ) : (
        <Loader></Loader>
      )}
    </>
  );
}

export default App;
