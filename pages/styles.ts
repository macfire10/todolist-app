import { Grid, GridProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledContainer = styled(Grid)<GridProps>(({ theme }) => ({
  height: '100vh',
  background: theme.palette.background.default,
  overflow: 'hidden',
}));

export const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  paddingTop: theme.spacing(2),
  minWidth: 'min(100vw, 500px)',
  [theme.breakpoints.down('sm')]: {
    paddingTop: 0,
  },
}));