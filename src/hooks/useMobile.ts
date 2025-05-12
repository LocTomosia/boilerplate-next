import { useMediaQuery, useTheme } from "@mui/material";

export const useMobile = () => {
  const theme = useTheme();
  const isMobileSize = useMediaQuery(theme.breakpoints.down("sm"), {
    noSsr: true,
  });
  return { isMobileSize };
};
