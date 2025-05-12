import { useRouter } from "next/router";

export const useCurrentRoute = () => {
  const { pathname } = useRouter();
  return {
    currentRoute: pathname,
    currentRouteName: 'Home',
  };
};
