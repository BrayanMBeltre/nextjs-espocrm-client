import axios from "axios";

export default async function fetcher(url) {
  const res = await axios.get(url);
  return res.data;
}
