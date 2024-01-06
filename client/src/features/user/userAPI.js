import axios from "axios";

export async function fetchLoggedInUser(id) {
  const res = await axios.get(`/api/user/${id}`); 
  return res.data; 
}

export async function updateUser(data) {
  try {
    const res = await axios.patch(
      `/api/user`,
      data 
    );

    return res.data;
  } catch (error) {
    throw error;
  }
}