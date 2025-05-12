import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar as MuiAppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { useCurrentRoute } from "@/hooks";
import { UserMenu } from "./UserMenu";

type Props = {
  width: string | number;
  ml: string | number;
  showIconButton: boolean;
  onIconButtonClick: () => void;
};

export const AppBar: React.FC<Props> = ({ width, ml, showIconButton, onIconButtonClick }) => {
  const { currentRouteName } = useCurrentRoute();
  const isDev =
    process.env.DEPLOYMENT === "xdev" || process.env.DEPLOYMENT === "local";

  return (
    <MuiAppBar
      sx={(theme) => ({
        position: "fixed",
        width: width,
        ml: ml,
        bgcolor: isDev
          ? theme.palette.mode === "light"
            ? "toridoriGreen"
            : "background.paper"
          : theme.palette.mode === "light"
          ? "toridoriYellow"
          : "background.paper",
        transition:
          `width ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut}, ` +
          `margin-left ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeInOut}`,
      })}
    >
      <Toolbar>
        {showIconButton && (
          <IconButton
          color='inherit'
          edge='start'
          size='large'
          sx={{ color: 'white' }}
            onClick={onIconButtonClick}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography sx={{ flexGrow: 1 }}>
          {currentRouteName}
          {isDev ? "（※Development environment）" : ""}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <UserMenu />
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};
