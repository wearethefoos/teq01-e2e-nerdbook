import useSWR from "swr";

export const apiBaseUrl = "https://coders-network-api.herokuapp.com";
export const apiUrl = (path: string) => `${apiBaseUrl}${path}`;
export const fetcher = async <T>(path: string): Promise<T> => {
  const headers: any = {
    "Content-Type": "application/json",
  };

  const token = localStorage.getItem("token");

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(apiUrl(path), { headers });
  const data = await res.json();
  return data;
};
export const useApi = <T>(path: string) => {
  return useSWR<T>(path, fetcher);
};
