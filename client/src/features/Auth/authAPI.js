import axios from "axios";

export async function createUser(userData) {
  const res = await axios.post("/api/auth/signup", userData);
  return res.data;
}
export async function logOut(id) {
  return true;
}

export async function checkUser(userInfo) {
  try {
    const res = await axios.post(`/api/auth/login`, userInfo);
    const { id, email, role } = res.data;
    return { id, email, role };
  } catch (error) {
    throw error.response.data;
  }
}

export async function getUserFromTOken(){
  try {
    const res = await axios.get(`/api/auth/cookie`);
    const { id, email, role } = res.data;
    return { id, email, role };
  } catch (error) {
    throw error.response.data;
  }
}
