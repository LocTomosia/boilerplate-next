import { Box, Grid, Paper, useMediaQuery } from "@mui/material";
import React, { ReactNode } from "react";
import { staticPath, theme } from "@/utils";
import { EyeCatchImage } from "@/components/common/EyeCatchImage";

export const SigninSignupContent = (props: { children: ReactNode }) => {
  const isBreakpointUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Grid
      container
      direction="row"
      sx={{
        backgroundImage: {
          xs: `url("${staticPath.background_mobile_png}")`,
          md: `none`,
        },
        backgroundSize: "cover",
        height: "100%",
        minHeight: "100px",
      }}
    >
      <Grid size={{ md: 6, xs: "auto" }}>
        <Box
          sx={{
            [theme.breakpoints.down("md")]: {
              height: "auto",
              width: "100vw",
            },
            [theme.breakpoints.up("md")]: {
              height: "100vh",
            },
          }}
        >
          <EyeCatchImage
            backgroundImagePath={staticPath.background_png}
            imageSrc={staticPath.next_js_svg}
            mobileImageSrc={staticPath.next_js_svg}
            altText={SIGNIN_ALT_TEXT}
          />
        </Box>
      </Grid>
      <Grid size={{ md: 6, sm: 12, xs: 12 }}>
        <Box
          sx={{
            backgroundColor: isBreakpointUpMd ? "whitesmoke" : "transparent",
            [theme.breakpoints.up("md")]: {
              height: "100vh",
              overflow: "auto",
            },
            [theme.breakpoints.down("sm")]: {
              height: "100vh",
            },
          }}
        >
          <Paper
            elevation={2}
            sx={{
              m: {
                xs: 2,
                sm: 7,
                md: 5,
                lg: 13,
              },
            }}
          >
            {props.children}
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

const SIGNIN_ALT_TEXT = `Login`;
