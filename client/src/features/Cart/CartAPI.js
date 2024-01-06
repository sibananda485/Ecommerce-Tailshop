import axios from "axios";

export async function getCartItemsByUserId() {
  const res = await axios.get("/api/cart/");
  return res.data;
}

export async function addToCart(item) {
  const res = await axios.post("/api/cart", item);
  return res.data;
}

export async function updateCart(update) {
  const res = await axios.patch("/api/cart/"+update.id, update.data);
  return res.data;
}

export async function deleteCartItem(id) {
  await axios.delete("/api/cart/" + id);
  return id;
}

export async function resetCart(id) {
  const items = await getCartItemsByUserId(id);
  for (let i = 0; i < items.length; i++) {
    await deleteCartItem(items[i].id);
  }
  return true;
}
