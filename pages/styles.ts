import { Grid, GridProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  height: '100vh',
  background: theme.palette.background.default,
}));