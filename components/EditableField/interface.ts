import { OutlinedInputProps } from "@mui/material";

export type EditableFieldProps = OutlinedInputProps & {
  value: string
  onChangeConfirm: (value: string) => void
}