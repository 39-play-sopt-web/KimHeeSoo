import axios from "axios";
import { getDefaultStore } from "jotai";
import { authAtom } from "../stores/auth";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

instance.interceptors.request.use((config) => {
  const auth = getDefaultStore().get(authAtom);

  if (auth) {
    config.headers.Authorization = auth.authorizationCode;
  }

  return config;
});

