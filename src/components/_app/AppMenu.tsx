import Home from "@mui/icons-material/Home";
import { List } from "@mui/material";
import { Loader } from "@/components/common/Loader";
import { ReactNode } from "react";
import { AppMenuItem } from "./AppMenuItem";

const MENU_ROUTES = [
  "/home",
] as const;

type MenuRoute = typeof MENU_ROUTES[number];

const MenuRouteIcons: Record<MenuRoute, ReactNode> = {
  "/home": <Home />,
} as const;

const usePermittedRoutes = () => {
  const permittedRoutes: { [key in MenuRoute]: boolean } = {
    "/home": true,
  };

  return {
    permittedRoutes,
    loading: false,
  };
};

export const AppMenu: React.FC = () => {
  const { permittedRoutes, loading } = usePermittedRoutes();
  if (loading) return <Loader />;
  return (
    <List sx={{ display: "flex", flexDirection: "column", padding: 0 }}>
      {Object.entries(permittedRoutes).map(
        ([route, isPermitted]) =>
          isPermitted && (
            <AppMenuItem
              key={route}
              path={route}
              badgeContent={10}
              icon={MenuRouteIcons[route as MenuRoute]}
            >
              Home
            </AppMenuItem>
          ),
      )}
    </List>
  );
};
