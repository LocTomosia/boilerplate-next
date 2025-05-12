import { Badge, ListItemIcon, ListItemText } from "@mui/material";
import { ListItemButton } from "@mui/material";
import NextLink from "next/link";
import { ReactNode } from "react";

type Props = {
  path: string;
  children: string;
  badgeContent?: ReactNode;
  icon?: ReactNode;
};

export const AppMenuItem: React.FC<Props> = ({
  path,
  children,
  badgeContent,
  icon,
}) => (
  <ListItemButton
    component={NextLink}
    href={path}
    selected={window.location.pathname === path}
    sx={{ height: 50 }}
  >
    <ListItemIcon sx={{ position: "relative", color: "primary.main" }}>
      {badgeContent ? (
        <Badge
          sx={{
            position: "absolute",
            top: 0,
            left: 25,
          }}
          variant="dot"
          color="error"
          badgeContent=""
        />
      ) : null}
      {icon}
    </ListItemIcon>
    <ListItemText
      primaryTypographyProps={{
        fontSize: "small",
        fontWeight: "bold",
      }}
    >
      {children}
    </ListItemText>
  </ListItemButton>
);
