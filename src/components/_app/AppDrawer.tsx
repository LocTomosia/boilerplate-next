import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { AppMenu } from "./AppMenu";
import { staticPath } from "@/utils";

type Props = {
  open: boolean;
  width: string | number;
  onIconButtonClick: () => void;
  variant: "temporary" | "persistent";
};

export const AppDrawer: React.FC<Props> = ({
  open,
  width,
  onIconButtonClick,
  variant,
}) => {
  const theme = useTheme();
  return (
    <Drawer
      open={open}
      sx={{
        width: width,
        flexShrink: 0,
        "& .MuiPaper-root": {
          width: width,
        },
        transition:
          `width ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut}`,
      }}
      variant={variant}
      anchor="left"
    >
      <Box
        sx={{
          display: "flex",
          height: 60,
          alignItems: "center",
        }}
      >
        <Box sx={{ flex: 1, px: 1 }}>
          <img
            src={staticPath.next_js_svg}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            alt=""
          />
        </Box>
        <Box sx={{ flex: 6, display: "flex" }}>
          <Typography fontWeight="bold">Template web</Typography>
        </Box>
        <IconButton onClick={onIconButtonClick}>
          <MenuOpenIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box sx={{ flexGrow: 1 }}>
        <AppMenu />
      </Box>
    </Drawer>
  );
};
