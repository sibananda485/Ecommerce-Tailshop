import React from "react";
import Navbar from "../features/Navbar/Navbar";
import AdminProductList from "../features/admin/Component/AdminProductList";

export default function AdminHome() {
  return (
    <>
      <Navbar></Navbar>
      <AdminProductList></AdminProductList>
    </>
  );
}
