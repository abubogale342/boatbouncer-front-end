import axios from "axios";
import ms from "ms";

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return "never";
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? "" : " ago"
  }`;
};

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}

export function nFormatter(num: number, digits?: number) {
  if (!num) return "0";
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, "$1") + item.symbol
    : "0";
}

export function capitalize(str: string) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

export function getter<JSON = any>(path: RequestInfo): Promise<JSON> {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/${path}`)
    .then((res) => res.data)
    .catch((err) => err);
}

export function poster(path: string, body?: any) {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, body)
    .then((res) => res.data)
    .catch((err) => err);
}

export function objectDiff(obj1: any, obj2: any) {
  let diffObj: any = {};
  for (let key in obj2) {
    if (!(obj2?.[key] && obj1?.[key])) {
      continue;
    }
    if (JSON.stringify(obj2?.[key]) == JSON.stringify(obj1?.[key])) {
      continue;
    } else {
      diffObj[key] = obj2[key];
    }
  }

  return diffObj;
}
