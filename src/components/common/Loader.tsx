import { Box, LinearProgress, Typography } from "@mui/material";

type Props = {
  fullHeight?: boolean;
};

export const Loader: React.FC<Props> = ({ fullHeight = false }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 2,
      minHeight: fullHeight ? "100vh" : "auto",
    }}

  >
    <Typography variant="body2">Loading...🏃‍♀️💨</Typography>
    <Box sx={{
        display: "block",
        position: "relative",
        height: "12px",
        width: "20%",
        border: "1px solid #FF3D00",
        borderRadius: "10px",
        overflow: "hidden",
        "&::after": {
          content: '""',
          width: "40%",
          height: "100%",
          background: "#FF3D00",
          position: "absolute",
          top: 0,
          left: 0,
          boxSizing: "border-box",
          animation: "animloader 2s linear infinite",
        },
        "@keyframes animloader": {
          "0%": {
            left: 0,
            transform: "translateX(-100%)",
          },
          "100%": {
            left: "100%",
            transform: "translateX(0%)",
          },
        },
      }}></Box>
  </Box>
);
