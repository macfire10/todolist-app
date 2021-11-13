import { Dialog, DialogProps } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { EditableField } from "../EditableField";
import { EditableFieldProps } from "../EditableField/interface";

export const StyledEditableTitle = styled(EditableField)<EditableFieldProps>(({ theme }) => `
  .MuiInputBase-input {
    padding: 0;
    font-weight: 500;
    font-size: 1.25rem;
  }
`)

export const StyledDialog = styled(Dialog)<DialogProps>(({ theme }) => `
  .MuiPaper-root {
    min-height: 560px;
  }
`)
