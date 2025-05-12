import axios from "axios";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from "@/utils";
import { RESPONSE_ERROR_MESSAGE } from "@/constants";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken(); // Read from cookie/localStorage depending on runtime
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["X-AUTH-DOMAIN"] = typeof window !== "undefined"
        ? window.location.hostname
        : "server";
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalConfig = error.config;
    const code = error.response?.status;

    if (
      code === 401 &&
      error.response?.data?.error ===
        RESPONSE_ERROR_MESSAGE.SIGNATURE_HAS_EXPIRED
    ) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshToken(); // make your refresh call here
          setAccessToken(newToken);
          onRefreshed(newToken);
        } catch (err) {
          clearTokens();
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
          refreshSubscribers = [];
        }
      }

      return new Promise((resolve) => {
        subscribeTokenRefresh((token: string) => {
          originalConfig.headers.Authorization = `Bearer ${token}`;
          resolve(axiosClient(originalConfig));
        });
      });
    }

    return Promise.reject({
      message: error?.response?.data?.message || "Unknown error",
      status: code,
      raw: error,
    });
  },
);

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
}

async function refreshToken(): Promise<string> {
  const refreshToken = getRefreshToken(); // get from cookie/localStorage
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
    {
      refreshToken,
    },
  );
  return response.data.accessToken;
}

export default axiosClient;
