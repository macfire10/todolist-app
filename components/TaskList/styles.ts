import { Dialog, DialogProps, List, ListItemButton, ListItemText } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { EditableField } from "../EditableField";
import { EditableFieldProps } from "../EditableField/interface";

export const StyledList = styled(List)(({ theme }) => `
  padding: 0;
  width: 100%;
  max-height: calc(100vh - ${theme.spacing(16)});
  overflow: scroll;
`)

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => `
  min-height: ${theme.spacing(9)};
`)

export const StyledListItemText = styled(ListItemText)(({ theme }) => `
  max-width: calc(100% - 60px);

  & > * {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`)

export const StyledDialog = styled(Dialog)<DialogProps>(({ theme }) => `
  .MuiPaper-root {
    min-height: 560px;
  }
`)
