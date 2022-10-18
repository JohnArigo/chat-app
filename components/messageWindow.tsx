import useSWR from "swr";

const url = "../api/retrieveMessages";
const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function messageWindow() {
  const { data, error } = useSWR(url, fetcher);
  console.log(data);
  return { data, error };

  return <main></main>;
}
