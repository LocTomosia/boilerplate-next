import { useContext } from "react";
import { SetSnackbarOptionContext } from "@/context/SnackbarContext";

export const useSnackbar = () => ({
  openSnackbar: useContext(SetSnackbarOptionContext),
});
