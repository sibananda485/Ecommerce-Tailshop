import React from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  const loggedInUser = useSelector(selectLoggedInUser);
  if (!loggedInUser) {
    return <Navigate to="/login"></Navigate>;
  } else {
    if (loggedInUser.role === "user") return <Navigate to="/login"></Navigate>;
    else return children;
  }
}
