import { Dialog, DialogProps, List, ListItemButton, ListItemText, Paper, PaperProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledPaper = styled(Paper)<PaperProps & { component: string }>(`
  padding: 0;
  display: flex;
  align-items: center;
  width: 100%;

  @media (max-width: 500px) {
    border-radius: 0;
  }
`)

export const StyledList = styled(List)(({ theme }) => `
  padding: 0;
  width: 100%;
  max-height: calc(100vh - ${theme.spacing(12)});
  overflow: scroll;

  ${theme.breakpoints.down('sm')} {
    max-height: calc(100vh - ${theme.spacing(8)});
  }
`)

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => `
  min-height: ${theme.spacing(9)};
`)

export const StyledListItemText = styled(ListItemText)(`
  max-width: calc(100% - 60px);

  & > * {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`)

export const StyledDialog = styled(Dialog)<DialogProps>(`
  .MuiPaper-root {
    min-height: 560px;
  }
`)
