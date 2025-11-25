import { LOCALES_MAP } from "@configs/map.config";
import { RootState, store } from "@redux/store";
export const fetcher = async (
  url: string,
  params: {
    method: string;
    body?: any;
  } = { method: "GET" }
) => {
  const state: RootState = store.getState();
  const lang = state.language.lang;
  const accessToken = state.auth.accessToken;
  const response = await fetch(url, {
    method: params.method,
    headers: {
      "Content-Type": "application/json",
      "accept-language": LOCALES_MAP[lang],
      ...(accessToken ? { Authorization: "Bearer " + accessToken } : {}),
    },
    body: params.body ? JSON.stringify(params.body) : null,
  });
  return response;
};
