import { SxProps } from "@mui/system";


export interface ActionsMenuProps {
  sx: SxProps
  options: {
    name: string;
    cb: () => void;
  }[]
}