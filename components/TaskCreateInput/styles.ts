import { Dialog, DialogProps,  PaperProps } from "@mui/material";
import Paper from '@mui/material/Paper'
import { styled } from "@mui/material/styles";

export const StyledPaper = styled(Paper)<PaperProps & { component: string }>(({ theme }) => `
  padding: 6px 4px;
  display: flex;
  alignItems: center;
  width: 100%;

  ${theme.breakpoints.down('sm')} {
    border-radius: 0;
  }
`)

export const StyledDialog = styled(Dialog)<DialogProps>(`
  .MuiPaper-root {
    min-height: 560px;
  }
`)
