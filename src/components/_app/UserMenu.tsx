import { Logout, Person } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  MenuItem,
  MenuList,
  Popover,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRef, useState } from "react";
import { theme } from "@/utils";
import { grey } from "@mui/material/colors";

export const UserMenu: React.FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const ref = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const anchorEl = open ? ref.current : null;

  const handleSignout = () => {
    localStorage.removeItem("token");
    location.reload();
  };

  return (
    <UserMenuPresenter
      anchorRef={ref as React.RefObject<HTMLDivElement>}
      anchorEl={anchorEl}
      avatarOnly={isMobile}
      onSignout={handleSignout}
      onOpen={handleOpen}
      onClose={handleClose}
    />
  );
};

type PresenterProps = {
  anchorRef: React.RefObject<HTMLDivElement>;
  anchorEl: HTMLElement | null;
  avatarOnly: boolean;
  onSignout?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
};

export const UserMenuPresenter: React.FC<PresenterProps> = ({
  anchorRef,
  anchorEl,
  avatarOnly,
  onSignout,
  onOpen,
  onClose,
}) => (
  <div ref={anchorRef}>
    {avatarOnly ? (
      <IconButton onClick={onOpen}>
        <Avatar
          sx={{ width: 32, height: 32, bgcolor: grey[600] }}
          variant="rounded"
        >
          <Person />
        </Avatar>
      </IconButton>
    ) : (
      <Chip
        icon={<Person color="inherit" />}
        label={`Loc Huynh`}
        onClick={onOpen}
        sx={{
          color: "white",
          borderColor: "white",
          fontWeight: "bold",
        }}
        variant="outlined"
      />
    )}

    <Popover
      anchorEl={anchorEl}
      disablePortal
      disableScrollLock
      open={!!anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Card sx={{ minWidth: 300, maxWidth: "100%" }}>
        {avatarOnly && (
          <CardContent>
            <Stack gap={1}>
              <Box>
                <Typography>
                  LOC HUYNH
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="span"
                  >
                    （TMS）
                  </Typography>
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        )}

        <Divider />
        <MenuList sx={{ margin: 0 }}>
          <MenuItem onClick={onSignout}>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              color="error"
              fontSize="small"
            >
              <Logout fontSize="inherit" sx={{ mr: 1 }} />
              Logout
            </Typography>
          </MenuItem>
        </MenuList>
      </Card>
    </Popover>
  </div>
);
