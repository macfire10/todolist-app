import { Button, ButtonProps, OutlinedInput, OutlinedInputProps } from "@mui/material";
import Popper from '@mui/material/Popper';
import { alpha, styled } from "@mui/material/styles";

export const StyledInput = styled(OutlinedInput)<OutlinedInputProps>(({ theme }) => `
  padding: 8px;
  position: relative;
  left: -8px;
  transition: background 0.1s ease-in;

  :hover {
    background-color: ${alpha(theme.palette.background.paper, 0.2)};

    @media (prefers-color-scheme: light) {
      background-color: ${theme.palette.grey[200]}
    }
  }

  .MuiOutlinedInput-notchedOutline {
    border-width: 0;
  };
`)

export const FloatingIconButton = styled(Button)<ButtonProps>(`
  padding: 4px;
  margin-left: 8px;
  min-width: 38px;
  zIndex: 9999;
`)

export const StyledPopper = styled(Popper)(`
  padding-top: 16px;
  inset: 0px -8px auto auto !important;
  z-index: 6000;
`)