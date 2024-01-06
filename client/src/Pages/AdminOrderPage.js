import React from "react";
import Navbar from "../features/Navbar/Navbar";
import AdminProductList from "../features/admin/Component/AdminProductList";
import AdminOrders from "../features/admin/Component/AdminOrders";

export default function AdminOrderPage() {
  return (
    <>
      <Navbar></Navbar>
      <AdminOrders></AdminOrders>
    </>
  );
}
