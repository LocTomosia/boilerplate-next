import { Box, Container } from "@mui/material";
import { Loader } from "@/components/common/Loader";
// import { useViewerPermissionsLazyQuery } from "generated/graphql";
import { useMobile, usePageTitle } from "@/hooks";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { AppBar } from "./AppBar";
import { AppDrawer } from "./AppDrawer";
import { SignInPage } from "./SignInPage";

const DRAWER_WIDTH = 240;

const useRouteChangeOnMobile = (onRouteChangeStart: () => void) => {
  const router = useRouter();
  const { isMobileSize } = useMobile();

  useEffect(() => {
    if (isMobileSize) {
      router.events.on("routeChangeStart", onRouteChangeStart);
    } else {
      router.events.off("routeChangeStart", onRouteChangeStart);
    }
  }, [isMobileSize, router.events, onRouteChangeStart]);
};

const useAuth = () => {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignIn = useCallback(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    setLoading(false);
    if (token) {
      setTimeout(() => {
        setAuthorized(true);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    onSignIn();
  }, [onSignIn]);

  return {
    authorized,
    onSignIn,
    loading,
    error: false,
  };
};

const useAppLayout = () => {
  const { isMobileSize } = useMobile();
  const [drawerOpen, setDrawerOpen] = useState(!isMobileSize);
  const onDrawerOpenClick = () => setDrawerOpen(true);
  const onDrawerCloseClick = () => setDrawerOpen(false);
  const appBarWidth =
    drawerOpen && !isMobileSize ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%";
  const drawerWidth = drawerOpen ? DRAWER_WIDTH : 0;
  const drawerVariant: "temporary" | "persistent" = isMobileSize
    ? "temporary"
    : "persistent";

  const onRouteChangeStart = useCallback(() => setDrawerOpen(() => false), []);
  useRouteChangeOnMobile(onRouteChangeStart);

  return {
    drawerOpen,
    onDrawerOpenClick,
    onDrawerCloseClick,
    appBarWidth,
    drawerWidth,
    drawerVariant,
  };
};

const APPBAR_HEIGHT = "80px";

export const AppLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    drawerOpen,
    onDrawerOpenClick,
    onDrawerCloseClick,
    appBarWidth,
    drawerWidth,
    drawerVariant,
  } = useAppLayout();

  const { authorized, onSignIn, loading, error } = useAuth();
  const { pageTitle } = usePageTitle();

  // if (loading) {
  //   return <Loader fullHeight />;
  // }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {!authorized ? (
        <SignInPage onSignIn={onSignIn} error={error} />
      ) : (
        <Box sx={{ display: "flex" }}>
          <AppBar
            width={appBarWidth}
            ml={drawerWidth}
            showIconButton={!drawerOpen}
            onIconButtonClick={onDrawerOpenClick}
          />
          <AppDrawer
            open={drawerOpen}
            width={drawerWidth}
            onIconButtonClick={onDrawerCloseClick}
            variant={drawerVariant}
          />
          <Container
            maxWidth="xl"
            component="main"
            sx={{
              marginTop: APPBAR_HEIGHT,
              paddingBottom: 4,
              position: "relative",
              maxWidth: `calc(95vw - ${
                drawerVariant === "persistent" ? drawerWidth : 0
              }px)`,
              minHeight: `calc(100vh - ${APPBAR_HEIGHT})`,
            }}
          >
            {children}
          </Container>
        </Box>
      )}
    </>
  );
};
