export async function fetchCount() {
  const res = await fetch("https://reqres.in/api/users");
  const data = await res.json();
  return data.data.length;
}
