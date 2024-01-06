import axios from "axios";

export async function fetchAllProducts() {
  const res = await fetch("/api/products");
  const data = await res.json();
  return data;
}

export async function fetchProductById(id) {
  const res = await axios.get("/api/products/" + id);
  return res.data;
}

export async function addProduct(data) {
  const res = await axios.post("/api/products", data);
  return res.data;
}

export async function updateProduct(data) {
  const res = await axios.patch(
    "/api/products/" + data.id,
    data
  );
  return res.data;
}

export async function fetchProductByFilter(query) {
  let queryString = "";
  for (const key in query) {
    if (key === "category" || key === "brand") {
      for (let a of query[key]) {
        queryString += `${key}=${a}&`;
      }
    } else {
      queryString += `${key}=${query[key]}&`;
    }
  }
  const res = await fetch(`/api/products?${queryString}`);
  const data = await res.json();
  const total = res.headers.get("X-Total-Count");
  return { data, total };
}

export async function fetchBrands() {
  const res = await fetch("/api/brands");
  const data = await res.json();
  return data;
}

export async function fetchCategories() {
  const res = await fetch("/api/categories");
  const data = await res.json();
  return data;
}
