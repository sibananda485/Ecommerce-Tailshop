import axios from "axios";

export async function addOrder(orderDetails) {
  const res = await axios.post("/api/orders", orderDetails);
  return res.data;
}

export async function getOrdersByUserId(id) {
  const res = await axios.get(`/api/orders?id=${id}`);
  return res.data; 
}

export async function updateOrder(para) {
  const res = await axios.patch(
    "/api/orders/" + para.id,
    para.data
  );
  return res.data;
}

export async function getAllOrder(query) {
  let queryString = "";
  for (const k in query) {
    queryString += `${k}=${query[k]}&`;
  }
  const res = await fetch("/api/orders/admin?" + queryString);
  const data = await res.json();
  const total = res.headers.get("X-Total-Count");
  return { data, total };
}
