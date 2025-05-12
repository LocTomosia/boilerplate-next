export const pagesPath = {
  "home": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({
      pathname: "/home" as const,
      hash: url?.hash,
    }),
  },
  $url: (url?: { hash?: string | undefined } | undefined) => ({
    pathname: "/" as const,
    hash: url?.hash,
  }),
};

export type PagesPath = typeof pagesPath;

export const staticPath = {
  background_png: "/background.png",
  background_mobile_png: "/background_mobile.png",
  favicon_ico: "/favicon.ico",
  next_js_svg: "/next-js.svg",
  next_svg: "/next.svg",
  signup_mobile_png: "/signup_mobile.png",
  vercel_svg: "/vercel.svg",
} as const;

export type StaticPath = typeof staticPath;
