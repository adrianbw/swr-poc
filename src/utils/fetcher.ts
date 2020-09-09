import axios from "axios";

export const fetcher = async <T = any>(url: string) =>
  (await axios.get<T>(url)).data;
