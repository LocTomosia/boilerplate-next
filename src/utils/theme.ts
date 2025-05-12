import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
    overline: {
      lineHeight: 1.4,
      textTransform: "none",
      fontSize: "0.5rem",
    },
  },
  palette: {
    secondary: {
      main: "#E5EEF7",
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          padding: 0,
          margin: 0,
          fontFamily:
            `'Noto Sans JP', -apple-system, 'Segoe UI', 'Helvetica Neue', 'Hiragino Kaku Gothic ProN', メイリオ, meiryo, sans-serif`,
          color: "#222",
        },
      },
    },
    MuiCheckbox: { defaultProps: { color: "primary" } },
    MuiRadio: { defaultProps: { color: "primary" } },
    MuiSwitch: { defaultProps: { color: "primary" } },
    MuiAppBar: { defaultProps: { color: "inherit" } },
  },
});
export const drawerWidth = 240;
