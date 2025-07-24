import type { MakeAPIUrlParams } from "@/types";

export function makeUrl({ paths, searchParams, version = 1 }: MakeAPIUrlParams) {
  const search = new URLSearchParams(searchParams);

  let url = import.meta.env.VITE_API_URL;

  if (!url) {
    throw new Error("API_URL is not set");
  }

  url += `/v${version}`;

  for (const path of paths) {
    url += `/${path}`;
  }

  if (search.toString()) {
    url += `?${search.toString()}`;
  }

  return url;
}

const baseHeaders: HeadersInit = {
  "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
  "x-rapidapi-host": import.meta.env.VITE_RAPID_API_HOST,
};

export const http = {
  get: (url: string, headers?: HeadersInit) => {
    return fetch(url, {
      headers: { ...baseHeaders, ...headers },
    });
  },
  post: (url: string, body: BodyInit, headers?: HeadersInit) => {
    return fetch(url, {
      method: "POST",
      body,
      headers: { ...baseHeaders, ...headers },
    });
  },
};
