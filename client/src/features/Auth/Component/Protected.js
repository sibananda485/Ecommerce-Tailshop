import React from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser, selectTokenCheck } from "../authSlice";
import { Navigate } from "react-router-dom";
// import Loader from "../../common/Loader";

export default function Protected({ children }) {
  const loggedInUser = useSelector(selectLoggedInUser);
  const tokenChecked = useSelector(selectTokenCheck);
  if(tokenChecked){
    if (loggedInUser) {
      return children;
    } else {
      return <Navigate to="/login"></Navigate>;
    }
  }

}
