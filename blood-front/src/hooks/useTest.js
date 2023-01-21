import useSWR from "swr";
const URL = "http://localhost:3000/Sandhani";

const fetch = async (url) => {
  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
};
export default async function useAuth() {
  let auth = false;

 
  const { data } = useSWR(URL,fetch);
   //if (data._id) {
   // auth = true;}
 
 
  return auth;
}
