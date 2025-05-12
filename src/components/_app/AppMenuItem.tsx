import { Badge, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { ListItemButton } from "@mui/material";
import NextLink from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";

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
}) => {
  const router = useRouter();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(router.pathname === path);
  }, [router.pathname, path]);

  return (
    <ListItemButton
      component={NextLink}
      href={path}
      selected={isSelected}
      sx={{ height: 50 }}
    >
      <ListItemIcon sx={{ position: "relative", color: "primary.main" }}>
        {badgeContent
          ? (
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
          )
          : null}
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            fontSize="small"
            fontWeight="bold"
          >
            {children}
          </Typography>
        }
      />
    </ListItemButton>
  );
};
