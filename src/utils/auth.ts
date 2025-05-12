import Cookies from "js-cookie";

export const getAccessToken = () => Cookies.get("accessToken");
export const getRefreshToken = () => Cookies.get("refreshToken");
export const setAccessToken = (token: string) =>
  Cookies.set("accessToken", token);
export const clearTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};
