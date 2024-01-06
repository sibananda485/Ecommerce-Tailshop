import React from "react";
import Navbar from "../features/Navbar/Navbar";
import { ProductList } from "../features/Product/Component/ProductList";

export default function HomePage() {
  return (
    <div>
      <Navbar></Navbar>
      <ProductList></ProductList>
    </div>
  );
}
